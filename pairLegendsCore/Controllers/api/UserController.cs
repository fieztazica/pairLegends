using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Model.Database;
using Model.Request;
using Model.Response;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pairLegendsCore.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;

        public UserController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(userManager.Users.Select(user => new UserRes
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
            }));
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            User foundUser = userManager.FindByIdAsync(id).Result;
            if (foundUser == null) return NotFound();
            UserRes resultUser = new()
{Id = foundUser.Id, UserName = foundUser.UserName, Email = foundUser.Email, };
            return Ok(resultUser);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserReq value)
        {
            User newUser = new()
{UserName = value.UserName, Email = value.Email, };
            var result = await userManager.CreateAsync(newUser, value.Password);
            if (result.Succeeded)
                return Ok(result);
            return BadRequest(result);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
