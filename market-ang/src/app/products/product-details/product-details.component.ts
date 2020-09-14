import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Products';
import { RegisterService } from 'src/app/_services/register.service';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/_services/basket.service';
import { AlretifyService } from 'src/app/_services/alretify.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private service: ProductService , private route: ActivatedRoute, private basketservice: BasketService,
    // tslint:disable-next-line:align
    private alertify: AlretifyService) { }
  product: Product;
  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.service.show(+this.route.snapshot.params['id']).subscribe(res => {
      this.product = res;
    });
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44399/${serverPath}`;
  }
  additemtobasket(){
    this.basketservice.addItemToBasket(this.product);
    // tslint:disable-next-line:no-unused-expression
    this.alertify.alert('item addet to your basket');
  }

}
