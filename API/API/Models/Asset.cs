using API.Enums;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Asset
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength (50)]
        public string AssetTag { get; set; } = string.Empty;

        [Required]
        [MaxLength (50)]
        public string AssetType { get; set;} = string.Empty;

        [MaxLength(100)]
        public string? Manufacturer { get; set; }

        [MaxLength(100)]
        public string? Model { get; set; }

        [MaxLength(50)]
        public string? SerialNumber { get; set; }

        [MaxLength(20)]
        public AssetStatus Status { get; set; } = AssetStatus.Available;

        [MaxLength(100)]
        [EmailAddress]
        public string? CurrentOwnerEmail { get; set; }

        [MaxLength(100)]
        public string? CurrentOwnerName { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public DateTime? WarrantyExpiry { get; set; }

        public DateTime? NextMaintenanceDate { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<AssignmentHistory> AssignmentHistory { get; set; } = new List<AssignmentHistory>();
        public ICollection<IssueReport> IssueReports { get; set; } = new List<IssueReport>();
    }
}
