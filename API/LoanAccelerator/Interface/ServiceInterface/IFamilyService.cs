using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IFamilyService
    {
        public Task<List<Family>> GetFamilyDetails();
        public Task<Family> GetFamilyDetail(int id);
        public Task<Family> PutFamilyDetail(int id, Family familyDetail);
        public Task<Family> PostFamilyDetail(Family familyDetail);
        public Task<Family> DeleteFamilyDetail(int id);
        public Task<Family> GetByLoanId(int loanid);

    }
}
