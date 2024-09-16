namespace E2EProjectAboutcurd.DbModel
{
    public class Inventory
    {
        public int Id { get; set; }
        public string InventoryName { get; set; }
        public List<Product> Products { get; set; }
    }
}
