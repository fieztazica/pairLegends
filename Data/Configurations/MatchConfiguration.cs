using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Database;

namespace Data.Configurations;

public class MatchConfiguration : IEntityTypeConfiguration<Match>
{
    public void Configure(EntityTypeBuilder<Match> builder)
    {
        builder.ToTable(nameof(Match), "dbo");

        builder
            .HasKey(match => new
            {
                match.Id,
                match.BeginAt
            });
        builder
            .HasOne(match => match.PLUser)
            .WithMany(user => user.Matches)
            .HasForeignKey(match => match.Id);
    }
}