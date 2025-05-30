using Entities.TreasureHunt;
using Services;
using System.Collections.Generic;

namespace BusinessLogicLayer.Interfaces
{
    public interface ITreasureHuntBS : IBaseBS<ITreasureHunt, TreasureHuntEntity, int>
    {
        TreasureHuntEntity FindMinimumFuel(int Id, int NRow, int MColumn, int P, int[][] Matrix);
        IEnumerable<TreasureHuntEntity> GetSolveHistoryPaging(int pageIndex, int pageSize, string matrixSearchKey, ref int totalRow);
    }
}
