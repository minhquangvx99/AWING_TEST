using Entities.TreasureHunt;
using System.Linq;

namespace Services
{
    public class TreasureHuntServices : BaseService<TreasureHuntEntity, int>, ITreasureHunt
    {

        public TreasureHuntServices(string connection = "") : base(connection)
        {
            _connection = connection;
        }
       
    }
}
