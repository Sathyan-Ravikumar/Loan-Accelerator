using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;

namespace LoanAccelerator.Controllers
{
   
    [Route("documents")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _document;

        #region parameterized constructor
        public DocumentsController(IDocumentService document)
        {
            _document = document;
        }
        #endregion


        /// <summary>
        /// Creates a new document type.
        /// </summary>
        /// <param name="documentType">The document type to create.</param>
        /// <returns>The created document type.</returns>

        #region Post method to retrieve Document Types

        [HttpPost("add-document-type")]
        public async Task<Document> PostDocumentsType(Document documentType)
        {
            var result = await _document.PostDocumentsType(documentType);
            return result;
        }
        #endregion

    }
}
