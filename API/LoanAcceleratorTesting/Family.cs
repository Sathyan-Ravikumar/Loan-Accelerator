 
using LoanAccelerator.Interface.RepoInterface;

using LoanAccelerator.Models;
using LoanAccelerator.Services;
using Moq;
using Xunit;

namespace LoanAcceleratorTesting
{
    public class FamilyDetailsServiceTests
    {


        [Fact]
        public async Task PostFamilyDetail_ShouldAddFamilyDetail()
        {
            // Arrange
 
            var mockRepo = new Mock<IRepository<Family, int>>();
            var familyDetailService = new FamilyService(mockRepo.Object);
            var newFamilyDetail = new Family {  
                                                };
 
            mockRepo.Setup(repo => repo.Post(It.IsAny<Family>()))
                .ReturnsAsync((Family family) => family);

            // Act
            var result = await familyDetailService.PostFamilyDetail(newFamilyDetail);

            // Assert
            Assert.Equal(newFamilyDetail, result);
        }

    }
}
