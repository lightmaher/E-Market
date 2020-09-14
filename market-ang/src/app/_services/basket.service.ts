import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasket, IBasketitem, Basket, IBasketTotals } from '../_models/basket';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../_models/Products';
@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;
constructor(private http: HttpClient) { }
getBasket(id: string) {
  return this.http.get('https://localhost:44399/basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
      })
    );
}

setBasket(basket: IBasket) {
  return this.http.post('https://localhost:44399/basket', basket).subscribe((response: IBasket) => {
    this.basketSource.next(response);
    this.calculateTotals();
  }, error => {
    console.log(error);
  });
}
deletebasket(basket: IBasket){
  return this.http.delete('https://localhost:44399/basket?id=' + basket.id).subscribe(() => {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }, error => {
    console.log(Error);
  });
}

getCurrentBasketValue() {
  return this.basketSource.value;
}
addItemToBasket(item: Product, quantity = 1) {
  const itemToAdd: IBasketitem = this.mapProductItemToBasketItem(item, quantity);
  let basket = this.getCurrentBasketValue();
  if (basket === null) {
    basket = this.createBasket();
  }
  basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  this.setBasket(basket);
}

incrementItemQuantity(item: IBasketitem) {
  const basket = this.getCurrentBasketValue();
  const foundItemIndex = basket.items.findIndex(x => x.productid === item.productid);
  // tslint:disable-next-line:no-unused-expression
  basket.items[foundItemIndex].quantity++;
  this.setBasket(basket);
}

decrementItemQuantity(item: IBasketitem) {
  const basket = this.getCurrentBasketValue();
  const foundItemIndex = basket.items.findIndex(x => x.productid === item.productid);
  if (basket.items[foundItemIndex].quantity > 1) {
    basket.items[foundItemIndex].quantity--;
    this.setBasket(basket);
  } else {
    this.removeItemFromBasket(item);
  }
}

removeItemFromBasket(item: IBasketitem) {
  const basket = this.getCurrentBasketValue();
  if (basket.items.some(x => x.productid === item.productid)) {
    basket.items = basket.items.filter(i => i.productid !== item.productid);
    if (basket.items.length > 0) {
      this.setBasket(basket);
    } else {
     this.deletebasket(basket);
    }
  }
}

deleteLocalBasket(id: string) {
  this.basketSource.next(null);
  this.basketTotalSource.next(null);
  localStorage.removeItem('basket_id');
}

private addOrUpdateItem(items: IBasketitem[], itemToAdd: IBasketitem, quantity: number): IBasketitem[] {
  const index = items.findIndex(i => i.productid === itemToAdd.productid);
  if (index === -1) {
    itemToAdd.quantity = quantity;
    items.push(itemToAdd);
  } else {
    items[index].quantity += quantity;
  }
  return items;
}

private createBasket(): IBasket {
  const basket = new Basket();
  localStorage.setItem('basket_id', basket.id);
  return basket;
}

private mapProductItemToBasketItem(item: Product, quantity: number): IBasketitem {
  return {
    productid: item.id,
    productName: item.name,
    price: item.price,
    quantity
  };
}
 calculateTotals() {
  const basket = this.getCurrentBasketValue();
  const shipping = this.shipping;
  const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
  const total = subtotal + shipping;
  this.basketTotalSource.next({shipping, total, subtotal});
}
}
