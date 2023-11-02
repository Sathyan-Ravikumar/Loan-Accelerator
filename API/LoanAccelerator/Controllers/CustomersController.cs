using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoanAccelerator.Controllers
{
    
    [Route("customer")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerdetail;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomersController"/> class.
        /// </summary>
        /// <param name="customerdetail">The service providing customer details.</param>

        #region parameterized constructor
        public CustomersController(ICustomerService customerdetail)
        {
            _customerdetail = customerdetail;
        }
        #endregion


        /// <summary>
        /// Retrieves customer details associated with a specific loan.
        /// </summary>
        /// <param name="loanId">The ID of the loan.</param>
        /// <returns>A list of customer details related to the loan.</returns>
       #region GET method for manager to retrieve  Customer Details
        [Authorize(Roles = "Manager")]
        [HttpGet("CustomerDetails/{loanId}")]
        public async Task<ActionResult<List<CustomerDetailsModel>>> GetCustomerDetails(int loanId)
        {
           
                return await _customerdetail.GetCustomerDetails(loanId);
           
        }
        #endregion
    }
}
