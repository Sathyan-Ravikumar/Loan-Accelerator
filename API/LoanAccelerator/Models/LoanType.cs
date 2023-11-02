using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class LoanType
{
    public int LoanTypeId { get; set; }

    public string? LoanType1 { get; set; }

    public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();
}
