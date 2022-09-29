namespace Model.Request;

public class ChangePasswordRequest
{
    public string UserName { get; set; } = String.Empty;
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}