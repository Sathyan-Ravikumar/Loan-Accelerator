using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LoanAccelerator.Controllers;
using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using LoanAccelerator.Services;
using Moq;
using Xunit;

public class AddressServiceTests
{
    [Fact]
    public async Task PostAddressInformationTable_ReturnsCreatedAddress()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Address, int>>();
        var service = new AddressService(mockRepository.Object);
        var addressToCreate = new Address { AddressInformationId = 1, PresentAddress = "New Address" };

        mockRepository.Setup(repo => repo.Post(It.IsAny<Address>()))
            .ReturnsAsync((Address address) =>
            {
                address.AddressInformationId = 123; // Simulate ID assignment.
                return address;
            });

        // Act
        var createdAddress = await service.PostAddressInformationTable(addressToCreate);

        // Assert
        Assert.NotNull(createdAddress);
        Assert.Equal(123, createdAddress.AddressInformationId); // Ensure the ID is assigned.
        Assert.Equal("New Address", createdAddress.PresentAddress);
    }

    [Fact]
    public async Task GetAddressInformation_ReturnsListOfAddresses()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Address, int>>();
        var service = new AddressService(mockRepository.Object);
        var expectedAddresses = new List<Address>
        {
            new Address { AddressInformationId = 1, PresentAddress = "Address 1" },
            new Address { AddressInformationId = 2, PresentAddress = "Address 2" }
        };

        mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(expectedAddresses);

        // Act
        var addresses = await service.GetAddressInformation();

        // Assert
        Assert.NotNull(addresses);
        Assert.Equal(expectedAddresses.Count, addresses.Count);
        Assert.Equal(expectedAddresses, addresses);
    }

    [Fact]
    public async Task PutAddressInformationTable_ReturnsUpdatedAddress()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Address, int>>();
        var service = new AddressService(mockRepository.Object);
        var existingAddress = new Address { AddressInformationId = 1, PresentAddress = "Old Address" };
        var updatedAddress = new Address { AddressInformationId = 1, PresentAddress = "Updated Address" };

        mockRepository.Setup(repo => repo.Put(It.IsAny<int>(), It.IsAny<Address>()))
            .ReturnsAsync((int id, Address address) =>
            {
                if (id == existingAddress.AddressInformationId)
                {
                    // Simulate updating the existing address.
                    existingAddress.PresentAddress = address.PresentAddress;
                    return existingAddress;
                }
                return null;
            });

        // Act
        var updatedResult = await service.PutAddressInformationTable(existingAddress.AddressInformationId, updatedAddress);

        // Assert
        Assert.NotNull(updatedResult);
        Assert.Equal("Updated Address", updatedResult.PresentAddress);
    }

    [Fact]
    public async Task GetAddressByLoanId_ReturnsAddressByLoanId()
    {
        // Arrange
        var mockAddressService = new Mock<IAddressService>();
        var controller = new AddressController(mockAddressService.Object, null);
        int loanId = 1;
        var expectedAddress = new Address { LoanId = loanId, PresentAddress = "Loan Address" };

        mockAddressService.Setup(service => service.GetByLoanId(loanId)).ReturnsAsync(expectedAddress);

        // Act
        var result = await controller.GetAddressByLoanId(loanId);

        // Assert
        Assert.Equal(expectedAddress, result);
    }    // Similar test cases for PutAddressInformationTable, GetAddressInformationTable, DeleteAddressInformationTable, and GetByLoanId methods.
}
