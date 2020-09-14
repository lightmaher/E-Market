import { Component, OnInit, Input, ɵɵqueryRefresh, Output, EventEmitter} from '@angular/core';
import { ProductService } from '../_services/product.service';
import { DataSharingService } from '../_services/DataSharing.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/Products';
import { ActivatedRoute } from '@angular/router';
import { ValueTransformer } from '@angular/compiler/src/util';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/category.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products: Product[];
   fproducts: Product[];
   sproduct: Product[];
   valuef = 0;
   valuses: string;
   p = 1;
   categoryName = {};
   valueo = {};
   term: string;
  constructor( private service: ProductService, private dataSharingService: DataSharingService, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    public categoryservice: CategoryService) {
}
  ngOnInit() {
     this.refresh();
     this.categoryservice.loadCategory();
     console.log(this.valuef);
                }
  ondelete( id ){
    this.service.delete(id).subscribe( res => {
      this.refresh();
    }
    , error => {
       console.log('mshtmam');
    });
  }
  refresh(){
    this.service.index().subscribe( (products: Product[]) => {
      this.products = products;
      // banst5dam deh 3shan nstfid mn [queryparams] aly btba3t m3 routerlink
      this.route.queryParamMap.subscribe(params => {
        // banst5dmt elvalue bta3t el category name aly a7na b3tinha
          this.categoryName = params.get('categoryName');
          console.log(this.valuef);
           // hana bn3mel el filter 3la asas el category name
          this.fproducts = (this.categoryName) ?
          this.products.filter(p => p.category.name === this.categoryName &&  p.price > this.valuef) : this.products;
        });
    });
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44399/${serverPath}`;
  }
  formatLabel(value: number) {
    this.valuef = value;
    return this.valuef;
  }
}
