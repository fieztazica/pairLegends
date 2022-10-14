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
        /// <returns>>All Matches List</returns>
        [AllowAnonymous]
        [HttpGet()]
        public IActionResult Get([FromQuery] PagingRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var matches = _matchService.GetMatches(request);
            if (matches.Succeeded)
                return Ok(matches);
            return NotFound(matches);
        }

        /// <summary>
        /// Get All Matches by Id
        /// </summary>
        /// <param name="id">Guid</param>
        /// <returns>User Matches List</returns>
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var matches = _matchService.GetMatchesById(id);
            if (matches.Succeeded)
                return Ok(matches);
            return NotFound(matches);
        }

        /// <summary>
        /// Get Paged Matches by Id
        /// </summary>
        /// <param name="id">Guid</param>
        /// <param name="pagingRequest">Paging Request</param>
        /// <returns>User Matches List with Pages</returns>
        [AllowAnonymous]
        [HttpGet("page/{id}")]
        public async Task<IActionResult> GetPages(Guid id, [FromQuery] PagingRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var matches = await _matchService.GetPagingMatchesById(id, request);
            if (matches.Succeeded)
                return Ok(matches);
            return NotFound(matches);
        }

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
        [Authorize(Roles = "Admin")]
        [HttpDelete()]
        public async Task<IActionResult> DeleteByBeginAt(DeleteMatchRequest deleteMatchRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var deleteResult = await _matchService.DeleteMatchByBeginAt(deleteMatchRequest);
            if (deleteResult.Succeeded)
                return Ok(deleteResult);
            return BadRequest();
        }

    }
}