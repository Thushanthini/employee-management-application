using backend_api.Data;
using backend_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace backend_api.Controllers;

[ApiController]
[Route("api/employees")]
public class EmployeeController : Controller
{
    private readonly ApiDbContext _apiDbContext;
    public EmployeeController(ApiDbContext apiDbContext)
    {
        _apiDbContext = apiDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEmployees()
    {
        var employees = await _apiDbContext.Employees.ToListAsync();
        return Ok(employees);
    }

    [HttpPost]
    public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest)
    {
        await _apiDbContext.Employees.AddAsync(employeeRequest);
        await _apiDbContext.SaveChangesAsync();
        return Ok(employeeRequest);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(int? id)
    {
        var employee = await _apiDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
        if (employee == null)
        {
            return NotFound();
        }
        return Ok(employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int? id, Employee updateEmploeeRequest)
    {
        var employee = await _apiDbContext.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        employee.FirstName = updateEmploeeRequest.FirstName;
        employee.LastName = updateEmploeeRequest.LastName;
        employee.Email = updateEmploeeRequest.Email;
        employee.Position = updateEmploeeRequest.Position;
        employee.Salary = updateEmploeeRequest.Salary;

        await _apiDbContext.SaveChangesAsync();
        return Ok(employee);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int? id)
    {
        var employee = await _apiDbContext.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }
        _apiDbContext.Employees.Remove(employee);
        await _apiDbContext.SaveChangesAsync();

        return Ok(employee);
    }
}
