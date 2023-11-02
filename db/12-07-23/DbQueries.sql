create database LoanAccelerator

use LoanAccelerator

--Role
Create table Role (RoleId int identity(1,1) primary key , Role nvarchar(max));

--User 
Create table "User" (UserId int identity(1,1) primary key , RoleId int , EmailId nvarchar(max),
Password varbinary(max) , isActive nvarchar(max), RegisteredDate  datetime default getdate() 
constraint FK_Role_User foreign key (RoleId)
References Role(RoleId));

--LoanCategory
Create table LoanCategory (LoanCategoryId int identity(1,1) primary key , LoanCategory nvarchar(max));

--LoanType
CREATE TABLE LoanType (LoanTypeId int primary key identity(1,1), LoanType nvarchar(max));

--Status 
Create table Status (StatusId int identity(1,1) Primary key , Status nvarchar(max));

--Loan
Create table Loan (LoanId  int identity(1,1) Primary Key, UserId int , LoanCategoryId int,
LoanTypeId int , AppliedAmount money,ApprovedAmount money , RequestedTenure int,
ApprovedTenure int,AppliedDate datetime default getdate(),ApprovedDate  datetime,
purpose nvarchar(max) , interest int , ApplicationId nvarchar(max) , StatusId int , Stage int, isActive nvarchar(max),
Constraint FK_UserId_Loan Foreign Key(UserId)
References "User"(UserId),
Constraint FK_LoanCategoryId Foreign Key(LoanCategoryId)
References LoanCategory(LoanCategoryId),
Constraint FK_LoanTypeId Foreign Key(LoanTypeId)
References LoanType(LoanTypeId),
Constraint FK_StatusId Foreign Key(StatusId)
References Status(StatusId)
);

--DocumentType
Create table DocumentType (DocumentTypeId int identity(1,1) primary key , DocumentType nvarchar(max));


--DocumentTable
Create table LoanDocuments ( documentId int identity(1,1) primary key, LoanId int , DocumentLink varbinary(max), Date datetime default getdate()
Constraint FK_LoanId_LoanDocuments Foreign Key(LoanId)
References Loan(LoanId),
Constraint FK_LoanId_DocumentType Foreign Key(documentId)
References DocumentType(DocumentTypeId)
);

drop table DocumentType
drop table LoanDocuments


--PersonalInformation
CREATE TABLE PersonalInformation (PersonalInformationId int identity(1,1) PRIMARY KEY,
Fullname nvarchar(max) ,DOB date ,DistrictofBirth nvarchar(max) , CoutryOfBirth nvarchar(max) ,
TaxId int ,EducationQualification nvarchar(max), ResidentialStatus nvarchar(max), 
ResidingFor int, Gender nvarchar(max), IsExistingCustomer nvarchar(max), FathersName varchar(max) , 
MothersName nvarchar(max), NationalId nvarchar(max) , DateOfIssurance date , 
CountryOfIssurance nvarchar(max) , Nationality nvarchar(max) , 
MaritalStatus nvarchar(max) , LoanId int,  date datetime default getdate()
Constraint FK_LoanId_PersonalInformation Foreign Key(LoanId)
References Loan(LoanId));

--Address Information Table
CREATE TABLE AddressInformationTable 
(
AddressInformationId int identity(1,1) PRIMARY KEY,
PresentAddress nvarchar(100) , PermanantAddress nvarchar(100) ,District nvarchar(50) ,
Country nvarchar(50), EmailId nvarchar(50) , Mobile1 bigint , 
Mobile2 bigint , TelephoneNo bigint,
LoanId int ,date datetime default getdate(),
Constraint FK_LoanId_AddressInformationTable Foreign Key(LoanId)
References Loan(LoanId)
);

--Family Details
CREATE TABLE FamilyDetails
(
FamilyDetailsId int identity(1,1) primary key, SpouseName nvarchar(25), Profession nvarchar(25) ,
NameOfOrganisation nvarchar(50) , MobileNo bigint, OfficeContactNo bigint, 
EmailId nvarchar(50),JointAccount nvarchar(5),LoanId int , Date datetime default getdate()
Constraint FK_LoanId_FamilyDetails Foreign Key(LoanId)
References Loan(LoanId)
);

--Emergency Contact Details
CREATE TABLE EmergencyContactDetails
(
EmergencyContactId int identity(1,1) primary key,
Name nvarchar(59) ,Relation nvarchar(25), MobileNo bigint , Address nvarchar(100) ,LoanId int ,
Constraint FK_LoanId_EmergencyContactDetails Foreign Key(LoanId)
References Loan(LoanId)
);

--Employement Details
CREATE TABLE EmployementTable
(
EmploymentId int identity(1,1) primary key, EmploymentType nvarchar(9) , CompanyName nvarchar(50) , Designation nvarchar(30) ,
EmployeeStatus nvarchar(30) , Experience int  , OfficeNo bigint , EmailId nvarchar(50) , 
OfficeAddress nvarchar(100) ,LoanId int ,date datetime default getdate(),
Constraint FK_LoanId_EmployementTable Foreign Key(LoanId)
References Loan(LoanId)
);

--Finance Table
--(CFWOB credit facility with other bank)
--(DWOB Directorship other bank)
CREATE TABLE FinancialInformationTable 
(
FinancialInformationID int identity(1,1) primary key , IncomeSalary Money, IncomeRent Money, OtherIncome Money, 
RentAndUtility Money, FoodAndClothing Money, Education Money, LoanREpayment Money, OtherExpenses Money, CFWOB nvarchar(5),
InterstRate Money , CarCount int , DWOB nvarchar(5),LoanId int , date datetime default getdate(),
Constraint FK_LoanId_FinancialInformationTable  Foreign Key(LoanId)
References Loan(LoanId)
);

