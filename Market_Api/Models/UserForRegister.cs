using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Models
{
    public class UserForRegister
    {
        public string Name { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }
    }
}
