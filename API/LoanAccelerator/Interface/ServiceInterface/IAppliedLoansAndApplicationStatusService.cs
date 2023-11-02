using LoanAccelerator.Models.DTO;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IAppliedLoansAndApplicationStatusService
    {
        public Task<int?> GetEligibilityScore(int userid);

        public Task<List<ApplicationStatusAndAppliedLoansModel>> GetApplicationStatus(int userid);
        public Task<List<ApplicationStatusAndAppliedLoansModel>> GetAppliedLoans();


    }
}
