using Model.Request;
using Model.Response;
using Model.Result;

namespace Service.APIServices;

public interface IRoleService
{
    public Task<ApiResult<IEnumerable<RoleResponse>>> GetList();
    public Task<ApiResult<bool>> Create(RoleRequest roleResponse);
}