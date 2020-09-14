using System.ComponentModel.DataAnnotations.Schema;

namespace Market_Api.Models
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int Productid { get; set; } 
        public string ProductName { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Orderid { get; set; }
    }
}