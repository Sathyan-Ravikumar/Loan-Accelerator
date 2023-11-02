using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{
    public class UserRepository : IUserRepository
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor 
        public UserRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;

        }
        #endregion

        #region User management
        public async Task<User> AddNewUser(User user)
        {
           
            _dbcontext!.Users.Add(user);
            await _dbcontext.SaveChangesAsync();
            _dbcontext.Entry(user).Reload();
            var newUser = await _dbcontext.Users.FirstOrDefaultAsync(u => u.UserId == user.UserId);
            Console.WriteLine(newUser);
            return newUser;
        }
        #endregion

        #region Get user by email Id method
        public async Task<User> GetUserByEmailId(string email)
        {
            var emailid = await _dbcontext!.Users.FirstOrDefaultAsync(u => u.EmailId == email);
            return emailid!;
        }
        #endregion

        #region Update user
        public async Task UpdateUsers(User user)
        {
            _dbcontext!.Entry(user).State = EntityState.Modified;
            await _dbcontext.SaveChangesAsync();
        }
        #endregion

        #region Get all method
        public async Task<List<User>> GetAll()
        {
            return await _dbcontext!.Users.ToListAsync();
        }
        #endregion

        #region Get by Id method 
        public async Task<User> GetById(int id)
        {
            var users = await _dbcontext!.Users.FindAsync(id);
            return users!;
        }
        #endregion

        #region Save changes
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

    }
}
