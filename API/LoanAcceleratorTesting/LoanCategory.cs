using LoanAccelerator.Controllers;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

public class LoanCategoryControllerTests
{
    [Fact]
    public async Task GetLoancategoryReturnsListOfLoanCategories()
    {
        // Arrange
        var mockService = new Mock<ILoanCategoryService>();
        var categories = new List<LoanCategory>
       {
           new LoanCategory { LoanCategoryId = 1, LoanCategory1 = "Category 1", LoanCategoryKey = "Key1" },
           new LoanCategory { LoanCategoryId = 2, LoanCategory1 = "Category 2", LoanCategoryKey = "Key2" }
       };
        mockService.Setup(service => service.GetLoancategory()).ReturnsAsync(categories);
        var controller = new LoanCategoryController(mockService.Object);

        // Act
        var result = await controller.GetLoancategory();

        // Assert
        var actionResult = Assert.IsType<ActionResult<IEnumerable<LoanCategory>>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var returnedCategories = Assert.IsAssignableFrom<IEnumerable<LoanCategory>>(okResult.Value);
        Assert.Equal(categories.Count(), returnedCategories.Count());
    }

    //    [Fact]
    //    public async Task PostLoanCategory_ReturnsCreatedAtActionResult()
    //    {
    //        // Arrange
    //        var mockService = new Mock<ILoanCategoryService>();
    //        var newCategory = new LoanCategory();
    //        var expectedCategory = new LoanCategory { LoanCategoryId = 1 };

    //        mockService.Setup(service => service.PostLoanCategory(It.IsAny<LoanCategory>()))
    //                   .ReturnsAsync(expectedCategory);

    //        var controller = new LoanCategoryController(mockService.Object);

    //        // Act
    //        var result = await controller.PostLoanCategory(newCategory);

    //        // Assert
    //        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
    //        Assert.Equal("GetLoanCategoryById", createdAtActionResult.ActionName);

    //        // You can further assert the returned object if needed
    //        var createdCategory = Assert.IsType<LoanCategory>(createdAtActionResult.Value);
    //        Assert.Equal(expectedCategory.LoanCategoryId, createdCategory.LoanCategoryId);
    //    }

    [Fact]
    public async Task PutLoanCategory_ReturnsOkResult()
    {
        // Arrange
        var categoryId = 1;
        var updatedCategory = new LoanCategory { LoanCategoryId = categoryId };
        var mockService = new Mock<ILoanCategoryService>();
        var expectedUpdatedCategory = new LoanCategory { LoanCategoryId = categoryId, LoanCategory1 = "Updated" };

        mockService.Setup(service => service.PutLoanCategory(categoryId, It.IsAny<LoanCategory>()))
                   .ReturnsAsync(expectedUpdatedCategory);

        var controller = new LoanCategoryController(mockService.Object);

        // Act
        var result = await controller.PutLoanCategory(categoryId, updatedCategory);

        // Assert
        var okObjectResult = Assert.IsType<OkObjectResult>(result);

        // You can further assert the returned object if needed
        var updated = Assert.IsType<LoanCategory>(okObjectResult.Value);
        Assert.Equal(expectedUpdatedCategory.LoanCategoryId, updated.LoanCategoryId);
        Assert.Equal(expectedUpdatedCategory.LoanCategory1, updated.LoanCategory1);
    }
}
