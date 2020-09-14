using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Market_Api.Data_reboistory;
using Market_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Market_Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly Context context;
        public OrderController(Context _context)
        {
            context = _context;
        }
        // GET: api/<OrderController>


        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> Get(int id)
        {
            var order = await context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
        [HttpGet("items/{id}")]
         public async Task<ActionResult<Order>> Getitems(int id)
         {
            var item = context.basketItems.Where(x => x.Orderid == id);
             if (item == null)
             {
                 return NotFound();
             }
             return Ok(item);
         }

        // POST api/<OrderController>
        [HttpPost]
        public async Task<IActionResult> Post(Order order)
        {
            /*var query = "SET IDENTITY_INSERT dbo.basketItems ON;";
            context.Database.OpenConnection();
            await context.Database.ExecuteSqlRawAsync(query);
            */
            await context.Orders.AddAsync(order);



            await context.SaveChangesAsync();
            context.Database.CloseConnection();
            return StatusCode(202);
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var order = context.Orders.Find(id);
            context.Orders.Remove(order);
            context.SaveChanges();
        }
        [HttpGet]
        public async Task<IActionResult> getorders (){
            var orders = context.Orders.ToList();
            return Ok(orders);
     
} 
    }
}
