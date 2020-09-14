using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Models
{
    public class Basket
    {
        public Basket()
        {

        }
        public Basket(string id)
        {
            Id = id;
        }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    }
}
