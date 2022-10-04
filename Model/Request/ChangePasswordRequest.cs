namespace Model.Request;

public class ChangePasswordRequest
{
    public Guid Id { get; set; } = Guid.Empty;
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}