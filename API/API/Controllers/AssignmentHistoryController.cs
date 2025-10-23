using API.Data;
using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;


namespace API.Controllers
{
    [Route("odata/controller/assignment-history")]
    [ApiController]
    public class AssignmentHistoryController : ODataController
    {
        private readonly IAssignmentHistoryRepository _data;
        public AssignmentHistoryController(IAssignmentHistoryRepository data)
        {
            _data = data;
        }

        [HttpGet]
        [EnableQuery(PageSize = 100)]
        public IQueryable<AssignmentHistory> Get()
        {
            return _data.AsQueryable();
        }
    }
}
