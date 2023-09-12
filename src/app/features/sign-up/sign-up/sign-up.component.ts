import { FirebaseService } from './../../../core/services/firebase.service';
import { User } from './../../../core/models/user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  title = 'angular-firebase';
  formData = {
    email: '',
    password: '',
  };
  constructor(public firebase: FirebaseService) {}
  signUp(email: string, pass: string) {
    this.firebase.handleRegister(email, pass);
  }
}
