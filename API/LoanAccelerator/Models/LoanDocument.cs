using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class LoanDocument
{
    public int DocumentId { get; set; }

    public int? LoanId { get; set; }

    public int? DocumentTypeId { get; set; }

    public string? DocumentLink { get; set; }

    public DateTime? Date { get; set; }

    public virtual Document? DocumentType { get; set; }

    public virtual Loan? Loan { get; set; }
}
