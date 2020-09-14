using Market_Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Data_reboistory
{
    public class productreboistory : Iproductreboistory
        
    {
        private readonly Context _context;
        public productreboistory( Context context)
        {
            _context = context;
        }
     
        public async Task add(Product product)
        {
           
          await _context.products.AddAsync(product);
             _context.SaveChanges();
        }

        public void delete(int id)
        {
            var product = _context.products.FirstOrDefault(x => x.Id == id);
            _context.Remove(product);
            index();
            _context.SaveChanges();
        }

       
        public IList<Product> index()
        {
            IList<Product> products = _context.products.Include(c=>c.Category).ToList();
            return products;
        }

        public IList<Product> products(int id)
        {
            var pros = _context.products.Include(c => c.Category).Where(x => x.Categoryid == id).ToList();
            return (pros);
          
        }

        public IList<Product> search(string name, int? price)
        {
            IList<Product> prods = _context.products.ToList() ;
            if(!string.IsNullOrEmpty(name))
            {
                prods = _context.products.Where(x => x.Name.Contains(name)).Include(x => x.Category).ToList();
            }
            if (price != null)
            {
                prods = _context.products.Where(x => x.Price == price).ToList();
            }
            return prods;
        }

        public Product show(int id)
        {
            var product = _context.products.FirstOrDefault(x => x.Id == id);
            return product;
        }
    }
}
