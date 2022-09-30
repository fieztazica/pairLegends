using Model.Request;

namespace Model.Action;

public class RegisterModel
{
    public string ReturnUrl { get; set; } = string.Empty;
    public RegisterRequest Input { get; set; } = new RegisterRequest();
}