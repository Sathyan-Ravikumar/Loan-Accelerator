using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IPersonalService
    {
        public Task<List<Personal>> GetPersonalInformationTables();
        public Task<Personal> GetPersonalInformationTable(int id);
        public Task<Personal> PutPersonalInformationTable(int id, Personal personalInformationTable);
        public Task<Personal> PostPersonalInformationTable(Personal personalInformationTable);
        public Task<Personal> DeletePersonalInformationTable(int id);
        public Task<Personal> GetByLoanId(int loanid);

    }
}
