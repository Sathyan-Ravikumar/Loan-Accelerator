using LoanAccelerator.Models.DTO;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface ITokenService
    {
        public UserModel GetUser(string receivedToken);

    }
}
