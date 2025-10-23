namespace API.Repositories.Interfaces
{
    public interface IQueryRepository<T>
    {
        IQueryable<T> AsQueryable();
    }
}