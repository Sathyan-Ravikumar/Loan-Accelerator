using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IUserService
    {
        Task<User> AddUser(User user);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserByEmail(string email);
        Task UpdateUser(User user);
        Task<bool> CheckEmailExists(string email);

    }
}
