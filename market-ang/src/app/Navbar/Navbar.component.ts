import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../_services/register.service';
import { AlretifyService } from '../_services/alretify.service';
import { Router } from '@angular/router';
import { BasketService } from '../_services/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../_models/basket';
import { nextTick } from 'process';
import { ExtraService } from '../_services/extra.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() selected = new EventEmitter<string>();
  @Input() Model: any = {};
   user: any = {};
  basket$: Observable<IBasket>;
  query = '';
  // tslint:disable-next-line:max-line-length
  constructor(public service: RegisterService, private alertify: AlretifyService, private router: Router,
              private basketservice: BasketService, private accountservice: RegisterService, private searchService: ExtraService) { }
  ngOnInit() {
    this.basket$ = this.basketservice.basket$;

  }

 login(Model)
 {
  this.service.login(Model).subscribe(
    res => {
      this.user = res;

      this.alertify.success('you are logged in successfully');
      this.router.navigate(['/home']);
      location.reload();

    }, error => {
      this.alertify.error('passwod or username are incorrect');
    }

  );
 }
 loggedin(){
  const token = localStorage.getItem('token');
  return !! token;
}
loggedinasadmin(){
  // tslint:disable-next-line:semicolon
  // tslint:disable-next-line:no-unused-expression
  if ( this.accountservice.decodedToken?.unique_name === 'admin'){
     return true;
  } else {
    return false;
  }
}
logout(){
  const token = localStorage.removeItem('token');
  this.alertify.success('you logged out');
  location.reload();
  this.router.navigate(['/home']);

}
search(){
this.searchService.search(this.query);
console.log(this.query);
this.router.navigate(['/search']);
}
}
