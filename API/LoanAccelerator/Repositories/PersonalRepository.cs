using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class PersonalRepository : IRepository<Personal,int>
    {
        #region Property 
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public PersonalRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;

        }
        #endregion

        #region Create - Post method
        public async Task<Personal> Post(Personal personalInformation)
        {
            await _dbcontext!.Personals.AddAsync(personalInformation);
            await _dbcontext.SaveChangesAsync();
            return personalInformation;
        }
        #endregion

        #region Update - Put method
        public async Task<Personal> Put(int id, Personal personalInformationTable)
        {
            var obj = await _dbcontext!.Personals.FindAsync(id);
            obj.Fullname = personalInformationTable.Fullname !=null ? personalInformationTable.Fullname :obj.Fullname ;
            obj.Dob = personalInformationTable.Dob != null? personalInformationTable.Dob:obj.Dob ;
            obj.DistrictofBirth = personalInformationTable.DistrictofBirth != null ? personalInformationTable.DistrictofBirth:obj.DistrictofBirth;
            obj.CoutryOfBirth = personalInformationTable.CoutryOfBirth != null ? personalInformationTable.CoutryOfBirth:obj.CoutryOfBirth;
            obj.TaxId = personalInformationTable.TaxId != null ? personalInformationTable.TaxId : obj.TaxId;
            obj.EducationQualification = personalInformationTable.EducationQualification != null ? personalInformationTable.EducationQualification : obj.EducationQualification;
            obj.ResidentialStatus = personalInformationTable.ResidentialStatus != null ? personalInformationTable.ResidentialStatus : obj.ResidentialStatus;
            obj.ResidingFor = personalInformationTable.ResidingFor != null ? personalInformationTable.ResidingFor : obj.ResidingFor;
            obj.Gender = personalInformationTable.Gender != null ? personalInformationTable.Gender : obj.Gender;
            obj.IsExistingCustomer = personalInformationTable.IsExistingCustomer != null ? personalInformationTable.IsExistingCustomer : obj.IsExistingCustomer;
            obj.FathersName = personalInformationTable.FathersName != null ? personalInformationTable.FathersName : obj.FathersName;
            obj.MothersName = personalInformationTable.MothersName != null ? personalInformationTable.MothersName : obj.MothersName;
            obj.NationalId = personalInformationTable.NationalId != null ? personalInformationTable.NationalId : obj.NationalId;
            obj.DateOfIssurance = personalInformationTable.DateOfIssurance != null ? personalInformationTable.DateOfIssurance : obj.DateOfIssurance;
            obj.CountryOfIssurance = personalInformationTable.CountryOfIssurance != null ? personalInformationTable.CountryOfIssurance : obj.CountryOfIssurance;
            obj.Nationality = personalInformationTable.Nationality != null ? personalInformationTable.Nationality : obj.Nationality;
            obj.MaritalStatus = personalInformationTable.MaritalStatus != null ? personalInformationTable.MaritalStatus : obj.MaritalStatus;
            await _dbcontext.SaveChangesAsync();
            return obj;
        }
        #endregion

        #region Get All method

        public async Task<List<Personal>> GetAll()
        {
            return await _dbcontext!.Personals.ToListAsync();
        }
        #endregion

        #region Get by Id method

        public async Task<Personal> GetById(int id)
        {
            var personal = await _dbcontext.Personals.FindAsync(id);
            return personal;
        }
        #endregion

        #region Delete method
        public async Task<Personal> Delete(int id)
        {
            var personal = await _dbcontext!.Personals.FindAsync(id);
            _dbcontext.Personals.Remove(personal!);
            if (personal == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return personal;
        }
        #endregion

        #region Save changes
        public async Task SaveChangesAsync()
        {
            await _dbcontext!.SaveChangesAsync();
        }
        #endregion

        #region Get by Loan Id
        public async Task<Personal> GetByLoanId(int loanid)
        {
            var personal = await _dbcontext!.Personals.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return personal;
        }
        #endregion

    }
}
