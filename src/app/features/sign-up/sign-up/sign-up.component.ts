import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
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
