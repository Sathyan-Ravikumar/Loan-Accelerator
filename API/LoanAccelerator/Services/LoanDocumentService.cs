using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Services
{
    /// <summary>
    /// Service class responsible for managing loan documents.
    /// </summary>
    public class LoanDocumentService : ILoanDocumentService
    {
        #region fields
        private readonly IRepository<LoanDocument, int> _repo;
        #endregion

        #region Constructor
        public LoanDocumentService(IRepository<LoanDocument, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region service method to get a list of loans with a loan ID
        /// <summary>
        /// Retrieves a list of loan documents associated with a loan ID.
        /// </summary>
        /// <param name="loanId">The ID of the loan.</param>
        /// <returns>A list of loan documents.</returns>
        public async Task<List<LoanDocument>> GetByLoanId(int loanId)
        {
 
            var getAll=await _repo.GetAll();
            var obj =  getAll.Where(x => x.LoanId == loanId).ToList();
            if (obj.Count == null)
            {
                throw new Exception("No data");
            }
            return obj;
        }
        #endregion

        #region method to add new loanDocuments
        /// <summary>
        /// Creates a new loan document entry.
        /// </summary>
        /// <param name="loanDocumentsTable">The loan document to create.</param>
        /// <returns>The created loan document.</returns>
        public async Task<LoanDocument> PostLoanDocumentsTable(LoanDocument loanDocumentsTable)
        {
            var document = await _repo.Post(loanDocumentsTable);
             return document;
        }
        #endregion

        #region method to update loan document

        /// <summary>
        /// Updates an existing loan document entry.
        /// </summary>
        /// <param name="id">The ID of the loan document to update.</param>
        /// <param name="loanDocumentsTable">The updated loan document.</param>
        /// <returns>The updated loan document.</returns>
        public async Task<LoanDocument> PutLoanDocumentsTable(int id, LoanDocument loanDocumentsTable)
        {
            var document = await _repo.Put(id, loanDocumentsTable);
            return document;
        }
        #endregion

        
    }
}




