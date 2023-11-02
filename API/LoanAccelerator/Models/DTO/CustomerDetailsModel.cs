namespace LoanAccelerator.Models.DTO
{
    public class CustomerDetailsModel
    {
        public string? Occupation { get; set; }

        public decimal? AnnualIncome { get; set; }

        public DateTime? DOB { get; set; }

        public decimal? RequestedLoanAmount { get; set; }

        public decimal? ApprovedLoanAmount { get; set; }

        public int? RequestedTenure { get; set; }

        public int? ApprovedTenure { get; set; }

        public string? Fullname { get; set; }

        public int? CustomerId { get; set; }

    }
}
