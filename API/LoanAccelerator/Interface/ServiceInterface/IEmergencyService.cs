using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IEmergencyService
    {
        public Task<List<Emergency>> GetEmergencyContactDetails();
        public Task<Emergency> GetEmergencyContactDetail(int id);
        public Task<Emergency> PutEmergencyContactDetail(int id, Emergency emergencyContactDetail);
        public Task<Emergency> PostEmergencyContactDetail(Emergency emergencyContactDetail);
        public Task<Emergency> DeleteEmergencyContactDetail(int id);
        public Task<Emergency> GetByLoanId(int loanid);

    }
}
