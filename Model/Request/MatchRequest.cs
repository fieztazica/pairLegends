using System.ComponentModel.DataAnnotations;

namespace Model.Request;

public class MatchRequest
{
    [Required]
    public Guid Id { get; set; } = Guid.Empty;

    [Required]
    public DateTime BeginAt { get; set; } = DateTime.Now;

    [Required]
    public DateTime EndAt { get; set; } = DateTime.Now;

    [Required]
    public int Tiles { get; set; }

    [Required]
    public int TilesDone { get; set; }

    [Required]
    public int Champs { get; set; }
}