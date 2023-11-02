using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Authorization;


namespace LoanAccelerator.Controllers
{
    [Route("personal/")]
    [ApiController]
    public class PersonalsController : ControllerBase
    {
        private readonly IPersonalService _personal;

        #region parameterized constructor
        public PersonalsController(IPersonalService personal)
        {
            _personal = personal;
        }

        #endregion

        // GET: api/PersonalInformationTables
        #region Get method : personal information
        [HttpGet("personal-information")]
        public async Task<ActionResult<List<Personal>>> GetPersonalInformationTables()
        {

            return await _personal.GetPersonalInformationTables();

        }
        #endregion

        // GET: api/PersonalInformationTables/5
        #region Get method : customer personal information by Id
        [HttpGet("customer-personal-information/{id}")]
        public async Task<ActionResult<Personal>> GetPersonalInformationTable(int id)
        {

            return await _personal.GetPersonalInformationTable(id);


        }
        #endregion

        // PUT: api/PersonalInformationTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        #region Put method for customer : update customer personal information by Id
        [Authorize(Roles = "Customer")]

        [HttpPut("update-customer-personal-information/{id}")]

        public async Task<ActionResult<Personal>> PutPersonalInformationTable(int id, Personal personalInformationTable)
        {
            return await _personal.PutPersonalInformationTable(id, personalInformationTable);
        }
        #endregion

        // POST: api/PersonalInformationTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        #region Post method for customer : add customer personal information
        [Authorize(Roles = "Customer")]
        [HttpPost("add-customer-personal-information")]
        public async Task<ActionResult<Personal>> PostPersonalInformationTable(Personal personalInformationTable)
        {
            return await _personal.PostPersonalInformationTable(personalInformationTable);
        }
        #endregion

        // DELETE: api/PersonalInformationTables/5
        #region Delete method by Id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Personal>> DeletePersonalInformationTable(int id)
        {

            return await _personal.DeletePersonalInformationTable(id);

        }
        #endregion

        #region Get method by Id : personal details by loan Id 
        [HttpGet("personal-details-by-loanId/{loanid}")]
        public async Task<Personal> GetAddressByLoanId(int loanid)
        {
            var result = await _personal.GetByLoanId(loanid);
            return result;
        }
        #endregion
    }
}