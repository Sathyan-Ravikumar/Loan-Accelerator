using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class LoanCategory
{
    public int LoanCategoryId { get; set; }

    public string? LoanCategory1 { get; set; }

    public string? LoanCategoryKey { get; set; }

    public string? InUse { get; set; }

    public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();
}
