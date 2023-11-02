using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanAccelerator.Controllers
{
    [Route("financial/")]
    [ApiController]
    public class FinancialsController : ControllerBase
    {
        private readonly IFinancialService _ifinancialinformation;

        #region parameterized constructor
        public FinancialsController(IFinancialService ifinancialinformation)
        {
            _ifinancialinformation = ifinancialinformation;
        }
        #endregion

        // GET: api/FinancialInformationTables

        #region Get method : customer financial information
        [HttpGet("customer-financial-information")]
        public async Task<ActionResult<IEnumerable<Financial>>> GetFinancialInformationTables()
        {
            if (_ifinancialinformation.GetFinancialInformationTables == null)
            {
                return NotFound();
            }
            var financial = await _ifinancialinformation.GetFinancialInformationTables();
            return Ok(financial);
        }
        #endregion

        // GET: api/FinancialInformationTables/5


        // PUT: api/FinancialInformationTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        #region Put method for customer 
        [Authorize(Roles = "Customer")]
        [HttpPut("update-customer-financial-information/{id}")]
        public async Task<IActionResult> PutFinancialInformationTable(int id, Financial financialInformationTable)
        {

            var financials = await _ifinancialinformation.PutFinancialInformationTable(id, financialInformationTable);
            return Ok(financials);
        }
        #endregion

        // POST: api/FinancialInformationTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        #region Post method for customer : customer financial information
        [Authorize(Roles = "Customer")]

         [HttpPost("add-customer-financial-information")]
        public async Task<ActionResult<Financial>> PostFinancialInformationTable(Financial financialInformationTable)
        {

            if (_ifinancialinformation.PostFinancialInformationTable == null)
            {
                return Problem("Entity set 'DbforLoanAccContext.FinancialInformationTables'  is null.");
            }

            var financial = await _ifinancialinformation.PostFinancialInformationTable(financialInformationTable);
            return Ok(financial);

        }
        #endregion

        #region Get method : financial information by loan Id
        [HttpGet("financial-information-by-loanId/{loanid}")]
        public async Task<Financial> GetAddressByLoanId(int loanid)
        {
            var result = await _ifinancialinformation.GetByLoanId(loanid);
            return result;
        }
        #endregion
    }
}