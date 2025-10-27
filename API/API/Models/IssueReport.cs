using API.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class IssueReport
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Asset")]
        public int AssetId { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string ReportedByEmail { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string ReportedByName { get; set; } = string.Empty;
        
        [Required]
        public DateTime IssueDate { get; set; } = DateTime.UtcNow;
        
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public IssueStatus Status { get; set; } = IssueStatus.Open;

        public IssuePriority Priority { get; set; } = IssuePriority.Medium;
        
        public DateTime? ResolvedDate { get; set; }

        [MaxLength(100)]
        [EmailAddress]
        public string? ResolvedByEmail { get; set; }

        [MaxLength(100)]
        public string? ResolvedByName { get; set; }
        
        [MaxLength(1000)]
        public string? ResolutionNotes { get; set; }

        // Navigation
        public Asset? Asset { get; set; }
    }
}
