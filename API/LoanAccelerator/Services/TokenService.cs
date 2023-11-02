using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models.DTO;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;

namespace LoanAccelerator.Services
{
    public class TokenService : ITokenService
    {
        #region method to userdetails from the token
        /// <summary>
        /// Retrieves user information from a JWT.
        /// </summary>
        /// <param name="receivedToken">The JWT token received, typically in the "Bearer Token" format.</param>
        /// <returns>A <see cref="UserModel"/> object containing user details.</returns>
        public UserModel GetUser(string receivedToken)
        {
            string bearerToken = receivedToken?.Substring("Bearer ".Length)!;
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadJwtToken(bearerToken);
            var claimValues = new List<string>();
            var claims = token.Claims;
            var user = new UserModel
            {
                UserId = int.Parse(claims.FirstOrDefault(claim => claim.Type == "UserId")!.Value),
                FullName = claims.FirstOrDefault(claim => claim.Type == "FullName")!.Value,
                Role = claims.FirstOrDefault(claim => claim.Type == "role")!.Value,
                EligibilityScore = int.Parse(claims.FirstOrDefault(claim => claim.Type == "EligibilityScore")!.Value),
                EmailId = claims.FirstOrDefault(claim => claim.Type == "email")!.Value,
                CustomerId = int.Parse(claims.FirstOrDefault(claim => claim.Type == "CustomerId")!.Value),
            };

             return user;

        }
        #endregion
    }
}
