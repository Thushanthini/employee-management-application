using backend_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Data;

public class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }
}
