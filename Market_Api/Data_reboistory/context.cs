using Market_Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyMusic.Core.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Data_reboistory
{
    public class Context : IdentityDbContext<User,Role,Guid>
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
        public DbSet<Product> products { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<BasketItem> basketItems { get; set; }
        public DbSet<Order> Orders { get; set; }


    }
}
