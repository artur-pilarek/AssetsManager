namespace API.Models
{
    public enum AssetStatus
    {
        Available,
        Assigned,
        Maintenance,
        Retired
    }
    public enum IssueStatus
    {
        Open,
        InProgress,
        Resolved,
        Closed
    }
    public enum IssuePriority
    {
        Low,
        Medium,
        High,
        Critical
    }
}
