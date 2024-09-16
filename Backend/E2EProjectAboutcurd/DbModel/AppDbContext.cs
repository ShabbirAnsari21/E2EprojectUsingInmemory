using Microsoft.EntityFrameworkCore;

namespace E2EProjectAboutcurd.DbModel
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserEntity> UserTbl { get; set; }
        public DbSet<Product> ProductTbl { get; set; }
        public DbSet<Inventory> InventoryTbl { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
