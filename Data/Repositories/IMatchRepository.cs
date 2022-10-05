using Microsoft.EntityFrameworkCore;
using Model.Database;
using System.Linq.Expressions;

namespace Data.Repositories;

public interface IMatchRepository : IRepository<Match>
{
    Task<Match> GetByBeginAtAsync(Guid id, DateTime beginAt);
}