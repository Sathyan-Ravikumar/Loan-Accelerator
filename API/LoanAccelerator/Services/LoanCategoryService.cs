using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.RepositoryInterfaces;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    /// <summary>
    /// Service class responsible for managing loan categories.
    /// </summary>
    public class LoanCategoryService : ILoanCategoryService
    {
        #region fields
        private readonly IMasterRepository<LoanCategory, int> _repo;
        #endregion

        #region  parameterized constructor
        /// <summary>
        /// Initializes a new instance of the <see cref="LoanCategoryService"/> class.
        /// </summary>
        /// <param name="repo">The repository providing loan category functionality.</param>
        public LoanCategoryService(IMasterRepository<LoanCategory, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region method to retrieves the loan category
        /// <summary>
        /// Retrieves a list of loan categories.
        /// </summary>
        /// <returns>A list of loan categories.</returns>
        public async Task<IEnumerable<LoanCategory>> GetLoancategory()
        {
            var category = await _repo.GetAll();
            return category;
        }
        #endregion

        #region method to Retrieves a loan category by its ID.
        /// <summary>
        /// Retrieves a loan category by its ID.
        /// </summary>
        /// <param name="id">The ID of the loan category to retrieve.</param>
        /// <returns>The loan category if found, otherwise null.</returns>
        public async Task<LoanCategory> GetLoanCategoryById(int id)
        {
            var category = await _repo.GetById(id);
            return category;
        }
        #endregion

        #region method to Creates a new loan category.
        /// <summary>
        /// Creates a new loan category.
        /// </summary>
        /// <param name="category">The loan category to create.</param>
        /// <returns>The created loan category.</returns>
        public async Task<LoanCategory> PostLoanCategory(LoanCategory category)
        {
            var loanCategory = await _repo.Post(category);
            return loanCategory;

        }
        #endregion

        #region method to Updates an existing loan category.
        /// <summary>
        /// Updates an existing loan category.
        /// </summary>
        /// <param name="id">The ID of the loan category to update.</param>
        /// <param name="category">The updated loan category.</param>
        /// <returns>The updated loan category.</returns>
        public async Task<LoanCategory> PutLoanCategory(int id, LoanCategory category)
        {
            var loanCategory = await _repo.Put(id, category);
            return loanCategory;
        }
        #endregion



    }
}
