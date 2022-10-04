using System.ComponentModel.DataAnnotations;

namespace Model.Request;

public class DeleteMatchRequest
{
    [Required]
    public Guid Id { get; set; } = Guid.Empty;

    [Required]
    public DateTime BeginAt { get; set; } = DateTime.Now;
    public int MatchCount { get; set; }
}