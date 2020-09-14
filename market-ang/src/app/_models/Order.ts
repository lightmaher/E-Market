import { Basket, IBasketitem, IBasketTotals } from './basket';
import { Observable } from 'rxjs';

export interface Order {
    id: number;
    firstName: string;
    lastName: string;
    totalPrice: number;
    adress: string;
    city: string;
    phoneNumber: number;
    items: IBasketitem[];
    /*
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public int TotalPrice { get; set; }

    public string Adress { get; set; }

    public string city { get; set; }
    public string PhoneNumber { get; set; }

    public int BasketId { get; set; }
    public virtual Basket Basket{ get; set; }
    */
}
