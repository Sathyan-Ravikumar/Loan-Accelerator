using Azure.Core;
using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    /// <summary>
    /// Service class responsible for managing loans.
    /// </summary>
    public class LoanService : ILoanService
    {

        #region fields
        private readonly IRepository<Loan, int> _repo;
         private readonly ITokenService _token;
        #endregion

        #region parameterized constructor
        public LoanService(IRepository<Loan, int> repo, ITokenService token)
        {
            _repo = repo;
            _token = token;
        }
        #endregion

        #region method to retrieves a list of loan entries.
        /// <summary>
        /// Retrieves a list of loan entries.
        /// </summary>
        /// <returns>A list of loan entries.</returns>
        public async Task<List<Loan>> GetLoanTables()
        {
            var loans = await _repo.GetAll();
            return loans;
        }
        #endregion

        #region  method to updates an existing loan entry.
        /// <summary>
        /// Updates an existing loan entry.
        /// </summary>
        /// <param name="id">The ID of the loan to update.</param>
        /// <param name="loan">The updated loan entry.</param>
        /// <returns>The updated loan entry.</returns>
        public async Task<Loan> PutLoanTable(int id, Loan loan)
        {
            var obj = await _repo.Put(id, loan);
            return obj;
        }
        #endregion

        #region method to retrieves a loan entry by its id
        /// <summary>
        /// Retrieves a loan entry by its ID.
        /// </summary>
        /// <param name="id">The ID of the loan to retrieve.</param>
        /// <returns>The loan entry if found, otherwise null.</returns>
        public async Task<Loan> GetLoanTable(int id)
        {
            var obj = await _repo.GetById(id);
            return obj;
        }
        #endregion

        #region method to create a new loan entry
        /// <summary>
        /// Creates a new loan entry.
        /// </summary>
        /// <param name="loan">The loan entry to create.</param>
        /// <returns>The created loan entry.</returns>
        public async Task<Loan> PostLoanTable(int userid, Loan loan)

        {
            loan.UserId = userid;
            var obj = await _repo.Post(loan);
            return obj;
        }
        #endregion

        #region method to updates the approval details of a loan entry.
        /// <summary>
        /// Updates the approval details of a loan entry.
        /// </summary>
        /// <param name="id">The ID of the loan entry to update.</param>
        /// <param name="loan">The updated loan entry with approval details.</param>
        /// <returns>The updated loan entry.</returns>
        public async Task<Loan> PutLoanApproval(int id, Loan loan)
        {
            var value = await _repo.GetById(id);
            value.ApprovedTenure = loan.ApprovedTenure;
            value.ApprovedDate = loan.ApprovedDate;
            value.ApprovedAmount = loan.ApprovedAmount;
            value.Interest = loan.Interest;
            value.StatusId = loan.StatusId;
            await _repo.SaveChangesAsync();
            return loan;
        }
        #endregion

        #region method to update the stage of the loan entry
        /// <summary>
        /// Updates the stage of a loan entry.
        /// </summary>
        /// <param name="id">The ID of the loan entry to update.</param>
        /// <param name="stage">The new stage value.</param>
        /// <returns>The updated loan entry.</returns>
        public async Task<Loan> PutStage(int id, int stage)
        {
            var value = await _repo.GetById(id);
            value.Stage = stage;
            await _repo.SaveChangesAsync();
            return value;
        }
        #endregion

        public async Task<Loan> GetByLoanId(int loanid)
        {
            var result = await _repo.GetByLoanId(loanid);
            return result;
        }

        public void PostLoanTable(Loan loan)
        {
            throw new NotImplementedException();
        }
    }
}
