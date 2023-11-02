using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Financial
{
    public int FinancialInformationId { get; set; }

    public decimal? IncomeSalary { get; set; }

    public decimal? IncomeRent { get; set; }

    public decimal? OtherIncome { get; set; }

    public decimal? RentAndUtility { get; set; }

    public decimal? FoodAndClothing { get; set; }

    public decimal? Education { get; set; }

    public decimal? LoanRepayment { get; set; }

    public decimal? OtherExpenses { get; set; }

    public string? Cfwob { get; set; }

    public decimal? InterstRate { get; set; }

    public int? CarCount { get; set; }

    public string? Dwob { get; set; }

    public int? LoanId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Loan? Loan { get; set; }
}
