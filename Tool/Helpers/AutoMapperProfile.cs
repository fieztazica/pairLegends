using AutoMapper;
using Model.Action;
using Model.Database;
using Model.Request;
using Model.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tool.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<AppUser, UserResponse>();
        CreateMap<UserResponse, AppUser>();
        CreateMap<RoleRequest, AppRole>();
        CreateMap<AppRole, RoleResponse>();
        CreateMap<RegisterRequest, AppUser>();
        CreateMap<MatchRequest, Match>();
        CreateMap<Match, MatchResponse>();
        CreateMap<RegisterRequest, LoginRequest>();
        CreateMap<RegisterModel, LoginModel>()
            .AfterMap((src, des, context) =>
            {
                des.Input = context.Mapper.Map<LoginRequest>(src.Input);
            });
    }
}