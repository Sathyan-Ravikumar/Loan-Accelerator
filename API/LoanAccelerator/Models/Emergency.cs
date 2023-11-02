using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Emergency
{
    public int EmergencyContactId { get; set; }

    public string? Name { get; set; }

    public string? Relation { get; set; }

    public long? MobileNo { get; set; }

    public string? Address { get; set; }

    public int? LoanId { get; set; }

    public virtual Loan? Loan { get; set; }
}
