using BusinessLogicLayer.Interfaces;
using Entities.TreasureHunt;
using Services;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Linq;
using System.Text.Json;

namespace BusinessLogicLayer
{
    // TreasureHunt Business Service
    public class TreasureHuntBS : BaseBS<ITreasureHunt, TreasureHuntEntity, int>, ITreasureHuntBS
    {
        /// <summary></summary>
        /// <param name="_ctx"></param>
        public TreasureHuntBS(ITreasureHunt _ctx) : base(_ctx)
        {

        }

        public TreasureHuntEntity FindMinimumFuel(int Id, int NRow, int MColumn, int P, int[][] Matrix)
        {
            Dictionary<int, List<(int x, int y)>> valuePositions = new Dictionary<int, List<(int x, int y)>>();
            for (int i = 0; i < NRow; i++)
            {
                for (int j = 0; j < MColumn; j++)
                {
                    int val = Matrix[i][j];
                    if (!valuePositions.ContainsKey(val))
                        valuePositions[val] = new List<(int x, int y)>();
                    valuePositions[val].Add((i, j));
                }
            }
            List<(int x, int y)> Path = new List<(int x, int y)>();
            var dp = new Dictionary<(int x, int y), (float cost, List<(int x, int y)> path)>();

            dp[(0, 0)] = (0, new List<(int, int)> { (0, 0) });

            List<int> visitOrder = Enumerable.Range(1, P).ToList();
            foreach (int key in visitOrder)
            {
                var next = new Dictionary<(int x, int y), (float cost, List<(int x, int y)> path)>();

                foreach (var from in dp)
                {
                    foreach (var to in valuePositions[key])
                    {
                        float dist = Distance(from.Key, to);
                        float newCost = from.Value.cost + dist;
                        if (!next.ContainsKey(to) || next[to].cost > newCost)
                        {
                            var newPath = new List<(int, int)>(from.Value.path) { to };
                            next[to] = (newCost, newPath);
                        }
                    }
                }

                dp = next;
            }

            if (dp.Count > 0)
            {
                var min = dp.OrderBy(kvp => kvp.Value.cost).First();
                var treasureHuntEntity = new TreasureHuntEntity();
                if (Id == 0)
                {
                    treasureHuntEntity = new TreasureHuntEntity
                    {
                        NRow = NRow,
                        MColumn = MColumn,
                        P = P,
                        Matrix = JsonSerializer.Serialize(Matrix),
                        MinimumFuel = min.Value.cost,
                        Path = JsonSerializer.Serialize(min.Value.path),
                        CreatedDate = DateTime.Now,
                    };
                    _ctx.Insert(treasureHuntEntity);
                }
                else
                {
                    treasureHuntEntity = _ctx.GetById(Id);
                    treasureHuntEntity.MinimumFuel = min.Value.cost;
                    treasureHuntEntity.Path = JsonSerializer.Serialize(min.Value.path);
                    treasureHuntEntity.ModifiedDate = DateTime.Now;
                    _ctx.Update(treasureHuntEntity);
                }
                return treasureHuntEntity;
            }
            else
            {
                return null;
            }
        }

        private float Distance((int x, int y) a, (int x, int y) b)
        {
            return (float)Math.Sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        }

    }
}
