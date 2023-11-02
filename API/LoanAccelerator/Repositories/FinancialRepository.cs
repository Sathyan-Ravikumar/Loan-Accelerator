using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class FinancialRepository : IRepository<Financial, int>
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public FinancialRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        #endregion

        #region Create - Post method
        public async Task<Financial> Post(Financial financial)
        {
            _dbcontext!.Financials.Add(financial);
            await _dbcontext.SaveChangesAsync();
            return financial;
        }
        #endregion

        #region Get All method
        public async Task<List<Financial>> GetAll()
        {
            var obj = await _dbcontext!.Financials.ToListAsync();
            if (obj == null)
            {
                throw new Exception("No data");
            }
            return obj;

        }
        #endregion

        #region Get by Id method
        public async Task<Financial> GetById(int id)
        {
            var financialInformation = await _dbcontext!.Financials.FindAsync(id);
            return financialInformation!;
        }
        #endregion

        #region Delete method
        public async Task<Financial> Delete(int id)
        {
            var financialInformation = await _dbcontext!.Financials.FindAsync(id);
            _dbcontext.Financials.Remove(financialInformation!);
            if (financialInformation == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return financialInformation;
        }
        #endregion

        #region Update - Put method
        public async Task<Financial> Put(int id, Financial financialInformationTable)
        {
            var financials = await _dbcontext!.Financials.FindAsync(id);
            financials!.IncomeSalary = financialInformationTable.IncomeSalary != null ? financialInformationTable.IncomeSalary:financialInformationTable.IncomeSalary;
            financials.IncomeRent = financialInformationTable.IncomeRent != null ? financialInformationTable.IncomeRent : financialInformationTable.IncomeRent;
            financials.OtherIncome = financialInformationTable.OtherIncome != null ? financialInformationTable.OtherIncome : financialInformationTable.OtherIncome;
            financials.RentAndUtility = financialInformationTable.RentAndUtility != null ? financialInformationTable.RentAndUtility : financialInformationTable.RentAndUtility;
            financials.FoodAndClothing = financialInformationTable.FoodAndClothing != null ? financialInformationTable.FoodAndClothing : financialInformationTable.FoodAndClothing;
            financials.Education = financialInformationTable.Education != null ? financialInformationTable.Education : financialInformationTable.Education;
            financials.LoanRepayment = financialInformationTable.LoanRepayment != null ? financialInformationTable.LoanRepayment : financialInformationTable.LoanRepayment;
            financials.OtherExpenses = financialInformationTable.OtherExpenses != null ? financialInformationTable.OtherExpenses : financialInformationTable.OtherExpenses;
            financials.Cfwob = financialInformationTable.Cfwob != null ? financialInformationTable.Cfwob : financialInformationTable.Cfwob;
            financials.InterstRate = financialInformationTable.InterstRate != null ? financialInformationTable.InterstRate : financialInformationTable.InterstRate;
            financials.CarCount = financialInformationTable.CarCount != null ? financialInformationTable.CarCount : financialInformationTable.CarCount;
            financials.Dwob = financialInformationTable.Dwob != null ? financialInformationTable.Dwob : financialInformationTable.Dwob ;
            await _dbcontext.SaveChangesAsync();
            return financials;
        }
        #endregion

        #region Save change
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

        #region Get by loan Id method
        public async Task<Financial> GetByLoanId(int loanid)
        {
            var financial = await _dbcontext!.Financials.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return financial!;
        }
        #endregion
    }
}
