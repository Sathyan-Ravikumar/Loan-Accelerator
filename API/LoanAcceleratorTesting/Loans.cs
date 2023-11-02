
//using LoanAccelerator.Controllers;
//using LoanAccelerator.Interface.ServiceInterface;
//using LoanAccelerator.Models;

//using Microsoft.AspNetCore.Mvc;
//using Moq;
//using Xunit;

//namespace LoanAccelerator.Tests
//{
//    public class LoansTests
//    {

//        [Fact]
//        public async Task GetLoanTables_ReturnsOkResultWithListOfLoans()
//        {
//            // Arrange
//            var mockService = new Mock<ILoanService>();
//            var loans = new List<Loan>
//        {
//            new Loan { LoanId = 1, ApprovedAmount = 15000, Interest = 5, Purpose = "Home Improvement" },
//            new Loan { LoanId = 2, ApprovedAmount = 20000, Interest = 7, Purpose = "Medical Expenses" }
//        };
//            mockService.Setup(repo => repo.GetLoanTables()).ReturnsAsync(loans);

//            var controller = new LoansController(mockService.Object);

//            // Act
//            var result = await controller.GetLoanTables();

//            // Assert
//            var actionResult = Assert.IsType<ActionResult<IEnumerable<Loan>>>(result);
//            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
//            var returnedLoans = Assert.IsType<List<Loan>>(okResult.Value);
//            Assert.Equal(loans, returnedLoans);
//        }

//        [Fact]
//        public async Task GetLoanTable_WithExistingId_ReturnsOkResultWithLoan()
//        {
//            // Arrange
//            var mockService = new Mock<ILoanService>();
//            var loan = new Loan { LoanId = 1, ApprovedAmount = 15000, Interest = 5, Purpose = "Home Improvement" };
//            mockService.Setup(repo => repo.GetLoanTable(It.IsAny<int>())).ReturnsAsync(loan);

//            var controller = new LoansController(mockService.Object);

//            // Act
//            var result = await controller.GetLoanTable(1);

//            // Assert
//            var actionResult = Assert.IsType<ActionResult<Loan>>(result);
//            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
//            var returnedLoan = Assert.IsType<Loan>(okResult.Value);
//            Assert.Equal(loan, returnedLoan);
//        }

//        [Theory]
//        [InlineData(1, 15000, 5, "Home Improvement")]
//        [InlineData(2, 20000, 7, "Medical Expenses")]
//        public async Task PostLoanTable_ReturnsActionResultWithLoan(int loanId, decimal approvedAmount, int interest, string purpose)
//        {
//            // Arrange
//            var mockService = new Mock<ILoanService>();
//            var loan = new Loan
//            {
//                LoanId = loanId,
//                ApprovedAmount = approvedAmount,
//                Interest = interest,
//                Purpose = purpose,
//            };
//            mockService.Setup(repo => repo.PostLoanTable(It.IsAny<Loan>()))
//                       .ReturnsAsync(loan);

//            var controller = new LoansController(mockService.Object);

//            // Act
//            var result = await controller.PostLoanTable(loan);

//            // Assert
//            var actionResult = Assert.IsType<ActionResult<Loan>>(result);
//            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
//            var returnedLoan = Assert.IsType<Loan>(okResult.Value);
//            Assert.Equal(loan, returnedLoan);
//        }

//        [Theory]
//        [InlineData(1, 10000, 3, "Education Loan")]
//        [InlineData(2, 15000, 6, "Travel Expenses")]
//        public async Task PutLoanTable_ValidData_ReturnsOk(int loanId, decimal approvedAmount, int interest, string purpose)
//        {
//            // Arrange
//            var loan = new Loan { LoanId = loanId, ApprovedAmount = approvedAmount, Interest = interest, Purpose = purpose };
//            var mockRepository = new Mock<ILoanService>();
//            mockRepository
//                .Setup(repo => repo.PutLoanTable(loanId, It.IsAny<Loan>()))
//                .ReturnsAsync(loan);

//            var controller = new LoansController(mockRepository.Object);

//            // Act
//            var result = await controller.PutLoanTable(loanId, loan);

//            // Assert
//            var okResult = Assert.IsType<OkObjectResult>(result);
//            var returnValue = Assert.IsType<Loan>(okResult.Value);
//            Assert.Equal(loanId, returnValue.LoanId);
//            Assert.Equal(approvedAmount, returnValue.ApprovedAmount);
//            Assert.Equal(interest, returnValue.Interest);
//            Assert.Equal(purpose, returnValue.Purpose);
//        }
//    }
//}
