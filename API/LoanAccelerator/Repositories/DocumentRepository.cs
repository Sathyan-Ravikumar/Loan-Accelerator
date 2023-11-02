using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.RepositoryInterfaces;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class DocumentRepository : IMasterRepository<Document, int>
    {
        #region Property
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public DocumentRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        #endregion

        #region Create - Post method
        public async Task<Document> Post(Document type)
        {
            var obj = await _dbcontext!.Documents.AddAsync(type);
            if (obj == null)
            {
                throw new Exception("Data Not Added");
            }
            await _dbcontext.SaveChangesAsync();
            return type;
        }
        #endregion

        #region Get All Documents
        public async Task<List<Document>> GetAll()
        {
            var obj = await _dbcontext!.Documents.ToListAsync();
            if (obj == null)
            {
                throw new Exception("No data");
            }
            return obj;

        }
        #endregion


        #region Get document by Id

        public async Task<Document> GetById(int id)
        {
            var documentType = await _dbcontext!.Documents.FindAsync(id);
            return documentType!;
        }
        #endregion

        #region Delete Document By Id
        public async Task<Document> Delete(int id)
        {
            var documentType = await _dbcontext!.Documents.FindAsync(id);
            _dbcontext.Documents.Remove(documentType!);
            if (documentType == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return documentType;
        }
        #endregion

        #region Update - Put method
        public async Task<Document> Put(int id, Document detail)
        {
            var obj = await _dbcontext!.Documents.FindAsync(id);
            obj!.DocumentType = detail.DocumentType;
            if (obj == null)
            {
                throw new Exception("No Data Found or Updated");
            }
            await _dbcontext.SaveChangesAsync();
            return obj;
        }
        #endregion


        #region Save changes
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

    }
}
