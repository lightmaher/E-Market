import { Product } from './Products';

export class Category {
   categoryid: number;
    name: string;
    // tslint:disable-next-line:variable-name
    num_of_products: string;
    products: Product[];
}
