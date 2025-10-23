using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Repositories.Interfaces;


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
    }
}
