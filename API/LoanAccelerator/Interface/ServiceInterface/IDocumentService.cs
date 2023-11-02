using LoanAccelerator.Models;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface IDocumentService
    {
        public Task<Document> PostDocumentsType(Document documentType);
    }
}
