using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IAssetRepository : IQueryRepository<Asset>
    {
        Task<Asset> CreateAssetAsync(Asset newAsset);
        Task<Asset?> UpdateAssetAsync(Asset updatedAsset);
        Task DeleteAssetAsync(int assetId);
        Task<Asset?> ChangeAssetAssignmentAsync(int assetId, ChangeAssignmentDto payload );
    }
}
