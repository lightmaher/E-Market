import { Component, OnInit } from '@angular/core';
import { RegisterService } from './_services/register.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { BasketService } from './_services/basket.service';
import { Basket, IBasket, IBasketTotals } from './_models/basket';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ids: number;
  Jwthelper = new JwtHelperService();
  basket: Observable<IBasket>;
  total: Observable<IBasketTotals>;
  constructor(private service: RegisterService , private basketservice: BasketService){}
  ngOnInit(){
    this.loadBasket();
    const token = localStorage.getItem('token');
    if (token){
    this.service.decodedToken = this.Jwthelper.decodeToken(token);
    }
  }
  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketservice.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      });
    }
  }
}
