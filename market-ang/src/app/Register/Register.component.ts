import { Component, OnInit, Input } from '@angular/core';
import { RegisterService } from '../_services/register.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlretifyService } from '../_services/alretify.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() model: any = {};
  registerform: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private registerservice: RegisterService , private router: Router, private alertify: AlretifyService , private fb: FormBuilder ) { }
  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerform = this.fb.group(
      {
        name: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmpassword: ['', Validators.required],
        email: ['', Validators.email]
      }, {validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(g: FormGroup) {
    // tslint:disable-next-line:object-literal-key-quotes
    return g.get('password').value === g.get('confirmpassword').value ? null : {'mismatch': true};
  }
  register(){
    if (this.registerform.valid) {
      this.model = Object.assign({}, this.registerform.value);
      this.registerservice.register(this.model).subscribe(next => {
      this.alertify.success('user registed succesfully');
      this.registerservice.login(this.model);
      this.router.navigate(['/products']);
    }, error => {
      this.alertify.error('registed not succeed');
    }
    );
  }
}
    backhome(){
    this.router.navigate(['/products']);
  }
}
