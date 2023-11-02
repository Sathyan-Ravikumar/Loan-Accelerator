using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanAccelerator.Controllers
{
    [Route("loans/")]
    [ApiController]
    public class AppliedLoansAndApplicationStatusController : ControllerBase
    {
        #region private fields
        private readonly IAppliedLoansAndApplicationStatusService _loan;
        private readonly ITokenService _token;
        #endregion

        #region parameterized constructor
        public AppliedLoansAndApplicationStatusController(IAppliedLoansAndApplicationStatusService loan, ITokenService token)
        {
            _loan = loan;
            _token = token;
        }
        #endregion

        #region Get method for customer to retrieve Eligibility Score
       /* [Authorize(Roles = "Customer")]*/
        [HttpGet("EligibilityScore")]
        public async Task<ActionResult<int?>> GetEligibilityScore()
        {
            var user = _token.GetUser(Request.Headers.Authorization!);
            return await _loan.GetEligibilityScore(user.UserId);
        }
        #endregion

        #region Get method for Customer to retrive Application Status
        [Authorize(Roles = "Customer")]
        [HttpGet("ApplicationStatus")]
        public async Task<ActionResult<List<ApplicationStatusAndAppliedLoansModel>>> GetApplicationStatus()
        {
            var user = _token.GetUser(Request.Headers.Authorization!);
            return await _loan.GetApplicationStatus(user.UserId); 
        }
        #endregion


        #region Get method for manager to retrive Application Status
        [Authorize(Roles = "Manager")]
        [HttpGet("AppliedLoans")]
        public async Task<ActionResult<List<ApplicationStatusAndAppliedLoansModel>>> GetAppliedLoans()
        {
                return await _loan.GetAppliedLoans(); 
        }
        #endregion
    }
}
