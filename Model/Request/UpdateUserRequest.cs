namespace Model.Request;

public class UpdateUserRequest
{
    public string UserName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; } = string.Empty;
    public string? InGameName { get; set; } = string.Empty;
}