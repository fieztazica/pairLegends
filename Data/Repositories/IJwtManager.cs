using System.Security.Claims;
using Model.Database;

namespace Data.Repositories;

public interface IJwtManager
{
    public string Authenticate(AppUser user, IList<string> roles);
    public ClaimsPrincipal Validate(string token);
}