using LoanAccelerator.Models.DTO;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface ICustomerService
    {
        public Task<List<CustomerDetailsModel>> GetCustomerDetails(int loanId);

    }
}
