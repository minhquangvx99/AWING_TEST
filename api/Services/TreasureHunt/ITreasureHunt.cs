using Entities.TreasureHunt;
using System.Collections.Generic;

namespace Services
{
    public interface ITreasureHunt : IBaseService<TreasureHuntEntity, int>
    {
        IEnumerable<TreasureHuntEntity> GetSolveHistoryPaging(int pageIndex, int pageSize, string matrixSearchKey, ref int totalRow);
    }
}
