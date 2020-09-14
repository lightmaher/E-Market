import { Category } from './category.model';

export interface Product {
    id: number;
    name: string;
    describtion: string;
    price: number;
    url: string;
    category: Category;
    Categoryid: number;
}
