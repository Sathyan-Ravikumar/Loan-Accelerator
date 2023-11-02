using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace LoanAccelerator.Controllers
{
    [Route("categories/")]
    [ApiController]
    public class LoanCategoryController : ControllerBase
    {
        private readonly ILoanCategoryService _loancategory;


        #region parameterized constructor
        public LoanCategoryController(ILoanCategoryService loancategory)
        {
            _loancategory = loancategory;
        }
        #endregion

        #region Get method for customer : loan category
        [Authorize(Roles = "Customer")]
        [HttpGet("loan-category")]
        public async Task<ActionResult<IEnumerable<LoanCategory>>> GetLoancategory()
        {
            try
            {
                return Ok(await _loancategory.GetLoancategory());
            }
            catch (SqlException ex)
            {
                return NotFound(ex.Message);
            }
        }
        #endregion


        #region Get method :loan category by Id
        [HttpGet("loan-category-by-id/{id}")]
        public async Task<ActionResult<LoanCategory>> GetLoanCategoryById(int id)
        {    
                return await _loancategory.GetLoanCategoryById(id);
            
        }
        #endregion

        #region Post method : add loan category
        [HttpPost("add-loan-category")]
        public async Task<ActionResult<LoanCategory>> PostLoanCategory(LoanCategory category)
        {
            return await _loancategory.PostLoanCategory(category);
        }
        #endregion

        #region Put method : update loan category by Id
        [HttpPut("update-loan-category/{id}")]
        public async Task<ActionResult<LoanCategory>> PutLoanCategory(int id, LoanCategory category)
        {
            return await _loancategory.PutLoanCategory(id, category);
        }
        #endregion

    }
}
