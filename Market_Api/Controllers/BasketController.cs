using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Market_Api.Data_reboistory;
using Market_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Market_Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketreb _basketRepository;
        public BasketController(IBasketreb basketreb)
        {
            _basketRepository = basketreb;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            Basket basket1 = new Basket(id);
            return Ok(basket ?? basket1);
        }

        [HttpPost]
        public async Task<ActionResult<Basket>> UpdateBasket(Basket basket)
        {

            var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);

            return Ok(updatedBasket);
        }

        [HttpDelete]
        public  async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}
