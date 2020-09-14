using Market_Api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Market_Api.Data_reboistory
{
   public interface Iproductreboistory
    {
        IList<Product> products(int id);
        IList<Product> search( string name , int? price);
        IList<Product> index();
        Task add(Product product);
        Product show(int id);
        void delete(int id);

    }
}
