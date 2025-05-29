namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class createDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TreasureHunt",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NRow = c.Int(nullable: false),
                        MColumn = c.Int(nullable: false),
                        P = c.Int(nullable: false),
                        Matrix = c.String(maxLength: 255, unicode: false),
                        MinimumFuel = c.Single(nullable: false),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TreasureHunt");
        }
    }
}
