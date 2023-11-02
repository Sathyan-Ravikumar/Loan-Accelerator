using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Employment
{
    public int EmploymentId { get; set; }

    public string? EmploymentType { get; set; }

    public string? CompanyName { get; set; }

    public string? Designation { get; set; }

    public string? EmployeeStatus { get; set; }

    public int? Experience { get; set; }

    public long? OfficeNo { get; set; }

    public string? EmailId { get; set; }

    public string? OfficeAddress { get; set; }

    public int? LoanId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Loan? Loan { get; set; }
}
