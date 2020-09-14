import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/Products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 products: Product[];
  constructor( private productsService: ProductService) { }
  ngOnInit(): void { this.showProducts();
  }
 showProducts(){
   this.productsService.index().subscribe((products: Product[]) => {
      this.products = products;
   });
 }
 public createImgPath = (serverPath: string) => {
  return `https://localhost:44399/${serverPath}`;
}
}
