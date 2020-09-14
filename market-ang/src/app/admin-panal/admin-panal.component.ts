import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { Order } from '../_models/Order';
import { Basket, IBasketitem } from '../_models/basket';
import { of } from 'rxjs';
import { AlretifyService } from '../_services/alretify.service';

@Component({
  selector: 'app-admin-panal',
  templateUrl: './admin-panal.component.html',
  styleUrls: ['./admin-panal.component.css']
})
export class AdminPanalComponent implements OnInit {
 orders: Order[];
 order: Order;
 ordersid: number[];
 items: IBasketitem[];
  constructor( private orderservice: OrderService , private alertify: AlretifyService) { }

  ngOnInit(): void { this.getorders();
  }
  getorders(){
    this.orderservice.getorders().subscribe((orders: Order[]) => {
      this.orders = orders;
  });
  }

  getitems(id){
    this.orderservice.getitems(id).subscribe( (res: IBasketitem[]) => {
       this.items = res;
    });
  }
  delete(id){
    if (confirm('Are you sure to delete this order?')){
    this.orderservice.deleteorder(id).subscribe(
      res => {
        this.getorders();
        this.alertify.success('Deleted Successfuly');
      },
      err => {
        console.log(err);
      }
    );
  }}
}
