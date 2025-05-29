using Entities.TreasureHunt;
using System.Data.Entity;

namespace Entities
{
    public class AwingTestContext : DbContext
    {
        public AwingTestContext() : base("Server=LAPTOP-7RIGJVQ0\\MSSQLSERVER01;Database=AWING_TEST_DATABASE;Uid=develop;Pwd=Abc@123$;")
        {
        }
        public DbSet<TreasureHuntEntity> treasureHuntEntities { get; set; }

    }
}
