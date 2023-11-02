using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using System.Net;


namespace LoanAccelerator.Controllers
{
    [Route("emergency/")]
    [ApiController]
    public class EmergencyController : ControllerBase
    {
        private readonly IEmergencyService _emergencydetails;

        # region parameterized constructor
        public EmergencyController(IEmergencyService emergencydetails)
        {
            _emergencydetails = emergencydetails;
        }
        #endregion
        /// <summary>
        /// Retrieves a list of emergency contact details.
        /// </summary>
        /// <returns>A list of emergency contact details.</returns>

        // GET: api/EmergencyContactDetails

        #region Get method to retrieve emergency contact details
        [HttpGet("customer-emergency-contact")]
        public async Task<ActionResult<List<Emergency>>> GetEmergencyContactDetails()
        {
            try
            {
                return Ok(await _emergencydetails.GetEmergencyContactDetails());
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }
        #endregion
        /// <summary>
        /// Retrieves an emergency contact detail by its ID.
        /// </summary>
        /// <param name="id">The ID of the emergency contact detail to retrieve.</param>
        /// <returns>An emergency contact detail if found, or NotFound if not found.</returns>

        // GET: api/EmergencyContactDetails/5

        #region Get by Id method to retrieve emergency contact detail
        [HttpGet("customer-emergency-contact/{id}")]
        public async Task<ActionResult<Emergency>> GetEmergencyContactDetail(int id)
        {
            try
            {
                return Ok(await _emergencydetails.GetEmergencyContactDetail(id));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }
        #endregion
        /// <summary>
        /// Updates an emergency contact detail by its ID.
        /// </summary>
        /// <param name="id">The ID of the emergency contact detail to update.</param>
        /// <param name="emergencyContactDetail">The updated emergency contact detail.</param>
        /// <returns>The updated emergency contact detail.</returns>


        #region Put method for customer to retrieve Emergency contact detail
        // PUT: api/EmergencyContactDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Customer")]
        [HttpPut("update-customer-emergency-contact/{id}")]
        public async Task<ActionResult<Emergency>> PutEmergencyContactDetail(int id, Emergency emergencyContactDetail)
        {
            try
            {
                return Ok(await _emergencydetails.PutEmergencyContactDetail(id, emergencyContactDetail));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }
        #endregion
        /// <summary>
        /// Creates a new emergency contact detail.
        /// </summary>
        /// <param name="emergencyContactDetail">The emergency contact detail to create.</param>
        /// <returns>The created emergency contact detail.</returns>

        // POST: api/EmergencyContactDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        #region Post method for customer to retriveve emergency contact detail
        [Authorize(Roles = "Customer")]
        [HttpPost("add-customer-emergency-contact")]
        public async Task<ActionResult<Emergency>> PostEmergencyContactDetail(Emergency emergencyContactDetail)
        {
            try
            {
                return Ok(await _emergencydetails.PostEmergencyContactDetail(emergencyContactDetail));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }
        #endregion
        /// <summary>
        /// Deletes an emergency contact detail by its ID.
        /// </summary>
        /// <param name="id">The ID of the emergency contact detail to delete.</param>
        /// <returns>The deleted emergency contact detail.</returns>

        // DELETE: api/EmergencyContactDetails/5
        #region Delete method for emergency
        [HttpDelete("{id}")]
        public async Task<ActionResult<Emergency>> DeleteEmergencyContactDetail(int id)
        {
            try
            {
                return Ok(await _emergencydetails.DeleteEmergencyContactDetail(id));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }
        #endregion

        #region Get methods to retrieve emergency contact by loan Id
        [HttpGet("emergency-contact-by-loanId/{loanid}")]
        public async Task<Emergency> GetAddressByLoanId(int loanid)
        {
            var result = await _emergencydetails.GetByLoanId(loanid);
    
            return result;
        }
        #endregion


    }
}
