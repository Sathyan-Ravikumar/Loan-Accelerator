using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using LoanAccelerator.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;

namespace LoanAccelerator.Controllers
{
    [Route("user/")]
    [ApiController]
    public class UserController : ControllerBase
    {
  
        private readonly Ilogin _login;

        #region parameterized constructor
        public UserController( Ilogin login)
        {
          
            _login = login;
        }
        #endregion

        #region Post method : Login
        [HttpPost("login")]
        public async Task<ActionResult<Token>> Login(User user)
        {
            var token = await _login.Login(user);
            if (token == null)
            {
                return BadRequest(new { message = "Login failed" });
            }

            var response = new Token { token = token };
            return Ok(response);
        }
        #endregion

        #region Put method : update password
        [HttpPut("update-password")]
        public async Task<ActionResult<string>> UpdatePassword(User user)
        {
            var password = await _login.UpdatePassword(user);
            return password;
        }
        #endregion

        #region Post method : register
        [HttpPost("register")]
        public async Task<ActionResult<Token>> Register(User user)
        {
            var token = await _login.Register(user);
            if (token == null)
            {
                return BadRequest(new { message = "Registration failed" });
            }

            var response = new Token { token = token };
            return Ok(response);
        }
        #endregion

        #region Get method : check email
        [HttpGet("check-email/{email}")]
        public async Task<ActionResult<bool>> CheckEmailExists(string email)
        {
            var exist = await _login.CheckEmailExists(email);
            return exist;
      
        }
        #endregion
    }
}
