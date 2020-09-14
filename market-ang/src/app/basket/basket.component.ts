import { Component, OnInit , EventEmitter} from '@angular/core';
import { BasketService } from '../_services/basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketitem, IBasketTotals } from '../_models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
 basket$: Observable<IBasket>;
 total$: Observable<IBasketTotals>;
 isBasket = true;
 items: IBasketitem[];
 isOrder = false;

  constructor(private basketservice: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketservice.basket$;
    this.total$ = this.basketservice.basketTotal$;
  }
  decrementItemQuantity(item: IBasketitem) {
    this.basketservice.decrementItemQuantity(item);
  }

  incrementItemQuantity(item: IBasketitem) {
    this.basketservice.incrementItemQuantity(item);
  }

  removeBasketItem(item: IBasketitem) {
   this.basketservice.removeItemFromBasket(item);
  }
  loggedin(){
    const token = localStorage.getItem('token');
    return !! token;
  }

}
