using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.RepoInterface
{
    public interface IUserRepository
    {
        public Task<User> AddNewUser(User user);
        public Task<User> GetUserByEmailId(string email);
        public Task<List<User>> GetAll();
        public Task UpdateUsers(User user);

    }
}
