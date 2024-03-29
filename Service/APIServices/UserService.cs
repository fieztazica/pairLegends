﻿using System.Linq.Expressions;
using AutoMapper;
using Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model.Database;
using Model.Request;
using Model.Response;
using Model.Result;

namespace Service.APIServices;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IJwtManager _jwtManager;
    private readonly IMapper _mapper;

    public UserService(UserManager<AppUser> userManager, IJwtManager jwtManager, IMapper mapper)
    {
        _userManager = userManager;
        _jwtManager = jwtManager;
        _mapper = mapper;
    }
    public async Task<ApiResult<string>> Authenticate(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return new ApiErrorResult<string>("Username or password incorrect!");
        var result = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!result)
            return new ApiErrorResult<string>("Username or password incorrect!");
        var roles = await _userManager.GetRolesAsync(user);
        var token = _jwtManager.Authenticate(user, roles, request.RememberMe);
        return new ApiSuccessResult<string>(token);
    }

    public async Task<ApiResult<bool>> Delete(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            return new ApiErrorResult<bool>("User does not exist!");
        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
            return new ApiSuccessResult<bool>(true);
        return new ApiErrorResult<bool>("Delete failed!");
    }

    public async Task<ApiResult<bool>> Delete(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
            return new ApiErrorResult<bool>("User does not exist!");
        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
            return new ApiSuccessResult<bool>(true);
        return new ApiErrorResult<bool>("Delete failed!");
    }

    public async Task<ApiResult<UserResponse>> GetById(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            return new ApiErrorResult<UserResponse>("User does not exist!");
        var roles = await _userManager.GetRolesAsync(user);
        var userResponse = _mapper.Map<UserResponse>(user);
        userResponse.Roles = roles;
        return new ApiSuccessResult<UserResponse>(userResponse);
    }

    public async Task<ApiResult<UserResponse>> GetByUserName(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
            return new ApiErrorResult<UserResponse>("User does not exist!");
        var roles = await _userManager.GetRolesAsync(user);
        var userResponse = _mapper.Map<UserResponse>(user);
        userResponse.Roles = roles;
        return new ApiSuccessResult<UserResponse>(userResponse);
    }

    public async Task<IEnumerable<AppUser>> GetUserList(
        Expression<Func<AppUser, bool>>? filter = null,
        Func<IQueryable<AppUser>, IOrderedQueryable<AppUser>>? orderBy = null,
        string includeProperties = "",
        int take = 0,
        int skip = 0)
    {
        var query = _userManager.Users.AsQueryable();
        IList<AppUser> userList;
        if (filter != null) query = query.Where(filter);
        foreach (var includeProperty in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
            query = query.Include(includeProperty);
        if (skip > 0) query = query.Skip(skip);
        if (take > 0) query = query.Take(take);
        if (orderBy != null)
            userList = await orderBy(query).ToListAsync();
        else
            userList = await query.ToListAsync();

        return userList;
    }

    public async Task<ApiResult<PagedList<UserResponse>>> GetUserPagingList(PagingRequest request)
    {
        const int defaultPageSize = 10;
        const int defaultPageIndex = 1;
        var pageSize = defaultPageSize;
        var pageIndex = defaultPageIndex;

        if (request.PageSize > 0) pageSize = request.PageSize;
        if (request.PageIndex > 0) pageIndex = request.PageIndex;

        var totalUser = await _userManager.Users.CountAsync();
        var userList = await GetUserList(
            skip: pageSize * (pageIndex - 1),
            take: pageSize
        );
        var userResponseList = _mapper.Map<IEnumerable<UserResponse>>(userList);
        var pageResult = new PagedList<UserResponse>
        {
            TotalCount = totalUser,
            PageIndex = pageIndex,
            PageSize = pageSize,
            Items = userResponseList
        };
        return new ApiSuccessResult<PagedList<UserResponse>>(pageResult);
    }

    public async Task<ApiResult<bool>> Register(RegisterRequest request)
    {
        var findUserName = await _userManager.FindByNameAsync(request.UserName);
        var findEmail = await _userManager.FindByEmailAsync(request.Email);

        var isUserNameExists = findUserName != null;
        var isEmailExists = findEmail != null;

        if (isUserNameExists)
            return new ApiErrorResult<bool>("This username is already in used.");
        if (isEmailExists)
            return new ApiErrorResult<bool>("This email is already in used");
        if (request.Password != request.ConfirmPassword)
            return new ApiErrorResult<bool>("Password and confirm password are not the same.");
        var user = _mapper.Map<AppUser>(request);
        var result = await _userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
            return new ApiSuccessResult<bool>(true);
        return new ApiErrorResult<bool>("Registration failed!");
    }

    public async Task<ApiResult<bool>> ChangePassword(ChangePasswordRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.Id.ToString());
        if (user == null)
            return new ApiErrorResult<bool>("User does not exist.");
        var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        if (result.Succeeded)
            return new ApiSuccessResult<bool>(true);
        var errorMessages = result.Errors.Select(error => error.Description).ToArray();
        return new ApiErrorResult<bool>(errorMessages);
    }

    public async Task<ApiResult<bool>> RoleAssign(RoleAssignRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.Id.ToString());
        if (user == null)
            return new ApiErrorResult<bool>("User does not exist");
        var removedRoles = request.Roles.Where(x => !x.Selected).Select(x => x.Name).ToList();
        foreach (var roleName in removedRoles)
            if (await _userManager.IsInRoleAsync(user, roleName))
                await _userManager.RemoveFromRoleAsync(user, roleName);
        await _userManager.RemoveFromRolesAsync(user, removedRoles);

        var addedRoles = request.Roles.Where(x => x.Selected).Select(x => x.Name).ToList();
        foreach (var roleName in addedRoles)
            if (!await _userManager.IsInRoleAsync(user, roleName))
                await _userManager.AddToRoleAsync(user, roleName);

        return new ApiSuccessResult<bool>(true);
    }

    public async Task<ApiResult<bool>> Update(UpdateUserRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.Id.ToString());
        if (user == null)
            return new ApiErrorResult<bool>("User does not exist.");
        var checkPwd = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!checkPwd)
            return new ApiErrorResult<bool>("Password incorrect!");

        if (request.UserName != null && await _userManager.Users.AnyAsync(x => x.UserName == request.UserName))
            return new ApiErrorResult<bool>("Username is already existed.");

        if (request.Email != null && await _userManager.Users.AnyAsync(x => x.Email == request.Email))
            return new ApiErrorResult<bool>("Email is already existed.");

        if (!string.IsNullOrEmpty(request.Email))
            user.Email = request.Email;
        if (!string.IsNullOrEmpty(request.UserName))
            user.UserName = request.UserName;

        var result = await _userManager.UpdateAsync(user);
        if (result.Succeeded)
            return new ApiSuccessResult<bool>(true);
        return new ApiErrorResult<bool>("Update failed!");
    }
}