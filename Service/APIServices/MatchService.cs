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
        var user = await _userManager.FindByIdAsync(matchRequest.Id.ToString());
        if (user == null)
        {
            return new ApiErrorResult<string>("Cannot find player!");
        }
        var match = _mapper.Map<Match>(matchRequest);
        _matchRepo.Add(match);

        var affectRowNumber = _unitOfWork.Commit();

        if (affectRowNumber > 0)
            return new ApiSuccessResult<string>("Add match successfully!");
        return new ApiErrorResult<string>("Add match failed!");
    }

    public async Task<ApiResult<string>> DeleteMatchByBeginAt(DeleteMatchRequest request)
    {
        var result = await _matchRepo.GetByBeginAtAsync(request.Id, request.BeginAt);
        if (result == null)
            return new ApiErrorResult<string>("Match does not exist!");
        _matchRepo.Delete(result);
        var affectRowNumber = _unitOfWork.Commit();

        if (affectRowNumber > 0)
            return new ApiSuccessResult<string>("Delete match successfully!");
        return new ApiErrorResult<string>("Delete match fail!");
    }

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

    public ApiResult<IEnumerable<MatchResponse>> GetMatches(PagingRequest request)
    {
        const int defaultPageSize = 10;
        const int defaultPageIndex = 1;
        var pageSize = defaultPageSize;
        var pageIndex = defaultPageIndex;

        if (request.PageSize > 0) pageSize = request.PageSize;
        if (request.PageIndex > 0) pageIndex = request.PageIndex;

        var matchList = _matchRepo.GetList(
            skip: pageSize * (pageIndex - 1),
            take: pageSize
        );
        if (!matchList.Any())
            return new ApiErrorResult<IEnumerable<MatchResponse>>("Get match list failed!");
        var response = _mapper.Map<IEnumerable<MatchResponse>>(matchList);
        return new ApiSuccessResult<IEnumerable<MatchResponse>>(response);
    }
}