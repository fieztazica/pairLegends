using Model.Request;

namespace Model.Action;

public class LoginModel
{
    public string ReturnUrl { get; set; } = string.Empty;
    public LoginRequest Input { get; set; } = new LoginRequest();
}