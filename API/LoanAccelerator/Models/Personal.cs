using System;
using System.Collections.Generic;

namespace LoanAccelerator.Models;

public partial class Personal
{
    public int PersonalInformationId { get; set; }

    public string? Fullname { get; set; }

    public DateTime? Dob { get; set; }

    public string? DistrictofBirth { get; set; }

    public string? CoutryOfBirth { get; set; }

    public long? TaxId { get; set; }

    public string? EducationQualification { get; set; }

    public string? ResidentialStatus { get; set; }

    public int? ResidingFor { get; set; }

    public string? Gender { get; set; }

    public string? IsExistingCustomer { get; set; }

    public string? FathersName { get; set; }

    public string? MothersName { get; set; }

    public string? NationalId { get; set; }

    public DateTime? DateOfIssurance { get; set; }

    public string? CountryOfIssurance { get; set; }

    public string? Nationality { get; set; }

    public string? MaritalStatus { get; set; }

    public int? LoanId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Loan? Loan { get; set; }
}
