using API.Data;
using API.Enums;
using API.Models;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace API.Repositories.Classes
{
    public class AssetRepository : IAssetRepository
    {
        private readonly AssetTrackerDB _db;
        public AssetRepository(AssetTrackerDB db)
        {
            _db = db;
        }

        public IQueryable<Asset> AsQueryable()
        {
            return _db.Assets.AsQueryable();
        }

        // changed operations to async, because i've read this is better approach
        // when building api to handle multiple operations on separate threads #makesSense
        public async Task<Asset> CreateAssetAsync(Asset newAsset)
        {
            await _db.Assets.AddAsync(newAsset);
            await _db.SaveChangesAsync();
            return newAsset;
        }

        public async Task<Asset?> UpdateAssetAsync(Asset updatedAsset)
        {
            Asset? assetInDb = await _db.Assets.FirstOrDefaultAsync(a => a.Id == updatedAsset.Id);
            if (assetInDb is null) return null;

            // alternatively i could change properties one by one. Todo: Eventually add DTO classes later
            _db.Entry(assetInDb).CurrentValues.SetValues(updatedAsset);
            assetInDb.UpdatedDate = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return assetInDb;
        }

        public async Task DeleteAssetAsync(int assetId)
        {
            Asset? foundAsset = await _db.Assets.FindAsync(assetId);
            if (foundAsset is null) return;

            _db.Assets.Remove(foundAsset);
            await _db.SaveChangesAsync();
        }

        // wants name and email, because we're not implementing user model
        public async Task<Asset?> ChangeAssetAssignmentAsync(
            int assetId, ChangeAssignmentDto payload)
        {
            var assetInDb = await _db.Assets.FindAsync(assetId);
            if (assetInDb is null) return null;

            var openHistory = assetInDb.AssignmentHistory
                .FirstOrDefault(h => h.ReturnedDate == null);

            if (openHistory != null)
            {
                openHistory.ReturnedDate = DateTime.UtcNow;
                openHistory.AssignmentNotes = "Automatically closed on reassignment.";
            }

            if (string.IsNullOrEmpty(payload.newOwnerEmail))
            {
                assetInDb.CurrentOwnerEmail = null;
                assetInDb.CurrentOwnerName = null;
                assetInDb.Status = AssetStatus.Available;
            }
            else
            {
                assetInDb.CurrentOwnerEmail = payload.newOwnerEmail;
                assetInDb.CurrentOwnerName = payload.newOwnerName;
                assetInDb.Status = AssetStatus.Assigned;

                // Add new record to AssignmentHistory
                var newHistory = new AssignmentHistory
                {
                    AssetId = assetInDb.Id,
                    EmployeeEmail = payload.newOwnerEmail,
                    EmployeeName = payload.newOwnerName ?? "Unknown",
                    AssignedDate = DateTime.UtcNow,
                    AssignmentNotes = payload.assignmentNotes ?? "Assigned via API",
                };
                await _db.AssignmentHistories.AddAsync(newHistory);
            }

            assetInDb.UpdatedDate = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return assetInDb;
        }





    }
}
