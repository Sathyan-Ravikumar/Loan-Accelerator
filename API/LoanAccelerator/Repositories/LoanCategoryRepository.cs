 using LoanAccelerator.Interface.RepositoryInterfaces;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class LoanCategoryRepository :IMasterRepository<LoanCategory,int>
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor 
        public LoanCategoryRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        #endregion

        #region Create - Post method
        public async Task<LoanCategory> Post(LoanCategory category)
        {
            var loanCategories = await _dbcontext!.LoanCategories.AddAsync(category);
            if (category.LoanCategoryKey == null)
            {
                throw new Exception("LoanCategoryKey is Required");
            }
            if (category.LoanCategory1 == null)
            {
                throw new Exception("LoanCategory is Required");
            }
            await _dbcontext.SaveChangesAsync();
            return category;
        }
        #endregion

        #region Get All method
        public async Task<List<LoanCategory>> GetAll()
        {
            var obj = await _dbcontext!.LoanCategories.ToListAsync();
            if (obj == null)
            {
                throw new Exception("No data");
            }
            return obj;

        }
        #endregion

        #region Get by Id method
        public async Task<LoanCategory> GetById(int id)
        {
            var loanDocument = await _dbcontext!.LoanCategories.FindAsync(id);
            return loanDocument!;
        }
        #endregion

        #region Delete method
        public async Task<LoanCategory> Delete(int id)
        {
            var loanDocument = await _dbcontext!.LoanCategories.FindAsync(id);
            _dbcontext.LoanCategories.Remove(loanDocument!);
            if (loanDocument == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return loanDocument;
        }
        #endregion

        #region Update - Put method
        public async Task<LoanCategory> Put(int id, LoanCategory category)
        {
            var loanCategories = await _dbcontext!.LoanCategories.FindAsync(id);
            loanCategories!.LoanCategory1 = category.LoanCategory1;
            loanCategories.LoanCategoryKey = category.LoanCategoryKey;
            await _dbcontext.SaveChangesAsync();
            return loanCategories;
        }
        #endregion

        #region Save change
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion
    }
}
