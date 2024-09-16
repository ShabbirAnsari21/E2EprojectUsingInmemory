using E2EProjectAboutcurd.DbModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E2EProjectAboutcurd.Controllers
{

    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InventoryController(AppDbContext context)
        {
            _context = context;

            // Seed data if the inventory is empty
            if (!_context.InventoryTbl.Any())
            {
                _context.InventoryTbl.Add(new Inventory
                {
                    InventoryName = "Warehouse 1",
                    Products = new List<Product>
                {
                    new Product { Name = "Laptop", Quantity = 10 },
                    new Product { Name = "Mouse", Quantity = 100 }
                }
                });

                _context.SaveChanges();
            }
        }

        // Get all inventories with their products
        [HttpGet]
        public IActionResult GetAllInventories()
        {
            var inventories = _context.InventoryTbl.Include(i => i.Products).ToList();
            return Ok(inventories);
        }

        // Add new inventory
        [HttpPost("add-inventory")]
        public async Task<IActionResult> AddInventory(string name)
        {
            var inventory = new Inventory
            {
                InventoryName = name,
                Products = new List<Product>()
            };

            _context.InventoryTbl.Add(inventory);
            await _context.SaveChangesAsync();

            return Ok("Inventory added successfully");
        }

        // Add product to inventory
        [HttpPost("{inventoryId}/add-product")]
        public async Task<IActionResult> AddProductToInventory(int inventoryId, Product product)
        {
            var inventory = _context.InventoryTbl.Include(i => i.Products)
                                                .FirstOrDefault(i => i.Id == inventoryId);

            if (inventory == null)
            {
                return NotFound("Inventory not found");
            }

            inventory.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok("Product added successfully");
        }

        // Get all products from a specific inventory
        [HttpGet("{inventoryId}/products")]
        public IActionResult GetProductsByInventory(int inventoryId)
        {
            var inventory = _context.InventoryTbl.Include(i => i.Products)
                                                .FirstOrDefault(i => i.Id == inventoryId);

            if (inventory == null)
            {
                return NotFound("Inventory not found");
            }

            return Ok(inventory.Products);
        }

    }
}
