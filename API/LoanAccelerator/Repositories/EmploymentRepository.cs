using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class EmploymentRepository : IRepository<Employment, int>
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public EmploymentRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        #endregion

        #region Create - Post method
        public async Task<Employment> Post(Employment employee)
        {
            _dbcontext!.Employments.Add(employee);
            await _dbcontext.SaveChangesAsync();
            return employee;
        }
        #endregion

        #region Get All method
        public async Task<List<Employment>> GetAll()
        {
            var obj = await _dbcontext!.Employments.ToListAsync();
            if (obj == null)
            {
                throw new Exception("No data");
            }
            return obj;

        }
        #endregion

        #region Get by Id method
        public async Task<Employment> GetById(int id)
        {
            var employment = await _dbcontext!.Employments.FindAsync(id);
            return employment!;
        }
        #endregion

        #region Delete by Id method
        public async Task<Employment> Delete(int id)
        {
            var employment = await _dbcontext!.Employments.FindAsync(id);
            _dbcontext.Employments.Remove(employment!);
            if (employment == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return employment;
        }
        #endregion

        #region Update - Put method
        public async Task<Employment> Put(int id, Employment employementTable)
        {
            var employs = await _dbcontext!.Employments.FindAsync(id);
            employs!.EmploymentType = employementTable.EmploymentType != null ?employementTable.EmploymentType:employs.EmploymentType ; 
            employs.CompanyName = employementTable.CompanyName != null? employementTable.CompanyName:employs.CompanyName;
            employs.Designation = employementTable.Designation != null ? employementTable.Designation : employs.Designation;
            employs.EmployeeStatus = employementTable.EmployeeStatus != null ? employementTable.EmployeeStatus : employs.EmployeeStatus;
            employs.Experience = employementTable.Experience !=null? employementTable.Experience :employs.Experience;
            employs.OfficeNo = employementTable.OfficeNo != null ? employementTable.OfficeNo:employs.OfficeNo;
            employs.EmailId = employementTable.EmailId != null ? employementTable.EmailId : employs.EmailId;
            employs.OfficeAddress = employementTable.OfficeAddress != null ? employementTable.OfficeAddress : employs.OfficeAddress   ;
            await _dbcontext.SaveChangesAsync();
            return employs;
        }
        #endregion

        #region Save changes
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

        #region Get by Loan Id method
        public async Task<Employment> GetByLoanId(int loanid)
        {
            var employment = await _dbcontext!.Employments.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return employment!;
        }
        #endregion
    }
}
