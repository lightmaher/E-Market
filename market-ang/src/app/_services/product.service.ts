import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from '../_models/Products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @Output() addedproduct = new EventEmitter<{}>();
   list: [];
   @Output()showx = new EventEmitter<{}>();

constructor( private http: HttpClient) {
}

index(): Observable<Product[]> {
    return this.http.get<Product[]>('https://localhost:44399/Product/index');
}
add( pro: Product){
  this.addedproduct.emit(pro);
  return this.http.post<Product>('https://localhost:44399/Product/add', pro);
}
delete(id){
  return this.http.delete('https://localhost:44399/Product/delete/' + id);
}
 show(id): Observable <Product>{
   return this.http.get<Product>('https://localhost:44399/Product/show/' + id);
 }
 public createImgPath = (serverPath: string) => {
    return `https://localhost:44399/${serverPath}`;
  }
  // tslint:disable-next-line:adjacent-overload-signatures
  products(id): Observable<Product[]> {
    return this.http.get<Product[]>('https://localhost:44399/Product/products/' + id);
}
}
