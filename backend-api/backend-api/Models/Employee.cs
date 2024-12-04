using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend_api.Models;

public class Employee
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "First Name is required.")]
    [MaxLength(50, ErrorMessage = "First Name cannot exceed 50 characters.")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last Name is required.")]
    [MaxLength(50, ErrorMessage = "Last Name cannot exceed 50 characters.")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    [MaxLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Position is required.")]
    [MaxLength(50, ErrorMessage = "Position cannot exceed 50 characters.")]
    public string Position { get; set; }

    [Required(ErrorMessage = "Salary is required.")]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Salary { get; set; }
}
