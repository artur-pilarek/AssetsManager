using API.Data;
using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Runtime.InteropServices;


namespace API.Controllers
{
    [Route("odata/[controller]")]
    [ApiController]
    public class AssetsODataController : ODataController
    {
        private readonly IAssetRepository _data;
        public AssetsODataController(IAssetRepository data)
        {
            _data = data;
        }

        [HttpGet]
        [EnableQuery(PageSize = 100)]
        public IQueryable<Asset> Get()
        {
            return _data.AsQueryable();
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AssetsAPIController : ControllerBase
    {
        private readonly IAssetRepository _data;
        public AssetsAPIController(IAssetRepository data)
        {
            _data = data;
        }

        [HttpPost]
        public async Task<ActionResult<Asset>> CreateAssetAsync(Asset newAsset)
        {
            Asset createdAsset = await _data.CreateAssetAsync(newAsset);
            return Created($"Asset successfully created", createdAsset);
        }

        [HttpPut, HttpPatch]
        public async Task<ActionResult<Asset>> UpdateAssetAsync(Asset updatedAsset)
        {
            Asset? updatedAssetResult = await _data.UpdateAssetAsync(updatedAsset);
            if (updatedAssetResult is null)
            {
                return NotFound($"Asset with id {updatedAsset.Id} could not be found");
            }
            else
            {
                return Ok(updatedAssetResult);
            }
        }

        [HttpDelete("{assetId}")]
        public async Task<ActionResult> DeleteAssetAsync(int assetId)
        {
            var assetInDb = _data.AsQueryable().FirstOrDefault(a => a.Id == assetId);
            if (assetInDb is null)
            {
                return NotFound($"Asset with Id {assetId} not found");
            }
            else
            {
                await _data.DeleteAssetAsync(assetId);
                return Ok();
            }
        }

        [HttpPut("change-assignment/{assetId}"), HttpPatch("change-assignment/{assetId}")]
        public async Task<ActionResult<Asset>> ChangeAssetAssignmentAsync([FromRoute] int assetId, [FromBody] ChangeAssignmentDto payload )
        {
            Asset? updatedAssetResult = await _data.ChangeAssetAssignmentAsync(assetId, payload);
            if (updatedAssetResult is null)
            {
                return NotFound($"Asset with id {assetId} could not be found");
            }
            else
            {
                return Ok(updatedAssetResult);
            }
        }

    }
}
