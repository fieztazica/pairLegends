namespace Model.Response;

public class MatchResponse
{
    public string PLUserId { get; set; }
    public DateTime BeginAt { get; set; } = DateTime.Now;
    public DateTime EndAt { get; set; } = DateTime.Now;
    public int Tiles { get; set; }
    public int TilesDone { get; set; }
    public int Champs { get; set; }
}