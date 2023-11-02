using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.RepositoryInterfaces;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using LoanAccelerator.Models.DTO;

namespace LoanAccelerator.Services
{
    public class AppliedLoansAndAppliedStatusService : IAppliedLoansAndApplicationStatusService
    {
        
        #region fields
        private readonly IUserRepository _user;
        private readonly IRepository<Loan, int> _loan;
        private readonly IMasterRepository<Status, int> _status;
        private readonly IRepository<Personal, int> _personal;
        private readonly IMasterRepository<LoanCategory, int> _loancategory;
        #endregion


        #region parameterized constructor
        public AppliedLoansAndAppliedStatusService(IUserRepository user,
             IMasterRepository<Status, int> status, 
             IRepository<Personal, int> personal,
             IMasterRepository<LoanCategory, int> loancategory,
             IRepository<Loan,int> loan)
        {
            _user = user;
            _status = status;
            _personal = personal;
            _loancategory = loancategory;
            _loan = loan;
        }
        #endregion

        #region service method to retrieves the eligibility score for a given user.
        /// <summary>
        /// Retrieves the eligibility score for a given user.
        /// </summary>
        /// <param name="userid">The ID of the user.</param>
        /// <returns>The eligibility score of the user.</returns>

        public async Task<int?> GetEligibilityScore(int userid)
        {
            var Users = await _user.GetAll();
            var eScore = (from u in Users
                          where u.UserId == userid
                          select u.EligibilityScore).FirstOrDefault();

            return eScore;
        }
        #endregion


        #region Service method to retrieves a list of application statuses of the given user
        /// <summary>
        /// Retrieves a list of application statuses and applied loans for a given user.
        /// </summary>
        /// <param name="userid">The ID of the user.</param>
        /// <returns>A list of application statuses and applied loans.</returns>
        public async Task<List<ApplicationStatusAndAppliedLoansModel>> GetApplicationStatus(int userid)

        {
            
            var LoanCategories = await _loancategory.GetAll();
            var Loans = await _loan.GetAll();
            var Statuses = await _status.GetAll();
            var applicationStatus = (
                from lc in LoanCategories
                join l in Loans on lc.LoanCategoryId equals l.LoanCategoryId
                join s in Statuses on l.StatusId equals s.StatusId
                where l.UserId == userid
                select new ApplicationStatusAndAppliedLoansModel
                {
                    LoanCategory = lc.LoanCategory1,
                    ApplicationId = l.ApplicationId,
                    AppliedAmount = l.AppliedAmount,
                    ApprovedAmount = l.ApprovedAmount,
                    AppliedDate = l.AppliedDate,
                    ApprovedDate = l.ApprovedDate,
                    RequestedTenure = l.RequestedTenure,
                    ApprovedTenure = l.ApprovedTenure,
                    Interest = l.Interest,
                    Status = s.Status1,
                    Stage = l.Stage,
                    LoanId= l.LoanId,
                }
            ).ToList();

            

              return applicationStatus;
        }
        #endregion


        #region method to retrieves a list of applied loans along with associated details.
        /// <summary>
        /// Retrieves a list of applied loans along with associated details.
        /// </summary>
        /// <returns>A list of applied loans and their details.</returns>
        public async Task<List<ApplicationStatusAndAppliedLoansModel>> GetAppliedLoans()

        {
            var LoanCategories = await _loancategory.GetAll();
            var Loans = await _loan.GetAll();
            var Statuses = await _status.GetAll();
            var Users = await _user.GetAll();
            var PersonalInformations = await _personal.GetAll();


            var appliedLoans =   (from lc in LoanCategories
                                      join l in Loans on lc.LoanCategoryId equals l.LoanCategoryId
                                      join s in Statuses on l.StatusId equals s.StatusId
                                      join u in Users on l.UserId equals u.UserId
                                      join p in PersonalInformations on l.LoanId equals p.LoanId
                                      select new ApplicationStatusAndAppliedLoansModel
                                      {
                                          LoanId = l.LoanId,
                                          CustomerId = u.CustomerId,
                                          Fullname = p.Fullname,
                                          LoanCategory = lc.LoanCategory1,
                                          ApplicationId = l.ApplicationId,
                                          AppliedAmount = l.AppliedAmount,
                                          ApprovedAmount = l.ApprovedAmount,
                                          AppliedDate = l.AppliedDate,
                                          ApprovedDate = l.ApprovedDate,
                                          RequestedTenure = l.RequestedTenure,
                                          ApprovedTenure = l.ApprovedTenure,
                                          Interest = l.Interest,
                                          Status = s.Status1,

                                }).ToList();
            if (appliedLoans == null || appliedLoans.Count == 0)
            {
                throw new Exception("No Data Found");
            }
            return appliedLoans;
        }
        #endregion
    }
}
