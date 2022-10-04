using Microsoft.EntityFrameworkCore;
using Model.Database;

namespace Data.Repositories;

public class MatchRepository : GenericRepository<Match>, IMatchRepository
{
    public MatchRepository(PLContext context) : base(context)
    {
    }
    public async Task<Match> GetByBeginAtAsync(Guid id, DateTime beginAt)
    {
        return (await _dbSet.FindAsync(id, beginAt))!;
    }
}