using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Address
{
    public int AddressInformationId { get; set; }

    public string? PresentAddress { get; set; }

    public string? PermanantAddress { get; set; }

    public string? District { get; set; }

    public string? Country { get; set; }

    public string? EmailId { get; set; }

    public long? Mobile1 { get; set; }

    public long? Mobile2 { get; set; }

    public long? TelephoneNo { get; set; }

    public int? LoanId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Loan? Loan { get; set; }
}
