using Model.Request;
using Model.Response;
using Model.Result;

namespace Service.APIServices;

public interface IMatchService
{
    Task<ApiResult<string>> AddMatch(MatchRequest resultRequest);
    // Task<ApiResult<string>> DeleteResultByUserName (string userName, DeleteResultRequest resultRequest);
    // Task<ApiResult<string>> DeleteResultById (Guid resultId, DeleteResultRequest resultRequest);
    ApiResult<IEnumerable<MatchResponse>> GetMatches(PagingRequest pagingRequest);
}