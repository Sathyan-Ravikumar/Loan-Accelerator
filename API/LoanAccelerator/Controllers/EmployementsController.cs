using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanAccelerator.Controllers
{
    [Route("employment/")]
    [ApiController]
    public class EmployementsController : ControllerBase
    {
        private readonly IEmploymentService _iemployment;

        #region parameterized constructor
        public EmployementsController(IEmploymentService iemployment)
        {
            _iemployment = iemployment;
        }
        #endregion


        // GET: api/EmployementTables
        #region Get method to retrive customer employment details

        [HttpGet("customer-employment-details")]
        public async Task<ActionResult<IEnumerable<Employment>>> GetEmployementTables()
        {
            if (_iemployment.GetEmployementTables == null)
            {
                return NotFound();
            }
            var employment = await _iemployment.GetEmployementTables();
            return Ok(employment);
        }
        #endregion



        // PUT: api/EmployementTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        #region Put method for customer to retrieve update customer employment detail
        [Authorize(Roles = "Customer")]

        [HttpPut("update-customer-employment-details/{id}")]


        public async Task<IActionResult> PutEmployementTable(int id, Employment employementTable)
        {
            var loans = await _iemployment.PutEmployementTable(id, employementTable);
            return Ok(loans);

        }
        #endregion

        // POST: api/EmployementTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        #region Post method for customer : Add Customer Employment Details
        [Authorize(Roles = "Customer")]

        [HttpPost("add-customer-employment-details")]
        public async Task<ActionResult<Employment>> PostEmployementTable(Employment employementTable)
        {
            if (_iemployment.PostEmployementTable == null)
            {
                return Problem("Entity set 'DbforLoanAccContext.EmployementTables'  is null.");
            }
            var employment = await _iemployment.PostEmployementTable(employementTable);
            return Ok(employment);
        }
        #endregion
        [HttpGet("employment-details-by-loanId/{loanid}")]
        public async Task<Employment> GetAddressByLoanId(int loanid)
        {
            var result = await _iemployment.GetByLoanId(loanid);
            return result;
        }

    }
}