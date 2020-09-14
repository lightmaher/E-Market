import {v4 as uuidv4} from 'uuid';
export interface IBasket {
    id: string;
    items: IBasketitem [];
}

export interface IBasketitem {
    productid: number;
    productName: string;
    price: number;
    quantity: number;
}
// tslint:disable-next-line:class-name
export class Basket implements IBasket {
    id = uuidv4();
    items: IBasketitem[] = [];
}
export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}
