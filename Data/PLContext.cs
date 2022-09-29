using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model.Database;

namespace Data
{
    public class PLContext : IdentityDbContext<AppUser>
    {
        public DbSet<Match> Matches { get; set; }
        public PLContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Match>()
                .HasKey(match => new
                {
                    match.PLUserId,
                    match.BeginAt
                });
            builder
                .Entity<Match>()
                .HasOne(match => match.PLUser)
                .WithMany(user => user.Matches)
                .HasForeignKey(match => match.PLUserId);
            base.OnModelCreating(builder);
            // Customize the ASP.NET Core Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Core Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
