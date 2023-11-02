using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Status
{
    public int StatusId { get; set; }

    public string? Status1 { get; set; }

    public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();
}
