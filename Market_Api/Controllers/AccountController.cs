using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Market_Api.Data_reboistory;
using Market_Api.Models;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyMusic.Core.Models.Auth;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Market_Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly Context _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IConfiguration config;

        public AccountController(Context context, UserManager<User> userManager, SignInManager<User> signInManager,RoleManager<Role> roleManager, IConfiguration config)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
           _roleManager = roleManager;
            this.config = config;
        }
        [HttpGet("index")]
        public string index()
        {
            return "yarab";
        }


        [HttpPost("register")]
        public async Task<IActionResult> register(UserForRegister userforregister)
        {
            var account = new User
            {
                UserName = userforregister.Name,
                Email = userforregister.Email
            };
            var result = await _userManager.CreateAsync(account, userforregister.Password);


            if (result.Succeeded)
            {
                var user = _signInManager.CheckPasswordSignInAsync(account, userforregister.Password,false);
                return Ok(user);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> login(UserForRegister userforregister)
        {
          await  createrole();
          await createadmin();
            var user = await _userManager.FindByNameAsync(userforregister.Name);
            var result = await _signInManager.CheckPasswordSignInAsync(user,userforregister.Password,false);
            

            if (result.Succeeded)
            {

                if (await _roleManager.RoleExistsAsync("user"))
                {
                    if (!await _userManager.IsInRoleAsync(user, "user") && !await _userManager.IsInRoleAsync(user, "admin"))
                        await _userManager.AddToRoleAsync(user, "user");
                }
                return Ok(new
                {
                    token = GenerateJwtToken(user).Result,
                    user
                }); ;
            }
            else
            {
                return Unauthorized();
            }
        }

        public async Task createadmin()
        {
            var admin = await _userManager.FindByNameAsync("admin");
            if (admin == null)
            {
                var account = new User
                {
                    UserName = "admin"
               

                };
                var result = await _userManager.CreateAsync(account, "admin12");


                if (result.Succeeded)
                {if(await _roleManager.RoleExistsAsync("admin") )
                    await _userManager.AddToRoleAsync(account, "admin");
                 
                }
             
            }
           

        }
        public async Task createrole()
        {
            var admin = new Role
            {
                Name = "admin"
            };
            await _roleManager.CreateAsync(admin);
            var user = new Role
            {
                Name = "user"
            };
            await _roleManager.CreateAsync(user);
        }
        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }

}


