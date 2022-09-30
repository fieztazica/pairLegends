using Microsoft.EntityFrameworkCore.Storage;

namespace Data.UnitOfWork;

public interface IUnitOfWork
{
    PLContext DbContext { get; set; }
    int Commit();
    IDbContextTransaction BeginTransaction();
}