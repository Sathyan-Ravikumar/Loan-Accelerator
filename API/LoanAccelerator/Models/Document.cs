using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Document
{
    public int DocumentTypeId { get; set; }

    public string? DocumentType { get; set; }

    public virtual ICollection<LoanDocument> LoanDocuments { get; set; } = new List<LoanDocument>();
}
