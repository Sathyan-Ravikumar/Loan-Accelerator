using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface ILoanCategoryService
    {
        public Task<IEnumerable<LoanCategory>> GetLoancategory();
        public Task<LoanCategory> GetLoanCategoryById(int id);
        public Task<LoanCategory> PostLoanCategory(LoanCategory category);
        public Task<LoanCategory> PutLoanCategory(int id, LoanCategory category);
    }
}
