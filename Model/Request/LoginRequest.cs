using System.ComponentModel.DataAnnotations;

namespace Model.Request;

public class LoginRequest
{
    [Required]
    public string UserName { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    public bool RememberMe { get; set; } = false;
}