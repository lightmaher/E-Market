import {Routes} from '@angular/router' ;
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { RegisterComponent } from './Register/Register.component';
import { Component } from '@angular/core';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CategoryComponent } from './category/category.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminPanalComponent } from './admin-panal/admin-panal.component';
import { HomeComponent } from './home/home.component';
import { SearchedComponent } from './products/searched/searched.component';

export const approutes: Routes = [
    {path: 'products', component: ProductsComponent},
    {path: '', component: HomeComponent},
    {path: 'add', component: AddproductComponent},
    {path: 'register' , component: RegisterComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'category/products', component: CategoryComponent},
    {path: 'basket', component: BasketComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'admin', component: AdminPanalComponent},
    {path: 'search', component: SearchedComponent},
    {path: '**', redirectTo : 'home' , pathMatch : 'full'}
 ];
