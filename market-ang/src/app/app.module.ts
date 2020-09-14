import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { from } from 'rxjs';
import { ProductService } from './_services/product.service';
import { AddproductComponent } from './addproduct/addproduct.component';
import { NavbarComponent } from './Navbar/Navbar.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadComponent } from './addproduct/upload/upload.component';
import { RouterModule } from '@angular/router';
import { approutes } from './routes';
import { RegisterComponent } from './Register/Register.component';
import { RegisterService } from './_services/register.service';
import {JwtModule} from '@auth0/angular-jwt';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { DataSharingService } from './_services/DataSharing.service';
import { AlretifyService } from './_services/alretify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoryService } from './_services/category.service';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { AdminPanalComponent } from './admin-panal/admin-panal.component';
import { HomeComponent } from './home/home.component';
import {MatSliderModule} from '@angular/material/slider';
import { ExtraService } from './_services/extra.service';
import { SearchedComponent } from './products/searched/searched.component';

export function tokengetter(){
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      ProductsComponent,
      AddproductComponent,
      NavbarComponent,
      UploadComponent,
      RegisterComponent,
      ProductCardComponent,
      ProductDetailsComponent,
      CategoryComponent,
      AddCategoryComponent,
      BasketComponent,
      CheckoutComponent,
      AdminPanalComponent,
      HomeComponent,
      SearchedComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      FileUploadModule,
      RouterModule.forRoot(approutes),
      JwtModule.forRoot({
         config: {
           tokenGetter: tokengetter,
           whitelistedDomains: ['localhost:44399'],
           blacklistedRoutes: ['localhost:44399/Account'],
         },
       }),
       BrowserAnimationsModule,
       BsDropdownModule.forRoot(),
       BrowserAnimationsModule,
       Ng2SearchPipeModule,
       ReactiveFormsModule,
       NgxPaginationModule,
       CdkStepperModule,
       MatSliderModule
     ],
   providers: [
      ProductService,
      RegisterService,
      DataSharingService,
      AlretifyService,
      CategoryService,
      ExtraService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
