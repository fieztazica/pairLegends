namespace Model.Request;

public class UpdateUserRequest
{
    public Guid Id { get; set; } = Guid.Empty;
    public string? UserName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}