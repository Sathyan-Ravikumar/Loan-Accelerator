using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Role { get; set; }

    public string? EmailId { get; set; }

    public string? Password { get; set; }

    public string? IsActive { get; set; }

    public DateTime? RegisteredDate { get; set; }

    public int? EligibilityScore { get; set; }

    public string? FullName { get; set; }

    public int? CustomerId { get; set; }

    public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();
}
