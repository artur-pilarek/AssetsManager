using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class AssignmentHistory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Asset")]
        public int AssetId { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string EmployeeEmail { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string EmployeeName { get; set; } = string.Empty;

        [Required]
        public DateTime AssignedDate { get; set; } = DateTime.UtcNow;

        public DateTime? ReturnedDate { get; set; }

        [MaxLength(500)]
        public string? AssignmentNotes { get; set; }

        // Navigation
        public Asset Asset { get; set; } = null!;
    }
}
