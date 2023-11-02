using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IAddressService
    {

        public Task<Address> PostAddressInformationTable(Address addressInformationTable);
        public Task<List<Address>> GetAddressInformation();
        public Task<Address> PutAddressInformationTable(int id, Address addressInformationTable);
        public Task<Address> GetAddressInformationTable(int id);
        public Task<Address> DeleteAddressInformationTable(int id);
        public Task<Address> GetByLoanId(int loanid);


    }
}
