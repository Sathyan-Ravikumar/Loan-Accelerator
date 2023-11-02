using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class FamilyRepository : IRepository<Family, int>
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public FamilyRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        #endregion

        #region Create - Post method
        public async Task<Family> Post(Family family)
        {
            var obj = await _dbcontext!.Families.AddAsync(family);
            if (obj == null)
            {
                throw new Exception("Data Not Posted");
            }
            await _dbcontext.SaveChangesAsync();
            return family;
        }
        #endregion

        #region Get All Method
        public async Task<List<Family>> GetAll()
        {
            var obj = await _dbcontext!.Families.ToListAsync();
            if (obj == null)
            {
                throw new Exception("No data");
            }
            return obj;

        }
        #endregion

        #region Get by Id method
        public async Task<Family> GetById(int id)
        {
            var familyDetails = await _dbcontext!.Families.FindAsync(id);
            return familyDetails!;
        }
        #endregion

        #region Delete method
        public async Task<Family> Delete(int id)
        {
            var familyDetails = await _dbcontext!.Families.FindAsync(id);
            _dbcontext.Families.Remove(familyDetails!);
            if (familyDetails == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return familyDetails;
        }
        #endregion

        #region Update - Put method
        public async Task<Family> Put(int id, Family family)
        {
            var obj = await _dbcontext!.Families.FindAsync(id);
            obj.SpouseName = family.SpouseName != null ? family.SpouseName:family.SpouseName;
            obj.Profession = family.Profession!= null ? family.Profession:family.Profession;
            obj.NameOfOrganisation = family.NameOfOrganisation!= null ? family.NameOfOrganisation:family.NameOfOrganisation ;
            obj.MobileNo = family.MobileNo != null ? family.MobileNo : family.MobileNo;
            obj.OfficeContactNo = family.OfficeContactNo != null ? family.OfficeContactNo : family.OfficeContactNo;
            obj.EmailId = family.EmailId != null ? family.EmailId : family.EmailId;
            obj.JointAccount = family.JointAccount != null ? family.JointAccount : family.JointAccount  ;
            if (obj == null)
            {
                throw new Exception("Data Not Updated");
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

        #region Get by Loan Id method
        public async Task<Family> GetByLoanId(int loanid)
        {
            var family = await _dbcontext!.Families.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return family!;
        }
        #endregion

    }
}
