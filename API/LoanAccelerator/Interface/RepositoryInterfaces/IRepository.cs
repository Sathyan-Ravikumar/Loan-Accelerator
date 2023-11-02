namespace LoanAccelerator.Interface.RepoInterface
{
    public interface IRepository<T, K>
    {
        Task<T> Post(T item);
        Task<T> Put(K id, T item);
        Task<T> GetById(K item);
        Task<List<T>> GetAll();
        Task<T> Delete(K item);
        Task SaveChangesAsync();

        Task<T> GetByLoanId(K loanid);

    }
}
