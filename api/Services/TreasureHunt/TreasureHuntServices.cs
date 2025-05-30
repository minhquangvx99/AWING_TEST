using Dapper;
using Entities.TreasureHunt;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class TreasureHuntServices : BaseService<TreasureHuntEntity, int>, ITreasureHunt
    {

        public TreasureHuntServices(string connection = "") : base(connection)
        {
            _connection = connection;
        }

        public IEnumerable<TreasureHuntEntity> GetSolveHistoryPaging(int pageIndex, int pageSize, string matrixSearchKey, ref int totalRow)
        {
            var parameters = new DynamicParameters();
            parameters.Add("MatrixSearchKey", matrixSearchKey);
            parameters.Add("Offset", (pageIndex - 1) * pageSize);
            parameters.Add("PageSize", pageSize);

            using (var multi = unitOfWork.ProcedureQueryMulti("GetSolveHistoryPaging", parameters))
            {
                totalRow = multi.Read<int>().FirstOrDefault();
                return multi.Read<TreasureHuntEntity>().ToList();
            }
        }

    }
}
