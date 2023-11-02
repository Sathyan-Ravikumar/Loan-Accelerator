using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.RepositoryInterfaces;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class StatusRepository : IMasterRepository<Status,int>
    {
        #region Property 

        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor 
        public StatusRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;

        }
        #endregion

        #region Create - Post method
        public async Task<Status> Post(Status user)
        {
            await _dbcontext!.Statuses.AddAsync(user);
            await _dbcontext.SaveChangesAsync();
            return user;
        }
        #endregion

        #region Create - Put method 
        public async Task<Status> Put(int id, Status user)
        {
            var obj = await _dbcontext!.Statuses.FindAsync(id);
            obj.Status1 = user.Status1;
            await _dbcontext.SaveChangesAsync();
            return obj;
        }
        #endregion

        #region Get All method

        public async Task<List<Status>> GetAll()
        {
            return await _dbcontext!.Statuses.ToListAsync();
        }
        #endregion


        #region Get by Id
        public async Task<Status> GetById(int id)
        {
            var users = await _dbcontext!.Statuses.FindAsync(id);
            return users!;
        }
        #endregion

        #region Delete method
        public async Task<Status> Delete(int id)
        {
            var users = await _dbcontext!.Statuses.FindAsync(id);
            _dbcontext.Statuses.Remove(users!);
            if (users == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return users;
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
