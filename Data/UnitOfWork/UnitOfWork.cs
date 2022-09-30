using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Data.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    public PLContext DbContext { get; set; }
    public UnitOfWork(IDbContextFactory<PLContext> dbContextFactory)
    {
        DbContext = dbContextFactory.CreateDbContext();
    }

    public int Commit()
    {
        return DbContext.SaveChanges();
    }

    public IDbContextTransaction BeginTransaction()
    {
        return DbContext.Database.BeginTransaction();
    }
}