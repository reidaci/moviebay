import { FirebaseService } from './../../../core/services/firebase.service';
import { User } from './../../../core/models/user';
import { Component } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  isLoading = true;
  isSignedUp = false;
  title = 'angular-firebase';
  formData = {
    email: '',
    password: '',
  };
  constructor(public firebase: FirebaseService) {}
  ngOnInit(): any {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  signUp(email: string, pass: string) {
    this.firebase.handleRegister(email, pass);

    this.formData.email = '';
    this.formData.password = '';
    this.isSignedUp = true;
    setTimeout(() => {
      this.isSignedUp = false;
    }, 3000);
  }
}
