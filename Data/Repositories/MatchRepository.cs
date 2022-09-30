using Model.Database;

namespace Data.Repositories;

public class MatchRepository : GenericRepository<Match>, IMatchRepository
{
    public MatchRepository(PLContext context) : base(context)
    {
    }
}