
using LoanAccelerator.Controllers;

using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using Moq;
using Xunit;


namespace LoanAccelerator.Tests
{
    public class LoanDocumentsTablesTests
    {

        [Fact]
        public async Task GetByLoanId_ReturnsListOfLoanDocuments()
        {
            // Arrange
            var mockService = new Mock<ILoanDocumentService>();
            var loanDocuments = new List<LoanDocument>
            {
                new loandocument { documentid = 1, LoanId = 1, DocumentLink = "link1.pdf" },
                new LoanDocument { DocumentId = 2, LoanId = 1, DocumentLink = "link2.pdf" }
            };
            mockService.Setup(repo => repo.GetByLoanId(It.IsAny<int>())).ReturnsAsync(loanDocuments);

            var controller = new LoanDocumentsController(mockService.Object);

            // Act
            var result = await controller.GetLoanDocumentsTable(1); // Assuming your method takes a loanId parameter

            // Assert
            var returnedLoanDocuments = Assert.IsType<List<LoanDocument>>(result);
            Assert.Equal(loanDocuments, returnedLoanDocuments);
        }

        //[Fact]
        //public async Task Postloandocumentstable_returnsloandocument()
        //{
        //    // arrange
        //    var mockservice = new Mock<ILoanDocumentService>();
        //    var loandocument = new loandocument
        //    {
        //        loanid = 1,
        //        DocumentTypeId = 1,
        //        documentlink = "link",
        //        Date = DateTime.Now
        //    };
        //    mockservice.Setup(repo => repo.PostLoanDocumentsTable(It.IsAny<loandocument>()))
        //               .ReturnsAsync(loandocument);

        //    var controller = new LoanDocumentsController(mockservice.Object);

        //    // act
        //    var result = await controller.PostLoanDocumentsTable(loandocument);

        //    // assert
        //    var returnedloandocument = Assert.IsType<LoanDocument>(result);
        //    Assert.Equal(loandocument, returnedloandocument);
        //}

        [Fact]
        public async Task PutLoanDocumentsTable_ReturnsUpdatedLoanDocument()
        {
            // Arrange
            var mockService = new Mock<ILoanDocumentService>();
            int loanId = 1;
            var updatedDocument = new LoanDocument
            {
                DocumentId = 1,
                LoanId = loanId,
                DocumentTypeId = 1,
                DocumentLink = "newlink",
                Date = DateTime.Now
            };
            mockService.Setup(repo => repo.PutLoanDocumentsTable(loanId, It.IsAny<LoanDocument>()))
                       .ReturnsAsync(updatedDocument);

            var controller = new LoanDocumentsController(mockService.Object);

            // Act
            var result = await controller.PutLoanDocumentsTable(loanId, updatedDocument);

            // Assert
            var returnedUpdatedDocument = Assert.IsType<LoanDocument>(result);
            Assert.Equal(updatedDocument, returnedUpdatedDocument);
        }

    }
}
