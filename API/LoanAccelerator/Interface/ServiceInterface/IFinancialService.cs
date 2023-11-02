using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IFinancialService
    {
        public Task<List<Financial>> GetFinancialInformationTables();
        public Task<Financial> PostFinancialInformationTable(Financial financialInformationTable);
        public Task<Financial> PutFinancialInformationTable(int id, Financial financialInformationTable);
        public Task<Financial> GetByLoanId(int loanid);

    }
}
