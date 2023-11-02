using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Repo
{

    public class EmergencyRepository : IRepository<Emergency, int>
    {
        #region Property
        private readonly LoanAcceleratorContext? _dbcontext;
        #endregion

        #region Constructor
        public EmergencyRepository(LoanAcceleratorContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        #endregion

        #region Create - Post method
        public async Task<Emergency> Post(Emergency emergency)
        {
            var obj = await _dbcontext!.Emergencies.AddAsync(emergency);
            if (obj == null)
            {
                throw new Exception("Data Not Added");
            }
            await _dbcontext.SaveChangesAsync();
            return emergency;
        }
        #endregion

        #region GetAll Method
        public async Task<List<Emergency>> GetAll()
        {
            var obj = await _dbcontext!.Emergencies.ToListAsync();
            if (obj == null)
            {
                throw new Exception("No data");
            }
            return obj;

        }
        #endregion

        #region Get by Id method
        public async Task<Emergency> GetById(int id)
        {
            var emergencyContactDetails = await _dbcontext!.Emergencies.FindAsync(id);
            return emergencyContactDetails!;
        }
        #endregion

        #region Delete method
        public async Task<Emergency> Delete(int id)
        {
            var emergencyContactDetails = await _dbcontext!.Emergencies.FindAsync(id);
            _dbcontext.Emergencies.Remove(emergencyContactDetails!);
            if (emergencyContactDetails == null)
            {
                throw new Exception("No Data has been deleted");
            }
            await _dbcontext.SaveChangesAsync();
            return emergencyContactDetails;
        }
        #endregion

        #region Update - Put method
        public async Task<Emergency> Put(int id, Emergency detail)
        {
            var obj = await _dbcontext!.Emergencies.FindAsync(id);
            obj!.Name = detail.Name  != null ? detail.Name:obj.Name;
            obj.Relation = detail.Relation != null ? detail.Relation:obj.Relation;
            obj.MobileNo = detail.MobileNo != null ? detail.MobileNo : obj.MobileNo;
            obj.Address = detail.Address != null ? detail.Address : obj.Address ;
            if (obj == null)
            {
                throw new ArithmeticException("No Data Found or Updated");
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


        #region Get By LoanId method
        public async Task<Emergency> GetByLoanId(int loanid)
        {
            var emergency = await _dbcontext!.Emergencies.FirstOrDefaultAsync(a => a.LoanId == loanid);
            return emergency!;
        }
        #endregion

    }
}
