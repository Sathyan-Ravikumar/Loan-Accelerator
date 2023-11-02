using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{

    public class EmploymentService : IEmploymentService
    {
        #region fields
        private readonly IRepository<Employment, int> _repo;
        #endregion

        #region parameterized constructor
        public EmploymentService(IRepository<Employment, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region method to retrieves  a list of employment tables.
        /// <summary>
        /// Retrieves a list of employment tables.
        /// </summary>
        /// <returns>A list of employment tables.</returns>
        public async Task<List<Employment>> GetEmployementTables()
        {
            var employment = await _repo.GetAll();
            return employment;
        }
        #endregion

        #region method to Creates a new employment table.
        /// <summary>
        /// Creates a new employment table.
        /// </summary>
        /// <param name="employementTable">The employment table to create.</param>
        /// <returns>The created employment table.</returns>
        public async Task<Employment> PostEmployementTable(Employment employementTable)
        {
            var employment = await _repo.Post(employementTable);
            return employment;
        }
        #endregion

        #region method to update an existing table

        /// <summary>
        /// Updates an existing employment table.
        /// </summary>
        /// <param name="id">The ID of the employment table to update.</param>
        /// <param name="employementTable">The updated employment table.</param>
        /// <returns>The updated employment table.</returns>
        public async Task<Employment> PutEmployementTable(int id, Employment employementTable)
        {
            var employment = await _repo.Put(id, employementTable);
            return employment;
        }
        #endregion

        public async Task<Employment> GetByLoanId(int loanid)
        {
            var result = await _repo.GetByLoanId(loanid);
            return result;
        }
    }
}
