import { Injectable } from '@angular/core';
import { Product } from '../_models/Products';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExtraService {

constructor( private http: HttpClient ) { }
// tslint:disable-next-line:variable-name
public searchedProducts: Product[];
search( query: string ){
  // tslint:disable-next-line:max-line-length
  return  this.http.get<Product[]>('https://localhost:44399/product/search?name=' + query).toPromise().then(res => this.searchedProducts = res as Product[]);
}

}
