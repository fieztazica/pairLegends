namespace Model.Request;

public class RoleAssignRequest
{
    public string UserName { get; set; } = string.Empty;
    public ICollection<SelectedItem> Roles { get; set; } = new List<SelectedItem>();
}