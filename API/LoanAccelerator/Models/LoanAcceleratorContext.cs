using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LoanAccelerator.Models;

public partial class LoanAcceleratorContext : DbContext
{
    public LoanAcceleratorContext()
    {
    }

    public LoanAcceleratorContext(DbContextOptions<LoanAcceleratorContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Document> Documents { get; set; }

    public virtual DbSet<Emergency> Emergencies { get; set; }

    public virtual DbSet<Employment> Employments { get; set; }

    public virtual DbSet<Family> Families { get; set; }

    public virtual DbSet<Financial> Financials { get; set; }

    public virtual DbSet<Loan> Loans { get; set; }

    public virtual DbSet<LoanCategory> LoanCategories { get; set; }

    public virtual DbSet<LoanDocument> LoanDocuments { get; set; }

    public virtual DbSet<LoanType> LoanTypes { get; set; }

    public virtual DbSet<Personal> Personals { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  /*#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
*/        => optionsBuilder.UseSqlServer("data source=.\\SQLEXPRESS;Database=LoanAccelerator1;integrated security=SSPI;TrustServerCertificate=True;");
 

 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.AddressInformationId).HasName("PK__AddressI__E0EBE5A49AD56A75");

            entity.ToTable("Address");

            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.District).HasMaxLength(50);
            entity.Property(e => e.EmailId).HasMaxLength(50);
            entity.Property(e => e.PermanantAddress).HasMaxLength(100);
            entity.Property(e => e.PresentAddress).HasMaxLength(100);

            entity.HasOne(d => d.Loan).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.LoanId)
                .HasConstraintName("FK_LoanId_AddressInformationTable");
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasKey(e => e.DocumentTypeId).HasName("PK__Document__DBA390E12A1A80DB");

            entity.ToTable("Document");
        });

        modelBuilder.Entity<Emergency>(entity =>
        {
            entity.HasKey(e => e.EmergencyContactId).HasName("PK__Emergenc__E8A61D8EC57151D6");

            entity.ToTable("Emergency");

            entity.Property(e => e.Address).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(59);
            entity.Property(e => e.Relation).HasMaxLength(25);

            entity.HasOne(d => d.Loan).WithMany(p => p.Emergencies)
                .HasForeignKey(d => d.LoanId)
                .HasConstraintName("FK_LoanId_EmergencyContactDetails");
        });

        modelBuilder.Entity<Employment>(entity =>
        {
            entity.HasKey(e => e.EmploymentId).HasName("PK__Employem__FDC872B68D890F41");

            entity.ToTable("Employment");

            entity.Property(e => e.CompanyName).HasMaxLength(50);
            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.Designation).HasMaxLength(30);
            entity.Property(e => e.EmailId).HasMaxLength(50);
            entity.Property(e => e.EmployeeStatus).HasMaxLength(30);
            entity.Property(e => e.EmploymentType).HasMaxLength(9);
            entity.Property(e => e.OfficeAddress).HasMaxLength(100);

            entity.HasOne(d => d.Loan).WithMany(p => p.Employments)
                .HasForeignKey(d => d.LoanId)
                .HasConstraintName("FK_LoanId_EmployementTable");
        });

        modelBuilder.Entity<Family>(entity =>
        {
            entity.HasKey(e => e.FamilyDetailsId).HasName("PK__FamilyDe__41067C25ED01F38E");

            entity.ToTable("Family");

            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EmailId).HasMaxLength(50);
            entity.Property(e => e.JointAccount).HasMaxLength(5);
            entity.Property(e => e.NameOfOrganisation).HasMaxLength(50);
            entity.Property(e => e.Profession).HasMaxLength(25);
            entity.Property(e => e.SpouseName).HasMaxLength(25);

            entity.HasOne(d => d.Loan).WithMany(p => p.Families)
                .HasForeignKey(d => d.LoanId)
                .HasConstraintName("FK_LoanId_FamilyDetails");
        });

        modelBuilder.Entity<Financial>(entity =>
        {
            entity.HasKey(e => e.FinancialInformationId).HasName("PK__Financia__713EF851253B3904");

            entity.ToTable("Financial");

            entity.Property(e => e.FinancialInformationId).HasColumnName("FinancialInformationID");
            entity.Property(e => e.Cfwob)
                .HasMaxLength(5)
                .HasColumnName("CFWOB");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.Dwob)
                .HasMaxLength(5)
                .HasColumnName("DWOB");
            entity.Property(e => e.Education).HasColumnType("money");
            entity.Property(e => e.FoodAndClothing).HasColumnType("money");
            entity.Property(e => e.IncomeRent).HasColumnType("money");
            entity.Property(e => e.IncomeSalary).HasColumnType("money");
            entity.Property(e => e.InterstRate).HasColumnType("money");
            entity.Property(e => e.LoanRepayment)
                .HasColumnType("money")
                .HasColumnName("LoanREpayment");
            entity.Property(e => e.OtherExpenses).HasColumnType("money");
            entity.Property(e => e.OtherIncome).HasColumnType("money");
            entity.Property(e => e.RentAndUtility).HasColumnType("money");

            entity.HasOne(d => d.Loan).WithMany(p => p.Financials)
                .HasForeignKey(d => d.LoanId)
                .HasConstraintName("FK_LoanId_FinancialInformationTable");
        });

        modelBuilder.Entity<Loan>(entity =>
        {
            entity.HasKey(e => e.LoanId).HasName("PK__Loan__4F5AD457258D602B");

            entity.ToTable("Loan", tb => tb.HasTrigger("tr_SetApplicationId"));

            entity.Property(e => e.AppliedAmount).HasColumnType("money");
            entity.Property(e => e.AppliedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ApprovedAmount).HasColumnType("money");
            entity.Property(e => e.ApprovedDate).HasColumnType("datetime");
            entity.Property(e => e.ExpenditureAmount).HasColumnType("money");
            entity.Property(e => e.Interest).HasColumnName("interest");
            entity.Property(e => e.Purpose).HasColumnName("purpose");

            entity.HasOne(d => d.LoanCategory).WithMany(p => p.Loans)
                .HasForeignKey(d => d.LoanCategoryId)
                .HasConstraintName("FK_LoanCategoryId");

            entity.HasOne(d => d.LoanType).WithMany(p => p.Loans)
                .HasForeignKey(d => d.LoanTypeId)
                .HasConstraintName("FK_LoanTypeId");

            entity.HasOne(d => d.Status).WithMany(p => p.Loans)
                .HasForeignKey(d => d.StatusId)
                .HasConstraintName("FK_StatusId");

            entity.HasOne(d => d.User).WithMany(p => p.Loans)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserId_Loan");
        });

        modelBuilder.Entity<LoanCategory>(entity =>
        {
            entity.HasKey(e => e.LoanCategoryId).HasName("PK__LoanCate__ACA1098D026639D1");

            entity.ToTable("LoanCategory");

            entity.Property(e => e.InUse).HasMaxLength(10);
            entity.Property(e => e.LoanCategory1).HasColumnName("LoanCategory");
            entity.Property(e => e.LoanCategoryKey).HasMaxLength(10);
        });

        modelBuilder.Entity<LoanDocument>(entity =>
        {
            entity.HasKey(e => e.DocumentId).HasName("PK__LoanDocu__EFAAAD854859BDED");

            entity.Property(e => e.DocumentId).HasColumnName("documentId");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.DocumentType).WithMany(p => p.LoanDocuments)
                .HasForeignKey(d => d.DocumentTypeId)
                .HasConstraintName("FK_LoanId_DocumentType");

            entity.HasOne(d => d.Loan).WithMany(p => p.LoanDocuments)
                .HasForeignKey(d => d.LoanId)
                .HasConstraintName("FK_LoanId_LoanDocuments");
        });

        modelBuilder.Entity<LoanType>(entity =>
        {
            entity.HasKey(e => e.LoanTypeId).HasName("PK__LoanType__19466BAF9240359C");

            entity.ToTable("LoanType");

            entity.Property(e => e.LoanType1).HasColumnName("LoanType");
        });

        modelBuilder.Entity<Personal>(entity =>
        {
            entity.HasKey(e => e.PersonalInformationId).HasName("PK__Personal__09730AF8D09AF5F3");

            entity.ToTable("Personal");

            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.DateOfIssurance).HasColumnType("date");
            entity.Property(e => e.Dob)
                .HasColumnType("date")
                .HasColumnName("DOB");
            entity.Property(e => e.FathersName).IsUnicode(false);

            entity.HasOne(d => d.Loan).WithMany(p => p.Personals)
                .HasForeignKey(d => d.LoanId)
                .HasConstraintName("FK_LoanId_PersonalInformation");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.StatusId).HasName("PK__Status__C8EE20632B267B04");

            entity.ToTable("Status");

            entity.Property(e => e.Status1).HasColumnName("Status");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CC4CA8D48DC2");

            entity.ToTable("User", tb => tb.HasTrigger("trg_GenerateRandomCustomerId"));

            entity.Property(e => e.EligibilityScore).HasDefaultValueSql("(round(rand()*(((800)-(500))+(1))+(500),(0)))");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.RegisteredDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
