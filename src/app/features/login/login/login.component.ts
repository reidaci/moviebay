import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData = {
    username: '',
    password: '',
  };

  login() {
    if (
      this.formData.username === 'user' &&
      this.formData.password === 'password'
    ) {
      console.log('Authentication successful');
    } else {
      console.log('Authentication failed');
    }
  }
}
