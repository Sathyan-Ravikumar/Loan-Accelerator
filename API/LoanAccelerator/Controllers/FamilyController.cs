using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
   
namespace LoanAccelerator.Controllers
{
    [Route("family/")]
    [ApiController]
    public class FamilyController : ControllerBase
    {
        private readonly IFamilyService _familydetails;

        public FamilyController(IFamilyService familydetails)
        {
            _familydetails = familydetails;
        }

        // GET: api/FamilyDetails

        [HttpGet("customer-family-details")]
        public async Task<ActionResult<List<Family>>> GetFamilyDetails()
        {

            return await _familydetails.GetFamilyDetails();
            
        }

        // GET: api/FamilyDetails/5

        [HttpGet("customer-family-details/{id}")]
        public async Task<ActionResult<Family>> GetFamilyDetail(int id)
        {
            return await _familydetails.GetFamilyDetail(id);
        }

        // PUT: api/FamilyDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Customer")]
         [HttpPut("update-customer-family-details/{id}")]
        public async Task<ActionResult<Family>> PutFamilyDetail(int id, Family familyDetail)
        {

            return await _familydetails.PutFamilyDetail(id, familyDetail);
        }

        // POST: api/FamilyDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Customer")]
        [HttpPost("add-customer-family-details")]
        public async Task<ActionResult<Family>> PostFamilyDetail(Family familyDetail)
        {
            return await _familydetails.PostFamilyDetail(familyDetail);
        }

        // DELETE: api/FamilyDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Family>> DeleteFamilyDetail(int id)
        {
            return await _familydetails.DeleteFamilyDetail(id);
        }
        [HttpGet("Family-details-by-loanId/{loanid}")]
        public async Task<Family> GetAddressByLoanId(int loanid)
        {
            var result = await _familydetails.GetByLoanId(loanid);
            return result;
        }

    }
}
