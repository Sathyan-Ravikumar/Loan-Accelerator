using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using System.Security.Cryptography;
using System.Text;

namespace LoanAccelerator.Services
{
    public class UsersServices : IUserService
    {
        #region fields
        private readonly IUserRepository _repo;
        private readonly IConfiguration _config;
        #endregion

        #region parameterized constructor
        public UsersServices(IUserRepository repo,IConfiguration config)

        {
            _repo = repo;
            _config = config;
        }
        #endregion

        #region method to add new user
        /// <summary>
        /// Adds a new user.
        /// </summary>
        /// <param name="user">The user to add.</param>
        /// <returns>The added user.</returns>

        public async Task<User> AddUser(User user)
        {
            
            var obj = await _repo.AddNewUser(user);
            return obj;
        }
        #endregion

        #region method to retrieve all the user details
        /// <summary>
        /// Retrieves all users.
        /// </summary>
        /// <returns>A collection of all users.</returns>

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _repo.GetAll();
            return users;
        }
        #endregion

        #region method to retrieves a user by email
        /// <summary>
        /// Retrieves a user by email.
        /// </summary>
        /// <param name="email">The email of the user to retrieve.</param>
        /// <returns>The user with the specified email if found, otherwise null.</returns>

        public async Task<User> GetUserByEmail(string email)
        {
            var emailId = await _repo.GetUserByEmailId(email);
            return emailId;
        }
        #endregion

        #region method to check if the email exists or not 
        /// <summary>
        /// Checks if an email exists.
        /// </summary>
        /// <param name="email">The email to check.</param>
        /// <returns>True if the email exists, otherwise false.</returns>

        public async Task<bool> CheckEmailExists(string email)
        {
            var existingUser = await GetUserByEmail(email);
            return existingUser != null;
        }
        #endregion

        #region methods to update a user information 
        /// <summary>
        /// Updates a user's information.
        /// </summary>
        /// <param name="user">The updated user information.</param>

        public async Task UpdateUser(User user)
        {
           
            await _repo.UpdateUsers(user);
        }
        #endregion

    }
}
