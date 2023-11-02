using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    /// <summary>
    /// Service class responsible for managing financial information.
    /// </summary>
    public class FinancialService : IFinancialService
    {

        #region fields
        private readonly IRepository<Financial, int> _repo;
        #endregion

        #region parameterized constructor
        /// <summary>
        /// Initializes a new instance of the <see cref="FinancialService"/> class.
        /// </summary>
        /// <param name="repo">The repository providing financial information functionality.</param>
        public FinancialService(IRepository<Financial, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region method to Retrieves a list of financial information tables. 


        /// <summary>
        /// Retrieves a list of financial information tables.
        /// </summary>
        /// <returns>A list of financial information tables.</returns>
        public async Task<List<Financial>> GetFinancialInformationTables()
        {
            var financial = await _repo.GetAll();
            return financial;
        }
        #endregion

        #region method to Creates a new financial information entry.

        /// <summary>
        /// Creates a new financial information entry.
        /// </summary>
        /// <param name="financialInformationTable">The financial information to create.</param>
        /// <returns>The created financial information.</returns>
        public async Task<Financial> PostFinancialInformationTable(Financial financialInformationTable)
        {
            var financial = await _repo.Post(financialInformationTable);
            return financial;
        }
        #endregion

        #region method to update an existing financial information entry.
        /// <summary>
        /// Updates an existing financial information entry.
        /// </summary>
        /// <param name="id">The ID of the financial information entry to update.</param>
        /// <param name="financialInformationTable">The updated financial information.</param>
        /// <returns>The updated financial information.</returns>
        public async Task<Financial> PutFinancialInformationTable(int id, Financial financialInformationTable)
        {
            var financial = await _repo.Put(id, financialInformationTable);
            return financial;
        }
        #endregion

        public async Task<Financial> GetByLoanId(int loanid)
        {
            var result = await _repo.GetByLoanId(loanid);
            return result;
        }
    }
}
