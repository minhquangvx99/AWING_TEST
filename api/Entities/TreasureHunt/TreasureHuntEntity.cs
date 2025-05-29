using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.TreasureHunt
{
    [Table("TreasureHunt")]
    public class TreasureHuntEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int NRow { get; set; }

        public int MColumn { get; set; }

        public int P { get; set; }

        [Column("Matrix", TypeName = "varchar")]
        public string Matrix { get; set; }

        [Column("Path", TypeName = "varchar")]
        public string Path { get; set; }

        public float MinimumFuel { get; set; }

    }

}
