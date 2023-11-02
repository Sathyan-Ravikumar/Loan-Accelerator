using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    /// <summary>
    /// Service class responsible for managing personal information.
    /// </summary>
    public class PersonalService : IPersonalService
    {
        #region fields
        private readonly IRepository<Personal, int> _repo;
        #endregion

        #region parameterized constructor
        public PersonalService(IRepository<Personal, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region method to retrieves a list of personal information entries.
        /// <summary>
        /// Retrieves a list of personal information entries.
        /// </summary>
        /// <returns>A list of personal information entries.</returns>
        public async Task<List<Personal>> GetPersonalInformationTables()
        {
            var personalResult = await _repo.GetAll();
            return personalResult;
        }
        #endregion

        #region method to retrieves a personal information entry by its ID.
        /// <summary>
        /// Retrieves a personal information entry by its ID.
        /// </summary>
        /// <param name="id">The ID of the personal information entry to retrieve.</param>
        /// <returns>The personal information entry if found, otherwise null.</returns>
        public async Task<Personal> GetPersonalInformationTable(int id)
        {
            var personalResult = await _repo.GetById(id);
            return personalResult;
        }
        #endregion

        #region method to updates an existing personal information entry.
        /// <summary>
        /// Updates an existing personal information entry.
        /// </summary>
        /// <param name="id">The ID of the personal information entry to update.</param>
        /// <param name="personalInformationTable">The updated personal information entry.</param>
        /// <returns>The updated personal information entry.</returns>
        public async Task<Personal> PutPersonalInformationTable(int id, Personal personalInformationTable)
        {
            var personalResult = await _repo.Put(id, personalInformationTable);
            return personalResult;
        }
        #endregion

        #region method to creates a new personal information entry.


        /// <summary>
        /// Creates a new personal information entry.
        /// </summary>
        /// <param name="personalInformationTable">The personal information entry to create.</param>
        /// <returns>The created personal information entry.</returns>
        public async Task<Personal> PostPersonalInformationTable(Personal personalInformationTable)
        {
            var personalResult = await _repo.Post(personalInformationTable);
            return personalResult;
        }
        #endregion

        #region method to delete a personal information entry
        /// <summary>
        /// Deletes a personal information entry.
        /// </summary>
        /// <param name="id">The ID of the personal information entry to delete.</param>
        /// <returns>The deleted personal information entry.</returns>
        public async Task<Personal> DeletePersonalInformationTable(int id)
        {
            var personalResult = await _repo!.Delete(id);
            return personalResult;
        }
        #endregion


        #region
        public async Task<Personal> GetByLoanId(int loanid)
        {
            var result = await _repo.GetByLoanId(loanid);
            return result;
        }

        #endregion
    }
}
