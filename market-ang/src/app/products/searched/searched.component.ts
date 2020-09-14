import { Component, OnInit } from '@angular/core';
import { ExtraService } from 'src/app/_services/extra.service';
import { Product } from 'src/app/_models/Products';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-searched',
  templateUrl: './searched.component.html',
  styleUrls: ['./searched.component.css']
})
export class SearchedComponent implements OnInit {
  prods: Product[];
  constructor(public searchservice: ExtraService , public categoryservice: CategoryService) { }
  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.searchservice.searchedProducts;
  }
  index(){
    this.prods = this.searchservice.searchedProducts;
  }
}
