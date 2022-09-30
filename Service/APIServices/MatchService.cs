using AutoMapper;
using Data.Repositories;
using Data.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using Model.Database;
using Model.Request;
using Model.Response;
using Model.Result;

namespace Service.APIServices;

public class MatchService : IMatchService
{
    private readonly IMatchRepository _matchRepo;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<AppUser> _userManager;
    
    public MatchService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IMatchRepository matchRepo, 
        UserManager<AppUser> userManager)
    {
        this._mapper = mapper;
        this._unitOfWork = unitOfWork;
        this._userManager = userManager;
        this._matchRepo = new MatchRepository(unitOfWork.DbContext);
    }
    
    public async Task<ApiResult<string>> AddMatch(MatchRequest matchRequest)
    {
        var user = await _userManager.FindByNameAsync(matchRequest.UserName);
        if (user == null)
        {
            return new ApiErrorResult<string>("Cannot found Winner!");
        }
        var result = _mapper.Map<MatchRequest, Match>(matchRequest);
        _matchRepo.Add(result);

        var affectRowNumber = _unitOfWork.Commit();

        if (affectRowNumber > 0)
            return new ApiSuccessResult<string>("Add match successfully!");
        return new ApiErrorResult<string>("Add match failed!");
    }

    // public async Task<ApiResult<string>> DeleteResultById(Guid resultId, DeleteMatchRequest resultRequest)
    // {
    //     var result = await _resultRepo.GetByIdAsync(resultId);
    //     if (result == null)
    //         return new ApiErrorResult<string>("Game does not exist!");
    //     _resultRepo.Delete(result);
    //     var affectRowNumber = _unitOfWork.Commit();
    //
    //
    //     if (affectRowNumber > 0)
    //         return new ApiSuccessResult<string>("Delete result successfully!");
    //     return new ApiErrorResult<string>("Delete result fail!");
    // }

    // Not working yet
    // public async Task<ApiResult<string>> DeleteResultByUserName(string userName, DeleteMatchRequest resultRequest)
    // {
    //     var user = await _userManager.FindByNameAsync(userName);
    //     if (user == null)
    //     {
    //         return new ApiErrorResult<string>("Cannot found user!");
    //     }
    //     var resultIdList = _resultRepo.GetList(
    //         includeProperties: "UserResults",
    //         filter: result => result.UserResults.Any(userResult => userResult.UserId == user.Id)
    //     ).Select(result => result.Id);
    //     _resultRepo.Delete(res => resultIdList.Contains(res.Id));
    //     var affectRowNumber = _unitOfWork.Commit();
    //
    //
    //     if (affectRowNumber > 0)
    //         return new ApiSuccessResult<string>("Delete result successfully!");
    //     return new ApiErrorResult<string>("Delete result fail!");
    // }

    public ApiResult<IEnumerable<MatchResponse>> GetMatches(PagingRequest pagingRequest)
    {
        var resultList = _matchRepo.GetList(
            skip: (pagingRequest.PageIndex - 1) * pagingRequest.PageSize,
            take: pagingRequest.PageSize
        );
        if (resultList.Any())
            return new ApiErrorResult<IEnumerable<MatchResponse>>("Get result list failed!");
        var response = _mapper.Map<IEnumerable<MatchResponse>>(resultList);
        return new ApiSuccessResult<IEnumerable<MatchResponse>>(response);
    }
}