using System.ComponentModel.DataAnnotations;

namespace Model.Request;

public class MatchRequest
{
    [Required]
    public string UserName { get; set; } = string.Empty;
    public int Hour { get; set; } = 0;
    [Range(0, 60)]
    public int Minute { get; set; } = 0;
    [Range(0, 60)]
    public int Second { get; set; } = 0;
}