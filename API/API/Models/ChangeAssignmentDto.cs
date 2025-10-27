namespace API.Models
{
    public class ChangeAssignmentDto
    {
        public string? newOwnerEmail { get; set; }
        public string? newOwnerName { get; set; }
        public string? assignmentNotes { get; set; }
    }
}