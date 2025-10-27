using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace API.Controllers
{
    [Route("odata/[controller]")]
    [ApiController]
    public class IssueReportController : ODataController
    {
        private readonly IIssueReportRepository _data;
        public IssueReportController(IIssueReportRepository data)
        {
            _data = data;
        }

        [HttpGet]
        [EnableQuery(PageSize = 100)]
        public IQueryable<IssueReport> Get()
        {
            return _data.AsQueryable();
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class IssueReportApiController : ControllerBase
    {
        private readonly IIssueReportRepository _data;
        public IssueReportApiController(IIssueReportRepository data)
        {
            _data = data;
        }

        [HttpPost]
        public async Task<ActionResult<IssueReport>> CreateIssueReportAsync(IssueReport newIssueReport)
        {
            IssueReport createdIssueReport = await _data.CreateIssueReportAsync(newIssueReport);
            return Created($"Issue report successfully created", createdIssueReport);
        }
    }
}