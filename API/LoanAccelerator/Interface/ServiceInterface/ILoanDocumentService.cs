using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface ILoanDocumentService
    {
        public Task<List<LoanDocument>> GetByLoanId(int loanId);
        public Task<LoanDocument> PostLoanDocumentsTable(LoanDocument loanDocumentsTable);
        public Task<LoanDocument> PutLoanDocumentsTable(int id, LoanDocument loanDocumentsTable);

    }
}
