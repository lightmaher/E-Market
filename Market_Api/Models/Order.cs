using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int TotalPrice { get; set; }

        public string Adress { get; set; }

        public string city { get; set; }
        public string PhoneNumber { get; set; }

        public IList<BasketItem> Items { get; set; }
         




    }
}
