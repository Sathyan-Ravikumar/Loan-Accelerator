using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    /// <summary>
    /// Service class responsible for managing address information.
    /// </summary>
    public class AddressService : IAddressService
    {
        #region fields
        private readonly IRepository<Address, int> _repo;
        #endregion
        #region parameterized constructor
        /// <summary>
        /// Initializes a new instance of the <see cref="AddressService"/> class.
        /// </summary>
        /// <param name="repo">The repository providing address information functionality.</param>
        public AddressService(IRepository<Address, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region servivce method to creates a new address information entry.
        /// <summary>
        /// Creates a new address information entry.
        /// </summary>
        /// <param name="addressInformationTable">The address information to create.</param>
        /// <returns>The created address information.</returns>
        public Task<Address> PostAddressInformationTable(Address addressInformationTable)
        {
            var result = _repo.Post(addressInformationTable);
            return result;
        }
        #endregion

        #region service method to retrieves a list of address information entries.
        /// <summary>
        /// Retrieves a list of address information entries.
        /// </summary>
        /// <returns>A list of address information entries.</returns>
        public Task<List<Address>> GetAddressInformation()
        {
            return _repo.GetAll();
        }
        #endregion

        #region service method to updates an existing address information entry.

        /// <summary>
        /// Updates an existing address information entry.
        /// </summary>
        /// <param name="id">The ID of the address information entry to update.</param>
        /// <param name="addressInformationTable">The updated address information.</param>
        /// <returns>The updated address information.</returns>
        public async Task<Address> PutAddressInformationTable(int id, Address addressInformationTable)
        {
            var result = await _repo.Put(id, addressInformationTable);
            return result;
        }
        #endregion

        #region service method to retrieves an address information entry by its ID.
        /// <summary>
        /// Retrieves an address information entry by its ID.
        /// </summary>
        /// <param name="id">The ID of the address information entry to retrieve.</param>
        /// <returns>The address information entry if found, otherwise null.</returns>
        public async Task<Address> GetAddressInformationTable(int id)
        {
            var result = await _repo.GetById(id);
            return result;
        }
        #endregion

        #region service method to deletes an address information entry by its ID.

        /// <summary>
        /// Deletes an address information entry by its ID.
        /// </summary>
        /// <param name="id">The ID of the address information entry to delete.</param>
        /// <returns>The deleted address information entry.</returns>
        public async Task<Address> DeleteAddressInformationTable(int id)
        {
            var result = await _repo.Delete(id);
            return result;
        }
        #endregion 

        public async Task<Address> GetByLoanId(int loanid)
        {
            var result = await _repo.GetByLoanId(loanid);
            return result;
        }
    }

}