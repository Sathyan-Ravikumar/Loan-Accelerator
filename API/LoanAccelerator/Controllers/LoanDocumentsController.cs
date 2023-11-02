using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace LoanAccelerator.Controllers
{
    [Route("loanDocuments/")]
    [ApiController]
    public class LoanDocumentsController : ControllerBase
    {
        private readonly ILoanDocumentService _document;

        #region parameterized constructor
        public LoanDocumentsController(ILoanDocumentService document)
        {
            _document = document;
        }
        #endregion

        #region Get method : loan documents by Id 
        [HttpGet("loan-documents-by-id/{loanId}")]
        public async Task<List<LoanDocument>> GetLoanDocumentsTable(int loanId)
        {

            var result = await _document.GetByLoanId(loanId);
            return result;  
        }
        #endregion


        #region Put method :update documents by Id
        [HttpPut("update-loan-documents/{id}")]
        public async Task<LoanDocument> PutLoanDocumentsTable(int id, LoanDocument loanDocumentsTable)
        {
            var result = await _document.PutLoanDocumentsTable(id, loanDocumentsTable);
            return result;
        }
        #endregion

        // POST: api/LoanDocumentsTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        #region Post method for customer : add loan documents
        [Authorize(Roles = "Customer")]
        [HttpPost("add-loan-documents")]
        public async Task<LoanDocument> PostLoanDocumentsTable(LoanDocument loanDocumentsTable)
        {
            var result = await _document.PostLoanDocumentsTable(loanDocumentsTable);
            return result;
        }
        #endregion


    }
}
