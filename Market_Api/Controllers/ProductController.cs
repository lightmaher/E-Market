using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using CloudinaryDotNet;
using Market_Api.Data_reboistory;
using Market_Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyMusic.Core.Models.Auth;

namespace Market_Api.Controllers
{


    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly Iproductreboistory _productreb;

        private readonly Context _context;
        public ProductController(Iproductreboistory productreb, Context context)
        {
            _productreb = productreb;
            _context = context;
        }
        [HttpGet("products/{id}")]
        public ActionResult<IList<Product>> products(int id)
        {
            var pros = _productreb.products(id);
            return Ok(pros);
        }
        [HttpGet("test")]
        public string test()
        {
            return "test is good";
        }

        [HttpGet("index")]

        /* [Authorize (Roles = "admin")] */
        public async Task<IActionResult> index()
        {
            IList<Product> products = _productreb.index().ToList();
            return Ok(products);
        }


        [HttpPost("add")]
        public async Task<ActionResult<Product>> add(Product product)
        {
           await _productreb.add(product);
            return StatusCode(202);
        }
        [HttpDelete("delete/{id}")]
        public IActionResult delete(int id)
        {
            _productreb.delete(id);
            return StatusCode(203);
        }
        [HttpGet("show/{id}")]
        public ActionResult<Product> show(int id)
        {
            var product = _productreb.show(id);
            return product;
        }

        [HttpPost("upload"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var url = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { url });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpGet("{search}")]
        public async Task <IActionResult> search(string name, int? price)
            {
            var items =  _productreb.search(name, price);
            return Ok(items);
    }

}
}

