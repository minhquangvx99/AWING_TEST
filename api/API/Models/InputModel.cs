namespace API.Models
{
    public class InputModel
    {
        public int Id { get; set; }

        public int NRow { get; set; }

        public int MColumn { get; set; }

        public int P { get; set; }

        public int[][] Matrix { get; set; }
    }
}
