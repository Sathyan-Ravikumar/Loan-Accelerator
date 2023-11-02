
using LoanAccelerator.Controllers;


using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LoanAcceleratorTesting
{
    public class EmergencyContactDetailsTests
    {
        [Fact]
        public async Task GetEmergencyContactDetails_ReturnsListOfEmergencyContactDetails()
        {
            // Arrange
            var mockService = new Mock<IEmergencyService>();
            var expectedEmergencyContacts = GetTestEmergencyContactDetails();
            mockService.Setup(service => service.GetEmergencyContactDetails())
                .ReturnsAsync(expectedEmergencyContacts);

            var controller = new EmergencyController(mockService.Object);

            // Act
            var result = await controller.GetEmergencyContactDetails();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsAssignableFrom<List<Emergency>>(okResult.Value);
            Assert.Equal(expectedEmergencyContacts.Count, model.Count);
        }

        [Fact]
        public async Task GetEmergencyContactDetail_ValidId_ReturnsEmergencyContactDetail()
        {
            // Arrange
            var id = 1; // Replace with the actual ID you want to test
            var mockService = new Mock<IEmergencyService>();
            var expectedEmergencyContact = GetTestEmergencyContactDetails().FirstOrDefault(e => e.EmergencyContactId == id);
            mockService.Setup(service => service.GetEmergencyContactDetail(id))
                .ReturnsAsync(expectedEmergencyContact);

            var controller = new EmergencyController(mockService.Object);

            // Act
            var result = await controller.GetEmergencyContactDetail(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsType<Emergency>(okResult.Value);
            Assert.Equal(expectedEmergencyContact, model);
        }

        private List<Emergency> GetTestEmergencyContactDetails()
        {
            return new List<Emergency>
            {
                new Emergency
                {
                    EmergencyContactId = 1,
                    Name = "John",
                    Relation = "Friend",
                    MobileNo = 1234567890,
                    Address = "123 Main St",
                    LoanId = 1
                },
                new Emergency
                {
                    EmergencyContactId = 2,
                    Name = "Jane",
                    Relation = "Family",
                    MobileNo = 9876543210,
                    Address = "456 Elm St",
                    LoanId = 2
                }
            };
        }

        [Fact]
        public async Task PostEmergencyContactDetail_ValidData_ReturnsOk()
        {
            // Arrange
            var emergencyContact = new Emergency
            {
                EmergencyContactId = 1,
                Name = "John",
                Relation = "Friend",
                MobileNo = 1234567890,
                Address = "123 Main St"
            };
            var mockService = new Mock<IEmergencyService>();
            mockService.Setup(service => service.PostEmergencyContactDetail(emergencyContact))
                .ReturnsAsync(emergencyContact);

            var controller = new EmergencyController(mockService.Object);

            // Act
            var result = await controller.PostEmergencyContactDetail(emergencyContact);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedEmergencyContact = Assert.IsType<Emergency>(okResult.Value);
            Assert.Equal(emergencyContact, returnedEmergencyContact);
        }

        [Fact]
        public async Task PutEmergencyContactDetail_ValidId_ReturnsOk()
        {
            // Arrange
            var id = 1;
            var updatedEmergencyContact = new Emergency
            {
                EmergencyContactId = id,
                Name = "Updated Name",
                Relation = "Updated Relation",
                MobileNo = 9876543210,
                Address = "Updated Address"
            };

            var mockService = new Mock<IEmergencyService>();
            mockService.Setup(service => service.PutEmergencyContactDetail(id, updatedEmergencyContact))
                .ReturnsAsync(updatedEmergencyContact);

            var controller = new EmergencyController(mockService.Object);

            // Act
            var result = await controller.PutEmergencyContactDetail(id, updatedEmergencyContact);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedEmergencyContact = Assert.IsType<Emergency>(okResult.Value);

            // Check if the updatedEmergencyContact is the same as the returned object
            Assert.Equal(updatedEmergencyContact, returnedEmergencyContact);
        }
    }
}
