using System;
using Microsoft.AspNetCore.Identity;

namespace MyMusic.Core.Models.Auth
{
    public class Role : IdentityRole<Guid>
    {
        public const string Admin = "admin";
        public const string User = "user";
    }
}