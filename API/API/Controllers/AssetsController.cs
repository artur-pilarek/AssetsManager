using API.Data;
using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;


namespace API.Controllers
{
    [Route("odata/controller/assets")]
    [ApiController]
    public class AssetsController : ODataController
    {
        private readonly IAssetRepository _data;
        public AssetsController(IAssetRepository data)
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
}
