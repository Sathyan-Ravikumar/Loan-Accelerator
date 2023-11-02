Create Database DBLoanAccelerator

use DBLoanAccelerator

--CUSTOMERTABLE
CREATE TABLE CUSTOMERTABLE 
( CustomerId int PRIMARY KEY IDENTITY(1,1) , Name nvarchar(50) , EmailId nvarchar(50) , "Password" nvarchar(20) )

-- table CUSTOMERTABLE
--LOAN TABLE
CREATE TABLE LoanTABLE 
(
LoanId int IDENTITY(1,1) PRIMARY KEY , CustomerId int , Amount Money , Tenure nvarchar(10) , Date date , Status int ,
LoanCategory int ,ExpectedExpenditure Money,PurposeOfLoan nvarchar(50), LoanType int,
FOREIGN KEY (CustomerId) References CUSTOMERTABLE(CustomerId)
);

--LoanDocumentsTable
CREATE TABLE LoanDocumentsTable
( LoanDocuments int IDENTITY(1,1) PRIMARY KEY,LoanId int  , PassportSizePhoto nvarchar(100) , SignaturePhoto nvarchar(100) , IdProof nvarchar(100) 
FOREIGN KEY (LoanId) References LoanTABLE(LoanId));

--Loan User Personal Information  table
CREATE TABLE PersonalInformationTable (PersonalInformationId int identity(1,1) PRIMARY KEY,
Fullname nvarchar(50) ,DOB date ,DistrictofBirth nvarchar(50) , CoutryOfBirth nvarchar(50) ,
TaxId int ,EducationQualification nvarchar(50), ResidentialStatus nvarchar(50), 
ResidingFor int, Gender nvarchar(11), IsExistingCustomer nvarchar(5), FathersName varchar(50) , 
MothersName nvarchar(50), NationalId nvarchar(50) , DateOfInsurance date , 
CountryOfInsurance nvarchar(50) , Nationality nvarchar(50) , 
MaritalStatus nvarchar(9) , LoanId int ,
FOREIGN KEY (LoanId) References LoanTABLE(LoanId));

--Address Information Table
CREATE TABLE AddressInformationTable 
(
AddressInformationId int identity(1,1) PRIMARY KEY,
PresentAddress nvarchar(100) , PermanantAddress nvarchar(100) ,District nvarchar(50) ,
Country nvarchar(50), EmailId nvarchar(50) , Mobile1 bigint not null , 
Mobile2 bigint , TelephoneNo bigint,
LoanId int ,
FOREIGN KEY (LoanId) References LoanTABLE(LoanId)
);

--Family Details
CREATE TABLE FamilyDetails
(
FamilyDetailsId int identity(1,1) primary key, SpouseName nvarchar(25), Profession nvarchar(25) ,
NameOfOrganisation nvarchar(50) , MobileNo bigint, OfficeContactNo bigint, 
EmailId nvarchar(50),JointAccount nvarchar(5),LoanId int ,
FOREIGN KEY (LoanId) References LoanTABLE(LoanId)
);

--Emergency Contact Details
CREATE TABLE EmergencyContactDetails
(
EmergencyContactId int identity(1,1) primary key,
Name nvarchar(59) ,Relation nvarchar(25), MobileNo bigint , Address nvarchar(100) ,LoanId int ,
FOREIGN KEY (LoanID) References LoanTABLE(LoanId)
);

--Employement Details
CREATE TABLE EmployementTable
(
EmploymentId int identity(1,1) primary key, EmploymentType nvarchar(9) , CompanyName nvarchar(50) , Designation nvarchar(30) ,
EmployeeStatus nvarchar(30) , Experience int  , OfficeNo bigint , EmailId nvarchar(50) , 
OfficeAddress nvarchar(100) ,LoanId int ,
FOREIGN KEY (LoanID) References LoanTABLE(LoanId)
);

--Finance Table
--(CFWOB credit facility with other bank)
--(DWOB Directorship other bank)
CREATE TABLE FinancialInformationTable 
(
FinancialInformationID int identity(1,1) primary key , IncomeSalary Money, IncomeRent Money, OtherIncome Money, 
RentAndUtility Money, FoodAndClothing Money, Education Money, LoanREpayment Money, OtherExpenses Money, CFWOB nvarchar(5),
InterstRate Money , CarCount int , DWOB nvarchar(5),LoanId int ,
FOREIGN KEY (LoanID) References LoanTABLE(LoanId)
);




--Loan Category Table 
--exp 1=>personal loan , 2=> car loan
CREATE TABLE LoanCategoryTable(
CategoryId int Primary key identity(1,1), LoanCategory int);

--Loan Type table
CREATE TABLE LoanTypeTable (TypeId int primary key identity(1,1), LoanType int);