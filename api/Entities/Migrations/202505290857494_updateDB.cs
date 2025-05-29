namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDB : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TreasureHunt", "Path", c => c.String(maxLength: 8000, unicode: false));
            AlterColumn("dbo.TreasureHunt", "Matrix", c => c.String(maxLength: 8000, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.TreasureHunt", "Matrix", c => c.String(maxLength: 255, unicode: false));
            DropColumn("dbo.TreasureHunt", "Path");
        }
    }
}
