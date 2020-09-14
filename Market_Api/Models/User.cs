using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Models
{
    public class User : IdentityUser<Guid>
    {
        public string firstname { get; set; }
        public string Password { get; set; }

    }
}
