using Microsoft.AspNetCore.Identity;

namespace Model.Database;

public class AppRole : IdentityRole<Guid>
{
    public string Description { get; set; } = string.Empty;
}