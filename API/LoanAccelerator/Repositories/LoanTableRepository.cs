using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class LoanTableRepository : IRepository<Loan,int>
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public LoanTableRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        #endregion

        #region Create - Post method
        public async Task<Loan> Post(Loan loanTable)
        {
            _dbcontext!.Loans.Add(loanTable);
            await _dbcontext.SaveChangesAsync();
            _dbcontext.Entry(loanTable).Reload();
            return loanTable;
        }
        #endregion

        #region Get All method
        public async Task<List<Loan>> GetAll()
        {
            return await _dbcontext!.Loans.ToListAsync();
        }
        #endregion

        #region Get by Id method

        public async Task<Loan> GetById(int id)
        {
            var loans = await _dbcontext!.Loans.FindAsync(id);
          
            return loans!;
        }
        #endregion

        #region Delete method 
        public async Task<Loan> Delete(int id)
        {
            var loans = await _dbcontext!.Loans.FindAsync(id);
            _dbcontext.Loans.Remove(loans!);
            if (loans == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return loans;
        }
        #endregion

        #region Update - Put method
        public async Task<Loan> Put(int id, Loan loan)
        {
            var loans = await _dbcontext!.Loans.FindAsync(id);
             loans!.StatusId = loan.StatusId == null ? loans!.StatusId : loan.StatusId;
            loans.ApprovedTenure = loan.ApprovedTenure == null ? loans.ApprovedTenure : loan.ApprovedTenure;
            loans.ApprovedDate = loan.ApprovedDate == null ? loans.ApprovedDate:loan.ApprovedDate;
            loans.ApprovedAmount = loan.ApprovedAmount == null ? loans.ApprovedAmount : loan.ApprovedAmount;
            loans.Purpose = loan.Purpose == null ? loans.Purpose : loan.Purpose;
            loans.LoanTypeId = loan.LoanTypeId == null ? loans.LoanTypeId : loan.LoanTypeId;
            loans.LoanCategoryId = loan.LoanCategoryId == null ? loans.LoanCategoryId : loan.LoanCategoryId;
            loans.AppliedDate = loan.AppliedDate == null ? loans.AppliedDate : loan.AppliedDate;
            loans.AppliedAmount = loan.AppliedAmount == null ? loans.AppliedAmount : loan.AppliedAmount;
            loans.RequestedTenure = loan.RequestedTenure == null ? loans.RequestedTenure : loan.RequestedTenure;
            loans.Interest = loan.Interest == null ? loans.Interest : loan.Interest;
            loans.ExpenditureAmount = loan.ExpenditureAmount == null ? loans.ExpenditureAmount : loan.ExpenditureAmount;

            await _dbcontext.SaveChangesAsync();
            return loans;
        }
        #endregion

        #region Save change
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

        #region Get by Loan Id method 
        public async Task<Loan> GetByLoanId(int loanid)
        {
            var loan = await _dbcontext!.Loans.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return loan;
        }
        #endregion
    }
}
