namespace Model.Response;

public class PagedList<T>
{
    public int PageIndex { get; set; }
    public bool HasNext => PageIndex < PageCount;
    public bool HasPrevious => PageIndex > 1;
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int PageCount 
    {
        get
        {
            var pageCount = (double)TotalCount / PageSize;
            return (int)Math.Ceiling(pageCount);    
        } 
    }
    public IEnumerable<T> Items { get; set; } = new List<T>();
}