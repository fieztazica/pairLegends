using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class PLContext : DbContext
    {
        public PLContext(DbContextOptions options) : base(options)
        {
        }
    }
}
