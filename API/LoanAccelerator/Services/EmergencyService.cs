using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    
    public class EmergencyService : IEmergencyService
    {
        #region fields
        private readonly IRepository<Emergency, int> _repo;
        #endregion

        #region parameterized constructor
        public EmergencyService(IRepository<Emergency, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region method to retrieve a list of emergency contact detail
        /// <summary>
        /// Retrieves a list of emergency contact details.
        /// </summary>
        /// <returns>A list of emergency contact details.</returns>
        public async Task<List<Emergency>> GetEmergencyContactDetails()
        {
            var emergency = await _repo.GetAll();
            return emergency;
        }
        #endregion

        #region method to retrieves an emergency contact detail by its ID.
        /// <summary>
        /// Retrieves an emergency contact detail by its ID.
        /// </summary>
        /// <param name="id">The ID of the emergency contact detail to retrieve.</param>
        /// <returns>An emergency contact detail if found, otherwise null.</returns>
        public async Task<Emergency> GetEmergencyContactDetail(int id)
        {
            var emergency = await _repo.GetById(id);
            return emergency;
        }
        #endregion

        #region method to Updates an existing emergency contact detail.
        /// <summary>
        /// Updates an existing emergency contact detail.
        /// </summary>
        /// <param name="id">The ID of the emergency contact detail to update.</param>
        /// <param name="emergencyContactDetail">The updated emergency contact detail.</param>
        /// <returns>The updated emergency contact detail.</returns>
        public async Task<Emergency> PutEmergencyContactDetail(int id, Emergency emergencyContactDetail)
        {
            var emergency = await _repo.Put(id, emergencyContactDetail);
            return emergency;
        }
        #endregion

        #region method to creates a new emergency contact detail.
        /// <summary>
        /// Creates a new emergency contact detail.
        /// </summary>
        /// <param name="emergencyContactDetail">The emergency contact detail to create.</param>
        /// <returns>The created emergency contact detail.</returns>
        public async Task<Emergency> PostEmergencyContactDetail(Emergency emergencyContactDetail)
        {
            var emergency = await _repo.Post(emergencyContactDetail);
            return emergency;
        }
        #endregion

        #region method to deletes an emergency contact detail by its ID.
        /// <summary>
        /// Deletes an emergency contact detail by its ID.
        /// </summary>
        /// <param name="id">The ID of the emergency contact detail to delete.</param>
        /// <returns>The deleted emergency contact detail.</returns>
        public async Task<Emergency> DeleteEmergencyContactDetail(int id)
        {
            var emergency = await _repo.Delete(id);
            return emergency;
        }
        #endregion

        public async Task<Emergency> GetByLoanId(int loanid)
        {
            var result = await _repo.GetByLoanId(loanid);
            return result;
        }
    }
}
