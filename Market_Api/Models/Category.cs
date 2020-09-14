using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Models
{
    public class Category
    {
        
        public int Categoryid { get; set; }
        [Required]
        public string Name { get; set; }
        public int Num_of_Products { get; set; }
        public IList<Product> Products { get; set; }

    }
}
