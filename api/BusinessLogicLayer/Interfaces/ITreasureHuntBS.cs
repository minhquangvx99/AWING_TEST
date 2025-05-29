using Entities.TreasureHunt;
using Services;

namespace BusinessLogicLayer.Interfaces
{
    public interface ITreasureHuntBS : IBaseBS<ITreasureHunt, TreasureHuntEntity, int>
    {
        TreasureHuntEntity FindMinimumFuel(int Id, int NRow, int MColumn, int P, int[][] Matrix);
    }
}
