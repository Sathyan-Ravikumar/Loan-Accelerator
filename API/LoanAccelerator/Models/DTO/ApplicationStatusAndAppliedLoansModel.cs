namespace LoanAccelerator.Models.DTO
{
    public class ApplicationStatusAndAppliedLoansModel
    {
        public string? LoanCategory { get; set; }
        public string? LoanCategoryKey { get; set; }
        public string? Status { get; set; }
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
        public string? Fullname { get; set; }
        public int? CustomerId { get; set; }
        public int? EligibilityScore { get; set; }
        public int? Stage { get; set; }

    }
}
