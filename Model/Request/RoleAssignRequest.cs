namespace Model.Request;

public class RoleAssignRequest
{
    public Guid Id { get; set; } = Guid.Empty;
    public ICollection<SelectedItem> Roles { get; set; } = new List<SelectedItem>();
}