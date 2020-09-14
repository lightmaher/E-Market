import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
decodedToken: any;
jwtHelper = new JwtHelperService();
xd: HTMLElement;

constructor(private http: HttpClient) { }
register(user){
return this.http.post('https://localhost:44399/Account/register', user).pipe(
  map((Response: any) => {
   const regist = Response;
   if (regist) {
     localStorage.setItem('token', regist.token);
   }
  })

);
}
login(mod){
  return this.http.post('https://localhost:44399/Account/login', mod).pipe(
    map((Response: any) => {
     const user = Response;
     if (user) {
       localStorage.setItem('token', user.token);
       this.decodedToken = this.jwtHelper.decodeToken(user.token);

     }
    })
  );
}
}
