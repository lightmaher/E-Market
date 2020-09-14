import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
orders: Order[];
constructor(private http: HttpClient) { }
 createOrder( order: {}){
  return this.http.post('https://localhost:44399/Order', order);
 }
 getOrder(id: number){
   return this.http.get('https://localhost:44399/Order/' + id);
 }
 getitems(id: number){
  return this.http.get('https://localhost:44399/Order/items/' + id);
}
getorders(){
  return this.http.get('https://localhost:44399/Order');
}
deleteorder(id){
  return this.http.delete('https://localhost:44399/Order/' + id);
}
}
