using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Family
{
    public int FamilyDetailsId { get; set; }

    public string? SpouseName { get; set; }

    public string? Profession { get; set; }

    public string? NameOfOrganisation { get; set; }

    public long? MobileNo { get; set; }

    public long? OfficeContactNo { get; set; }

    public string? EmailId { get; set; }

    public string? JointAccount { get; set; }

    public int? LoanId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Loan? Loan { get; set; }
}
