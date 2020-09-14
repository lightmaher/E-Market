import { Component, OnInit, Output } from '@angular/core';
import { CategoryService } from '../_services/category.service';
import { AlretifyService } from '../_services/alretify.service';
import { Category } from '../_models/category.model';
import { ProductService } from '../_services/product.service';
import { EventEmitter } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { Order } from '../_models/Order';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
 @Output() catid = new EventEmitter <number>();
 ors: Order[];
  constructor(public service: CategoryService, public toastr: AlretifyService, private productsservice: ProductService,
              private orderservice: OrderService) { }

  ngOnInit(): void {
    this.service.loadCategory();
    this.getorders();
    console.log(this.ors);
  }
 cat(id: number){
   this.catid.emit(id);
 }
  assignForm(cat: Category){
    this.service.formData = Object.assign({} , cat);
  }
  Delete(id){
    if (confirm('Are you sure to delete this Category?')){
    this.service.deleteCategory(id).subscribe(
      res => {
        this.service.loadCategory();
        this.toastr.warning('Deleted Successfuly');
      },
      err => {
        console.log(err);
      }
    );
  }}
  getorders(){
    this.orderservice.getorders().subscribe((orders: Order[]) => {
      this.ors = orders;
  });
  }
}
