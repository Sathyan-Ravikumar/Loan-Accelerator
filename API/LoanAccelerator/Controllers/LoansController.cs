using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanAccelerator.Controllers
{

    [Route("loan/")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly ILoanService _iloan;
        private readonly ITokenService _token;
       

        #region parameterized constructor
        public LoansController(ILoanService iloan, ITokenService token)
        {
            _iloan = iloan;
            _token = token;
        }
        #endregion

        // GET: api/Loans
        #region Get method : customer loan
        [HttpGet("customer-loan")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoanTables()
        {
            var loans = await _iloan.GetLoanTables();
            return Ok(loans);
        }
        #endregion

        #region Get method :customer loan by Id
        [HttpGet("customer-loan-by-id/{id}")]
        public async Task<ActionResult<Loan>> GetLoanTable(int id)
        {
            var loans = await _iloan.GetLoanTable(id);
            return Ok(loans);
        }
        #endregion

        // PUT: api/Loans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        #region Put method : update customer loan - Id
        [HttpPut("update-customer-loan/{id}")]
        public async Task<IActionResult> PutLoanTable(int id, Loan loan)
        {
            var loans = await _iloan.PutLoanTable(id, loan);
            return Ok(loans);
        }
        #endregion

        #region Post method for customer : add customer loan 

        [Authorize(Roles = "Customer")]
        [HttpPost("add-customer-loan")]
        public async Task<ActionResult<Loan>> PostLoanTable(Loan loan)
        {
            var user = _token.GetUser(Request.Headers.Authorization!);
            var loans = await _iloan.PostLoanTable(user.UserId, loan);
            return Ok(loans);
        }
        #endregion

        #region Put method for manager : loan approval 
        [Authorize(Roles = "Manager")]
        [HttpPut("loan-approval/{id}")]
        public async Task<Loan> PutLoanApproval(int id, Loan loan)
        {
            var approval = await _iloan.PutLoanApproval(id, loan);
            return approval;
        }
        #endregion

        #region Put method for customer : Update stages
        [Authorize(Roles = "Customer")]
        [HttpPut("update-stages/{id}")]
        public async Task<Loan> PutSatge(int id, int stage)
        {
            var update = await _iloan.PutStage(id, stage);
            return update;
        }
        #endregion

        #region Get method : loan by loan Id

        [HttpGet("loan-by-loanId/{loanid}")]
        public async Task<Loan> GetAddressByLoanId(int loanid)
        {
            var result = await _iloan.GetByLoanId(loanid);
            return result;
        }
        #endregion
    }
}
