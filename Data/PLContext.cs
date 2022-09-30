using Data.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model.Database;

namespace Data
{
    public class PLContext : IdentityDbContext<AppUser, AppRole, Guid>
    {
        public DbSet<Match> Matches { get; set; }

        public PLContext(DbContextOptions<PLContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new MatchConfiguration());

            builder.Entity<AppRole>().HasData(
                new AppRole
                {
                    Id = Guid.NewGuid(), Name = "Admin", NormalizedName = "ADMIN", Description = "Admin Role"
                },
                new AppRole
                {
                    Id = Guid.NewGuid(), Name = "Manager", NormalizedName = "MANAGER", Description = "Manager Role"
                }
            );
        }
    }
}