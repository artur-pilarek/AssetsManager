using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Repositories.Interfaces;


namespace API.Repositories.Classes
{
    public class AssignmentHistoryRepository : IAssignmentHistoryRepository
    {
        private readonly AssetTrackerDB _db;
        public AssignmentHistoryRepository(AssetTrackerDB db)
        {
            _db = db;
        }

        public IQueryable<AssignmentHistory> AsQueryable()
        {
            return _db.AssignmentHistories.AsQueryable();
        }
    }
}
