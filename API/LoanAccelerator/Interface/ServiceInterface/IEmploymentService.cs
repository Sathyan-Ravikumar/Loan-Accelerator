using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IEmploymentService
    {
        public Task<List<Employment>> GetEmployementTables();


        public Task<Employment> PostEmployementTable(Employment employementTable);


        public Task<Employment> PutEmployementTable(int id, Employment employementTable);

        public Task<Employment> GetByLoanId(int loanid);

    }
}
