using LoanAccelerator.Interface.ServiceInterface;
using LoanAccelerator.Models;
using LoanAccelerator.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LoanAccelerator.Services
{
    public class Logincs :Ilogin
    {
        private readonly IUserService _userinterface;
        private readonly IConfiguration _config;

        public Logincs(IUserService userinterface, IConfiguration config)
        {
            _userinterface = userinterface;
            _config = config;
        }
        public async Task<bool> CheckEmailExists(string email)
        {
            if (_userinterface == null)
            {
                throw new Exception("User repository is null.");
            }

            bool emailExists = await _userinterface.CheckEmailExists(email);
            return emailExists;
        }
        public async Task<string> Login(User user)
        {

            var existingUser = await _userinterface.GetUserByEmail(user.EmailId!);
            if (existingUser == null)
            {
                throw new Exception("Invalid EmailId");
            }
            var decryptedPassword = Encrypt(user.Password!);
            if (decryptedPassword != existingUser.Password)
            {
                throw new Exception("Invalid Password");
            }
            if (existingUser.IsActive != "Active")
            {
                throw new Exception("Account is not active");
            }
            var token = GenerateJwtToken(existingUser);
            return token;       
        }
        public async Task<string> UpdatePassword(User user)
        {
             
            var existingUser = await _userinterface.GetUserByEmail(user.EmailId!);
            var encryptedNewPassword = Encrypt(user.Password!);
            existingUser.Password = encryptedNewPassword;
            await _userinterface.UpdateUser(existingUser);
            return ("Password Changed");
        }
        public async Task<string> Register(User user)
        {
            var existingUser = await _userinterface.GetUserByEmail(user.EmailId!);
            if (existingUser != null)
            {
                throw new Exception("Email is already in use.");
            }
            user.Password = Encrypt(user.Password!);
            user.IsActive = "Active";
            var createdUser = await _userinterface.AddUser(user);
            var token = GenerateJwtToken(createdUser);
            return token;
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SecretKey"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("UserId", user.UserId.ToString()),
                new Claim( "FullName", user.FullName!),
                new Claim(ClaimTypes.Role, user.Role!),
                new Claim(ClaimTypes.Email,user.EmailId!),
                new Claim("CustomerId" , user.CustomerId.ToString()!),
                new Claim("EligibilityScore" , user.EligibilityScore.ToString()!),
             }),
                Expires = DateTime.UtcNow.AddHours(10),
                SigningCredentials = credentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string Encrypt(string password)
        {
            // Example key and IV generation using hashing
            string passphrase = _config["PassPhrase:Phrase"]!;

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] key = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase));
                byte[] iv = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase)).Take(16).ToArray();

                using (Aes aes = Aes.Create())
                {
                    aes.Key = key;
                    aes.IV = iv;

                    ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter writer = new StreamWriter(cryptoStream))
                            {
                                writer.Write(password);
                            }
                        }

                        byte[] encryptedData = memoryStream.ToArray();
                        return Convert.ToBase64String(encryptedData);
                    }
                }
            }
        }
    }
}
