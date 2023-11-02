using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class LoanDocumentRepository : IRepository<LoanDocument,int>
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public LoanDocumentRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        #endregion

        #region Create - Post method
        public async Task<LoanDocument> Post(LoanDocument document)
        {
            await _dbcontext!.LoanDocuments.AddAsync(document);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.LoanDocuments.FirstOrDefaultAsync(x => x.DocumentId == document.DocumentId);

        }
        #endregion

        #region Get All method
        public async Task<List<LoanDocument>> GetAll()
        {
            var obj = await _dbcontext!.LoanDocuments.ToListAsync();
            if (obj == null)
            {
                throw new Exception("No data");
            }
            return obj;

        }
        #endregion

        #region Get by Id method
        public async Task<LoanDocument> GetById(int id)
        {
            var loanDocument = await _dbcontext!.LoanDocuments.FindAsync(id);
            return loanDocument!;
        }
        #endregion

        #region Delete method
        public async Task<LoanDocument> Delete(int id)
        {
            var loanDocument = await _dbcontext!.LoanDocuments.FindAsync(id);
            _dbcontext.LoanDocuments.Remove(loanDocument!);
            if (loanDocument == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return loanDocument;
        }
        #endregion

        #region Update - Put method
        public async Task<LoanDocument> Put(int id, LoanDocument loanDocumentsTable)
        {
            var obj = await _dbcontext!.LoanDocuments.FirstOrDefaultAsync(x => x.DocumentId == id);
            if (obj == null)
            {
                throw new Exception("No data");
            }
            obj.DocumentLink = loanDocumentsTable.DocumentLink;
            await _dbcontext.SaveChangesAsync();
            return obj;
        }
        #endregion

        #region Save change

        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

        #region Get by LoanId method
        public async Task<LoanDocument> GetByLoanId(int loanid)
        {
            var loandocument = await _dbcontext!.LoanDocuments.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return loandocument;
        }
        #endregion
    }
}

