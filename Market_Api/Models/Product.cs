using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set;}
        public string Describtion { get; set; }
        public int Price { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
        public string url { get; set; }

       
        public int Categoryid { get; set; }
      
        public  virtual Category Category { get; set; }
    }
}
