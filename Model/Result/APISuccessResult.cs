namespace Model.Result;

public class ApiSuccessResult<T> : ApiResult<T>
{
    public ApiSuccessResult(T resultObject)
    {
        Succeeded = true;
        ResultObject = resultObject;
    }

    public ApiSuccessResult()
    {
        Succeeded = true;
    }
}