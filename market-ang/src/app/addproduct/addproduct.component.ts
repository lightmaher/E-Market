import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { Product } from '../_models/Products';
import { AlretifyService } from '../_services/alretify.service';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/category.model';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
 public response: {url: ''};
 product: any = {};
 uploader: FileUploader;
 photo: URL;
 hasBaseDropZoneOver: boolean;
 hasAnotherDropZoneOver: boolean;


  // tslint:disable-next-line:max-line-length
  constructor( private productservice: ProductService, private router: Router, private alretify: AlretifyService, public catservice: CategoryService) {
   }
  ngOnInit() { this.catservice.loadCategory();
  }
  public uploadFinished = (event) => {
    this.response = event;
  }
 add(){
   this.product.url = this.response.url;
   console.log(this.product);
   this.productservice.add(this.product).subscribe( next => {
     this.alretify.success('product added succsefully');
     this.router.navigate(['/products']);
  } , error => {
    console.log('msh tmam');
  }, );
  }
  assignForm(cat: Category){
    this.catservice.formData = Object.assign({} , cat);
  }
}
