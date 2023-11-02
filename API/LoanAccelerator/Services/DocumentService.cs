using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.RepositoryInterfaces;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    public class DocumentService : IDocumentService
    {
        #region fields
        private readonly IMasterRepository<Document, int> _repo;
        #endregion

        #region parameterized constructor
        public DocumentService(IMasterRepository<Document, int> repo)
        {
            _repo = repo;
        }
        #endregion

        #region method to create document type  
        public async Task<Document> PostDocumentsType(Document documentType)
        {
            var type = await _repo.Post(documentType);
            return type;
        }
        #endregion


    }
}
