using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Model.Database;

namespace Data.Repositories;

public class JwtManager : IJwtManager
{
    private readonly IConfiguration _configuration;

    public JwtManager(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string Authenticate(AppUser user, IList<string> roles, bool rememberMe)
    {
        var tokenClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };
        foreach (var role in roles)
            tokenClaims.Add(new Claim(ClaimTypes.Role, role));
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
        var tokenCredentials = new SigningCredentials(tokenKey, SecurityAlgorithms.HmacSha256);
        var tokenExpires = rememberMe ? DateTime.Now.AddDays(30) : DateTime.Now.AddMinutes(10);
        var tokenDescriptor = new SecurityTokenDescriptor
        {

            Subject = new ClaimsIdentity(tokenClaims),
            Issuer = _configuration["JWT:Issuer"],
            Audience = _configuration["JWT:Audience"],
            Expires = tokenExpires,
            SigningCredentials = tokenCredentials,
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public DateTime GetExpireDate(string token)
    {
        JwtSecurityToken jwt = new(token);
        if (token == null)
            return DateTime.Now;
        return jwt.ValidTo.ToUniversalTime();
    }
}