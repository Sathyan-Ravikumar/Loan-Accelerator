using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using LoanAccelerator.Models.DTO;

namespace LoanAccelerator.Controllers
{
    [Route("address/")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _address;
        private readonly ITokenService _token;
        

        #region parameterized constructor
        public AddressController(IAddressService address, ITokenService token)
        {
            _address = address;
            _token = token;
        }
        #endregion

        #region GET method for AddressInfromationTable
        // GET: api/AddressInformationTables


        [HttpGet("address-information")]
        public async Task<ActionResult<List<Address>>> GetAddressInformation()
        {
            try
            {
                var item = await _address.GetAddressInformation();
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);  
            }
        }
        #endregion

        #region GET by ID method for  AddressInfromationTable
        // GET: api/AddressInformationTables/5

        [HttpGet("address-by-id/{id}")]
        public async Task<ActionResult<Address>> GetAddressInformationTable(int id)
        {

            return await _address.GetAddressInformationTable(id);
            
        }
        #endregion

        #region Put method - Update Customer Address by ID
        [Authorize(Roles = "Customer")]
        // PUT: api/AddressInformationTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        [HttpPut("update-customer-address-by-id/{id}")]
        public async Task<ActionResult<Address>> PutAddressInformationTable(int id, Address addressInformationTable)
        {
            return await _address.PutAddressInformationTable(id, addressInformationTable);   
        }
        #endregion

        #region Post method - Add Customer Address
        // POST: api/AddressInformationTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Customer")]
        [HttpPost("add-customer-address")]
        public async Task<ActionResult<Address>> PostAddressInformationTable(Address addressInformationTable)
        {

            return await _address.PostAddressInformationTable(addressInformationTable);
            
        }
        #endregion

        #region  Delete method - Customer Address by ID
        // DELETE: api/AddressInformationTables/5
        [HttpDelete("{id}")]

        public async Task<ActionResult<Address>> DeleteAddressInformationTable(int id)
        {

            return await _address.DeleteAddressInformationTable(id);
            
        }
        #endregion

        #region  Get method - Address by Loan ID
        [HttpGet("address-by-loanId/{loanid}")]
        public async Task<Address> GetAddressByLoanId(int loanid)
        {
            var result = await _address.GetByLoanId(loanid);
            return result;
        }
        #endregion


    }
}
