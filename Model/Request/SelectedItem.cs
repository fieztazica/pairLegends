namespace Model.Request;

public class SelectedItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;

    public bool Selected { get; set; }
}