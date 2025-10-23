using API.Data;
using API.Models;
using API.Repositories.Interfaces;

namespace API.Repositories.Classes
{
    public class IssueReportRepository : IIssueReportRepository
    {
        private readonly AssetTrackerDB _db;
        public IssueReportRepository(AssetTrackerDB db)
        {
            _db = db;
        }

        public IQueryable<IssueReport> AsQueryable()
        {
            return _db.IssueReports.AsQueryable();
        }
    }
}
