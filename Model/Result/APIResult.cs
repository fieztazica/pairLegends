namespace Model.Result;

public class ApiResult<T>
{
    public bool Succeeded { get; set; }
    public string Message { get; set; } = string.Empty;
    public T ResultObject { get; set; } = default!;
}