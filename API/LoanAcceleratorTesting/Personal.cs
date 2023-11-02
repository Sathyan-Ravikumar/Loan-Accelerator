
//using LoanAccelerator.Controllers;
//using LoanAccelerator.Interface.ServiceInterface;
//using LoanAccelerator.Models;


//using Microsoft.AspNetCore.Mvc;
//using Moq;
//using Xunit;

//namespace LoanAccelerator.Tests
//{
//    public class PersonalInformationTests
//    {
        //[Fact]
        //public async Task PutPersonalInformationTable_ReturnsOkResultWithUpdatedPersonalInformation()
        //{
        //    // Arrange
        //    var mockService = new Mock<IPersonalService>();
        //    int personalInfoId = 1;
        //    var updatedPersonalInformation = new Personal
        //    {
        //        PersonalInformationId = personalInfoId,
        //        Fullname = "Updated Name",
        //        Gender = "Female",
        //        IsExistingCustomer = "No"
        //    };
        //    mockService.Setup(repo => repo.PutPersonalInformationTable(personalInfoId, It.IsAny<Personal>()))
        //               .ReturnsAsync(updatedPersonalInformation);

        //    var controller = new PersonalsController(mockService.Object);

        //    // Act
        //    var result = await controller.PutPersonalInformationTable(personalInfoId, updatedPersonalInformation);

        //    // Assert
        //    var actionResult = Assert.IsType<ActionResult<List<Personal>>>(result); // Change this line
        //    var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        //    var returnedPersonalInformation = Assert.IsType<Personal>(okResult.Value);
        //    Assert.Equal(updatedPersonalInformation, returnedPersonalInformation);
        //}
        //[Theory]
        //[InlineData("John Doe", "Male", "Yes")] // Test case 1
        //[InlineData("Jane Smith", "Female", "No")] // Test case 2
        //public async Task PostPersonalInformationTable_ReturnsActionResultWithPersonalInformation(string fullName, string gender, string isExistingCustomer)
        //{
        //    // Arrange
        //    var mockService = new Mock<IPersonalService>();
        //    var personalInformation = new Personal
        //    {
        //        Fullname = fullName,
        //        Gender = gender,
        //        IsExistingCustomer = isExistingCustomer,
        //    };
        //    mockService.Setup(repo => repo.PostPersonalInformationTable(It.IsAny<Personal>()))
        //               .ReturnsAsync(personalInformation);

        //    var controller = new PersonalsController(mockService.Object);

        //    // Act
        //    var result = await controller.PostPersonalInformationTable(personalInformation);

        //    // Assert
        //    var actionResult = Assert.IsType<ActionResult<Personal>>(result);
        //    var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        //    var returnedPersonalInformation = Assert.IsType<Personal>(okResult.Value);
        //    Assert.Equal(personalInformation, returnedPersonalInformation);
        //}
//        [Fact]
//        public async Task GetPersonalInformationTable_WithExistingId_ReturnsOkResultWithPersonalInformation()
//        {
//            // Arrange
//            var mockService = new Mock<IPersonalService>();
//            var personalInfo = new Personal
//            {
//                PersonalInformationId = 1,
//                Fullname = "John Doe",
//                Gender = "Male"
//            };
//            mockService.Setup(repo => repo.GetPersonalInformationTable(It.IsAny<int>()))
//                       .ReturnsAsync(personalInfo);

//            var controller = new PersonalsController(mockService.Object);

//            // Act
//            var result = await controller.GetPersonalInformationTable(1);

//            // Assert
//            var actionResult = Assert.IsType<ActionResult<Personal>>(result);
//            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
//            var returnedPersonalInfo = Assert.IsType<Personal>(okResult.Value);
//            Assert.Equal(personalInfo, returnedPersonalInfo);
//        }


//    }
//}
