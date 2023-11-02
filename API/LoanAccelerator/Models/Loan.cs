using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Loan
{
    public int LoanId { get; set; }

    public int? UserId { get; set; }

    public int? LoanCategoryId { get; set; }

    public int? LoanTypeId { get; set; }

    public decimal? AppliedAmount { get; set; }

    public decimal? ApprovedAmount { get; set; }

    public int? RequestedTenure { get; set; }

    public int? ApprovedTenure { get; set; }

    public DateTime? AppliedDate { get; set; }

    public DateTime? ApprovedDate { get; set; }

    public string? Purpose { get; set; }

    public int? Interest { get; set; }

    public string? ApplicationId { get; set; }

    public int? StatusId { get; set; }

    public decimal? ExpenditureAmount { get; set; }

    public int? Stage { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<Emergency> Emergencies { get; set; } = new List<Emergency>();

    public virtual ICollection<Employment> Employments { get; set; } = new List<Employment>();

    public virtual ICollection<Family> Families { get; set; } = new List<Family>();

    public virtual ICollection<Financial> Financials { get; set; } = new List<Financial>();

    public virtual LoanCategory? LoanCategory { get; set; }

    public virtual ICollection<LoanDocument> LoanDocuments { get; set; } = new List<LoanDocument>();

    public virtual LoanType? LoanType { get; set; }

    public virtual ICollection<Personal> Personals { get; set; } = new List<Personal>();

    public virtual Status? Status { get; set; }

    public virtual User? User { get; set; }
}
