using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface ILoanService
    {
        public Task<List<Loan>> GetLoanTables();
        public Task<Loan> PutLoanTable(int id, Loan loan);
        public Task<Loan> GetLoanTable(int id);
        public Task<Loan> PostLoanTable(int userid,Loan loan);
        public Task<Loan> PutLoanApproval(int id, Loan loan);
        public Task<Loan> PutStage(int id, int stage);
        public Task<Loan> GetByLoanId(int loanid);
        void PostLoanTable(Loan loan);
    }
}
