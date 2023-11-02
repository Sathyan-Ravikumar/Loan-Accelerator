using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using LoanAccelerator.Models.DTO;

namespace LoanAccelerator.Services
{
    public class CustomerService : ICustomerService
    {
        #region fields
        private readonly IUserRepository _user;
        private readonly IRepository<Loan, int> _loan;
        private readonly IRepository<Employment, int> _employment;
        private readonly IRepository<Personal, int> _personal;
        private readonly IRepository<Address, int> _address;
        private readonly IRepository<Financial, int> _financial;
        #endregion

        #region parameterized constructor
        public CustomerService(IUserRepository user,
            IRepository<Personal, int> personal,
            IRepository<Loan, int> loan,
            IRepository<Address, int> address,
            IRepository<Financial, int> financial,
            IRepository<Employment, int> employment
        )

        {
            _financial = financial;
            _address = address;
            _employment = employment;
            _user = user;
            _personal = personal;
            _loan = loan;
        }
        #endregion

        #region method to retrieves customer details associated with a specific loan.
        /// <summary>
        /// Retrieves customer details associated with a specific loan.
        /// </summary>
        /// <param name="loanId">The ID of the loan.</param>
        /// <returns>A list of customer details related to the loan.</returns>
        public async Task<List<CustomerDetailsModel>> GetCustomerDetails(int loanId)

        {
            var Loans = await _loan.GetAll();
            var PersonalInformations = await _personal.GetAll();
            var Users = await _user.GetAll();
            var EmployementTables = await _employment.GetAll();
            var AddressInformationTables = await _address.GetAll();
            var FinancialInformationTables = await _financial.GetAll();


            var customerdetails = (from l in Loans
                                   join u in Users on l.UserId equals u.UserId
                                   join p in PersonalInformations on l.LoanId equals p.LoanId
                                   join e in EmployementTables on l.LoanId equals e.LoanId
                                   join f in FinancialInformationTables on l.LoanId equals f.LoanId
                                   where l.LoanId == loanId
                                   select new CustomerDetailsModel
                                   {
                                       Fullname = p.Fullname,
                                       CustomerId = u.CustomerId,
                                       Occupation = e.Designation,
                                       AnnualIncome = f.IncomeSalary + f.IncomeRent + f.OtherIncome,
                                       DOB = p.Dob,
                                       ApprovedLoanAmount = l.ApprovedAmount,
                                       RequestedLoanAmount = l.AppliedAmount,
                                       RequestedTenure = l.RequestedTenure,
                                       ApprovedTenure = l.ApprovedTenure,

                                   }).ToList();
            return customerdetails;
        }
        #endregion
    }

}