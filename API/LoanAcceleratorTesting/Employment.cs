
using LoanAccelerator.Controllers;

using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LoanAcceleratorTesting
{
    public class EmployementTablesTests
    {
        [Fact]
        public async Task PostEmployementTable_ValidData_ReturnsOk()
        {
            // Arrange
            var employmentTable = new Employment
            {
                EmploymentId = 1,
                EmploymentType = "Full-Time",
                CompanyName = "ABC Corp",
                Designation = "Software Engineer",
                EmployeeStatus = "Active",
                Experience = 2,
                OfficeNo = 1234567890,
                EmailId = "john@example.com",
                OfficeAddress = "123 Main St"
            };
            var mockService = new Mock<IEmploymentService>();
            mockService.Setup(service => service.PostEmployementTable(employmentTable))
                .ReturnsAsync(employmentTable);

            var controller = new EmployementsController(mockService.Object);

            // Act
            var result = await controller.PostEmployementTable(employmentTable);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedEmploymentTable = Assert.IsType<Employment>(okResult.Value);
            Assert.Equal(employmentTable, returnedEmploymentTable);
        }
        [Fact]
        public async Task PutEmployementTable_ValidId_ReturnsUpdatedEmployementTable()
        {
            // Arrange
            var testId = 1; // Replace with the actual ID you want to test
            var updatedEmployement = new Employment
            {
                EmploymentId = testId,
                EmploymentType = "Contract",
                CompanyName = "New Company",
                Designation = "Senior Developer",
                EmployeeStatus = "Active",
                Experience = 5,
                OfficeNo = 9999999999,
                EmailId = "updated@example.com",
                OfficeAddress = "789 Maple Rd"
            };

            var mockService = new Mock<IEmploymentService>();
            mockService.Setup(service => service.PutEmployementTable(testId, updatedEmployement))
                .ReturnsAsync(updatedEmployement);

            var controller = new EmployementsController(mockService.Object);

            // Act
            var result = await controller.PutEmployementTable(testId, updatedEmployement);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsType<Employment>(okResult.Value);
            Assert.Equal(testId, model.EmploymentId);
            Assert.Equal(updatedEmployement.EmploymentType, model.EmploymentType);
            Assert.Equal(updatedEmployement.CompanyName, model.CompanyName);
            Assert.Equal(updatedEmployement.Designation, model.Designation);
            Assert.Equal(updatedEmployement.EmployeeStatus, model.EmployeeStatus);
            Assert.Equal(updatedEmployement.Experience, model.Experience);
            Assert.Equal(updatedEmployement.OfficeNo, model.OfficeNo);
            Assert.Equal(updatedEmployement.EmailId, model.EmailId);
            Assert.Equal(updatedEmployement.OfficeAddress, model.OfficeAddress);
        }
    }
}
