using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Request;
using Service.APIServices;

namespace pairLegendsCore.Controllers.api
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly IMatchService _matchService;

        public MatchController(IMatchService matchService)
        {
            _matchService = matchService;
        }

        /// <summary>
        /// Get All Matches in this game
        /// </summary>
        /// <param name="pagingRequest">Paging Resquest</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet()]
        public IActionResult Get([FromQuery] PagingRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var matches = _matchService.GetMatches(request);
            if (matches.Succeeded)
                return Ok(matches);
            return BadRequest(matches);
        }

        // /// <summary>
        // /// Get Results by UserName
        // /// </summary>
        // /// <param name="userName">UserName</param>
        // /// <param name="pagingRequest">Paging Request</param>
        // /// <returns>Result List</returns>
        // [AllowAnonymous]
        // [HttpGet("get-by-username/{userName}")]
        // public async Task<IActionResult> Get(string userName, [FromQuery] PagingRequest pagingRequest)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState);
        //     var results = await _matchService.ge(userName, pagingRequest);
        //     if (results.Succeeded)
        //         return Ok(results);
        //     return BadRequest(results);
        // }

        // [HttpGet("get-history-by-username/{userName}")]
        // public async Task<IActionResult> GetHistory(string userName, [FromQuery] PagingRequest pagingRequest)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState);
        //     var results = await _matchService.GetHistoryByUserName(userName, pagingRequest);
        //     if (results.Succeeded)
        //         return Ok(results);
        //     return BadRequest(results);
        // }

        /// <summary>
        /// Create a match
        /// </summary>
        /// <param name="matchRequest">Create Match Request</param>
        /// <returns>Create Status</returns>
        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] MatchRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var serviceResult = await _matchService.AddMatch(request);
            if (serviceResult.Succeeded)
                return Ok(serviceResult);
            return BadRequest(serviceResult);
        }

        /// <summary>
        /// Delete Match by BeginAt
        /// </summary>
        /// <param name="deleteResultRequest">Delete Match Request</param>
        /// <returns>Delete Status</returns>
        [HttpDelete()]
        public async Task<IActionResult> DeleteByUserName(DeleteMatchRequest deleteMatchRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var deleteResult = await _matchService.DeleteMatchByBeginAt(deleteMatchRequest);
            if (deleteResult.Succeeded)
                return Ok(deleteResult);
            return BadRequest();
        }

        ///// <summary>
        ///// Delete Results by Id
        ///// </summary>
        ///// <param name="id">Id</param>
        ///// <param name="deleteResultRequest">Delete Request Params</param>
        ///// <returns>Delete Status</returns>
        //[HttpDelete("delete-by-id/{id}")]
        //public async Task<IActionResult> DeleteById(Guid id, DeleteResultRequest deleteResultRequest)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);
        //    var deleteResult = await _matchService.DeleteResultById(id, deleteResultRequest);
        //    if (deleteResult.Succeeded)
        //        return Ok(deleteResult);
        //    return BadRequest();
        //}
    }
}