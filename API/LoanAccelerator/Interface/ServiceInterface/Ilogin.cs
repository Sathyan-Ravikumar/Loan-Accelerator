using LoanAccelerator.Models;
using Microsoft.AspNetCore.Mvc;

namespace LoanAccelerator.Interface.ServiceInterface
{
    public interface Ilogin
    {
        public   Task<string> Login(User user);
        public Task<string> UpdatePassword(User user);
        public Task<string> Register(User user);

        public Task<bool> CheckEmailExists(string email);

    }
}
