import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlretifyService } from 'src/app/_services/alretify.service';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/category.model';
import { BasketService } from 'src/app/_services/basket.service';
import { RegisterService } from 'src/app/_services/register.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
 @Input() prod: Product;
 pros: Product[];
 myid: number;
 cat: Category;
 single: any = {};
 @Input() reload: false;
  // tslint:disable-next-line:max-line-length
  constructor(private service: ProductService, private route: Router , private activatedRoute: ActivatedRoute, private alertify: AlretifyService, private basketservice: BasketService,
              private catservice: CategoryService, private accountservice: RegisterService ) {
   }

  ngOnInit() { this.catservice.loadCategory();
               console.log(this.accountservice.decodedToken?.role);
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44399/${serverPath}`;
  }
  ondelete( id ){
    this.service.delete(id).subscribe( res => {
      location.reload();
      this.alertify.error('prodect deleted');
    }
    , error => {
       console.log('mshtmam');
    });
  }
  loggedin(){
    // tslint:disable-next-line:semicolon
    // tslint:disable-next-line:no-unused-expression
    if ( this.accountservice.decodedToken?.role === 'admin'){
       return true;
    } else {
      return false;
    }
  }
  additemtobasket(){
    this.basketservice.addItemToBasket(this.prod);
    // tslint:disable-next-line:no-unused-expression
    this.alertify.alert('item addet to your basket');
  }
}
