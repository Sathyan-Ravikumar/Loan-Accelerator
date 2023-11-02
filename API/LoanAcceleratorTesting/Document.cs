 using LoanAccelerator.Controllers;
 

using Moq;
 using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Xunit;

namespace LoanAcceleratorTesting
{
    public class DocumentTypeTests
    {
        [Fact]
        public async Task PostDocumentsType_ValidData_ReturnsOk()
        {
            // Arrange
            var mockService = new Mock<IDocumentService>();
            var documentType = new Document { DocumentTypeId = 1, DocumentType = "Test Document" };
            mockService.Setup(service => service.PostDocumentsType(documentType))
                .ReturnsAsync(documentType);

            var controller = new DocumentsController(mockService.Object);

            // Act
            var result = await controller.PostDocumentsType(documentType);

            // Assert
            var okResult = Assert.IsType<Document>(result);
            Assert.Equal(documentType, okResult);
        }
    }
}
