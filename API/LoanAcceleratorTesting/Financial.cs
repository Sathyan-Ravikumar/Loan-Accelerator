
using LoanAccelerator.Controllers;

using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LoanAcceleratorTesting
{
    public class FinancialInformationTests
    {

        [Fact]
        public async Task GetFinancialInformationTables_ReturnsListOfFinancialInformationTables()
        {
            // Arrange
            var mockService = new Mock<IFinancialService>();
            mockService.Setup(repo => repo.GetFinancialInformationTables())
                       .ReturnsAsync(new List<Financial>
                       {
                           new Financial { FinancialInformationId = 1, IncomeSalary = 6000 },
                           new Financial {FinancialInformationId = 2, IncomeSalary = 16000  },
                        });

            var controller = new FinancialsController(mockService.Object);

            // Act
            var result = await controller.GetFinancialInformationTables();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var financialInformationList = Assert.IsType<List<Financial>>(okResult.Value);
            Assert.Equal(2, financialInformationList.Count);
        }

        [Fact]
        public async Task PostFinancialInformationTable_ValidData_ReturnsOkResult()
        {
            // Arrange
            var mockFinancialInformationRepository = new Mock<IFinancialService>();
            var controller = new FinancialsController(mockFinancialInformationRepository.Object);

            var financialInformation = new Financial
            {
                CarCount = 1,
                IncomeSalary = 50000,
                IncomeRent = 15000,
                OtherIncome = 10000
            };

            mockFinancialInformationRepository
                .Setup(repo => repo.PostFinancialInformationTable(It.IsAny<Financial>()))
                .ReturnsAsync(financialInformation);

            // Act
            var result = await controller.PostFinancialInformationTable(financialInformation) as ActionResult<Financial>;

            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result.Result);
        }
        [Fact]
        public async Task PutFinancialInformationTable_ValidData_ReturnsOk()
        {
            // Arrange
            var financialInfoTable = new Financial { FinancialInformationId = 1, IncomeSalary = 6000 };
            var mockRepository = new Mock<IFinancialService>();
            mockRepository.Setup(repo => repo.PutFinancialInformationTable(It.IsAny<int>(), It.IsAny<Financial>()))
                .ReturnsAsync((int id, Financial info) => info);

            var controller = new FinancialsController(mockRepository.Object);

            // Act
            var result = await controller.PutFinancialInformationTable(financialInfoTable.FinancialInformationId, financialInfoTable);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Financial>(okResult.Value);
            Assert.Equal(financialInfoTable.FinancialInformationId, returnValue.FinancialInformationId);
        }
    }
}
