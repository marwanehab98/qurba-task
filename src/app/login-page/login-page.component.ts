import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SetTrue, SetFalse } from '../store/actions/login.action';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  title = 'ClickTik';
  logoPath = '../assets/Logomark.svg'
  email = ''
  password = ''
  isLoggedIn$: Observable<number>;

  constructor(private loginService: LoginService, private router: Router, private store: Store<{ isLoggedIn: number }>) {
    //Initialize store for the logged in state.
    this.isLoggedIn$ = store.select('isLoggedIn');
  }

  ngOnInit() {
  }

  //Function to set logged in state to True
  setTrue() {
    this.store.dispatch(SetTrue());
  }

  //Function to set logged in state to False
  setFalse() {
    this.store.dispatch(SetFalse());
  }

  //Function that takes value of the email input text element on change
  changeEmail(e: Event): void {
    this.email = (e.target as HTMLInputElement).value;
  }

  //Function that takes value of the password input text element on change
  changePassword(e: Event): void {
    this.password = (e.target as HTMLInputElement).value;
  }

  //On click login button function
  onLogin(username: String, password: String): void {
    this.login(username, password);
  }

  //On click helper function 
  //checks credentials and sets logged in state
  login(username: String, password: String): void {
    this.loginService.login(username, password)
    .pipe()
      .subscribe(res => {
        console.log(res)
        if (res) {
          this.router.navigateByUrl('/products');
          this.setTrue();
        }
        else {
          console.log("Wrong credentials");
          this.setFalse();
        };
      });
  }
}
