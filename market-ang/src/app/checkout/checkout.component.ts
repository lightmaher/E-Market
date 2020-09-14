import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Order } from '../_models/Order';
import { OrderService } from '../_services/order.service';
import { BasketService } from '../_services/basket.service';
import { Observable } from 'rxjs';
import { IBasket, Basket } from '../_models/basket';
import { AlretifyService } from '../_services/alretify.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 checkoutform: FormGroup;
 order: Order;
 basket: Basket;
  constructor( private fb: FormBuilder , private checkoutservice: OrderService, private basketservice: BasketService ,
               private alret: AlretifyService, private route: Router) {
   }

  ngOnInit(): void { this.createform();
                     this.basketservice.basket$.subscribe( res => {
        this.basket = res;
        console.log(this.basket.items);
    }, error => {console.log('msh tmm'); }
    );

  }
 createform(){
   this.checkoutform = this.fb.group(
     {
       firstName: ['', Validators.required],
       lastName: ['', Validators.required],
       adress: ['', Validators.required],
       phoneNumber: ['', Validators.required],
       city: ['', Validators.required],
     }
   );
    }
   postorder(){
     this.order = Object.assign({}, this.checkoutform.value);
     this.order.items = this.basket.items;
     this.order.totalPrice = this.basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
     this.checkoutservice.createOrder(this.order).subscribe(
       next => { this.alret.success('your order has submitted successfully order will reach you within 48 hour ');
                 this.checkoutform.reset();
                // tslint:disable-next-line:align
                const token = localStorage.removeItem('basket_id');
                 this.route.navigate(['/products']);
               } ,
        error => {
        this.alret.error('recheck your order information !');
        this.checkoutform.reset();
     });
   }
   /* loadBasket() {
    const basketId = localStorage.removeItem('basket_id');
    if (basketId) {
      this.basketservice.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      });
    }
    */
  }


