namespace Model.Request;

public class PagingRequest
{
    public string Keyword { get; set; } = string.Empty;
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}