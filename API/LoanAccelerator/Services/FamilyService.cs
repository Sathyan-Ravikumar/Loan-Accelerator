using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{

    /// <summary>
    /// Service class responsible for managing family details.
    /// </summary>
    public class FamilyService : IFamilyService
    {
        #region fields
        private readonly IRepository<Family, int> _repo;
        #endregion

        #region parameterized constructor
        public FamilyService(IRepository<Family, int> repo)

        {
            _repo = repo;
        }
        #endregion

        #region method to Retrieves a list of family details.
        /// <summary>
        /// Retrieves a list of family details.
        /// </summary>
        /// <returns>A list of family details.</returns>
        public async Task<List<Family>> GetFamilyDetails()
        {
            var family = await _repo.GetAll();
            return family;
        }
        #endregion


        #region method to Retrieves a family detail by its ID.
        /// <summary>
        /// Retrieves a family detail by its ID.
        /// </summary>
        /// <param name="id">The ID of the family detail to retrieve.</param>
        /// <returns>The family detail if found, otherwise null.</returns>
        public async Task<Family> GetFamilyDetail(int id)
        {
            var family = await _repo.GetById(id);
            return family;
        }
        #endregion

        #region method to Update an existing family detail.
        /// <summary>
        /// Updates an existing family detail.
        /// </summary>
        /// <param name="id">The ID of the family detail to update.</param>
        /// <param name="familyDetail">The updated family detail.</param>
        /// <returns>The updated family detail.</returns>
        public async Task<Family> PutFamilyDetail(int id, Family familyDetail)
        {
            var family = await _repo.Put(id, familyDetail);
            return family;
        }
        #endregion

        #region method to add a new family detail.
        /// <summary>
        /// Creates a new family detail.
        /// </summary>
        /// <param name="familyDetail">The family detail to create.</param>
        /// <returns>The created family detail.</returns>
        public async Task<Family> PostFamilyDetail(Family familyDetail)
        {
            var family = await _repo.Post(familyDetail);
            return family;
        }
        #endregion

        #region method to deletes a family detail by its ID.

        /// <summary>
        /// Deletes a family detail by its ID.
        /// </summary>
        /// <param name="id">The ID of the family detail to delete.</param>
        /// <returns>The deleted family detail.</returns>
        public async Task<Family> DeleteFamilyDetail(int id)
        {
            var family = await _repo.Delete(id);
            return family;
        }
        #endregion

        public async Task<Family> GetByLoanId(int loanid)
        {
            var result = await _repo.GetByLoanId(loanid);
            return result;
        }
    }
}
