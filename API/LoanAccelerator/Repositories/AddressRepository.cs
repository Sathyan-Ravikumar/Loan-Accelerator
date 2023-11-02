using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class AddressRepository : IRepository<Address,int>
    {
        #region Property
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public AddressRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;

        }
        #endregion

        #region Get Address Info By Id
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Address> GetById(int id)
        {
            var address = await _dbcontext!.Addresses.FindAsync(id);
            return address!;
        }
        #endregion

        #region Get All Address 
        public async Task<List<Address>> GetAll()
        {
            var address = await _dbcontext!.Addresses.ToListAsync();
            return address;
        }
        #endregion

        #region Creates a new address entry
        public async Task<Address> Post(Address addressInformation)
        {
            var obj = await _dbcontext!.Addresses.AddAsync(addressInformation);
            if (obj == null)
            {
                throw new Exception("Data Not Added");
            }
            await _dbcontext.SaveChangesAsync();
            return addressInformation;
        }
        #endregion


        #region Update address
        public async Task<Address> Put(int id, Address addressInformationTable)
        {
            var obj = await _dbcontext!.Addresses.FindAsync(id);

            obj.PresentAddress = addressInformationTable.PresentAddress != null ? addressInformationTable.PresentAddress : obj.PresentAddress;
            obj.PermanantAddress = addressInformationTable.PermanantAddress !=null ? addressInformationTable.PresentAddress:obj.PresentAddress;
            obj.District = addressInformationTable.District !=null ? addressInformationTable.PresentAddress:obj.PresentAddress;
            obj.Country = addressInformationTable.Country != null ? addressInformationTable.PresentAddress : obj.PresentAddress;
            obj.EmailId = addressInformationTable.EmailId != null ? addressInformationTable.PresentAddress : obj.PresentAddress;
            obj.Mobile1 = addressInformationTable.Mobile1 != null ? addressInformationTable.Mobile1 : obj.Mobile1;
            obj.Mobile2 = addressInformationTable.Mobile2 != null ? addressInformationTable.Mobile2 : obj.Mobile2;
            obj.TelephoneNo = addressInformationTable.TelephoneNo != null ? addressInformationTable.TelephoneNo : obj.TelephoneNo;
            if (obj == null)
            {
                throw new Exception("No Data Updated");
            }
            await _dbcontext.SaveChangesAsync();
            return obj;
        }
        #endregion


        #region Delete Address
        public async Task<Address> Delete(int id)
        {
            var address = await _dbcontext!.Addresses.FindAsync(id);
            _dbcontext.Addresses.Remove(address!);
            if (address == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return address;
        }
        #endregion

        #region Save Changes
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

        #region Get Address by Loan Id
        public async Task<Address> GetByLoanId(int loanid)
        {
            var address = await _dbcontext!.Addresses.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return address!;
        }
        #endregion

    }
}
