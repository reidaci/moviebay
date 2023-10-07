import { FirebaseService } from './../../../core/services/firebase.service';
import { User } from './../../../core/models/user';
import { Component, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  isLoading = true;
  isSignedUp = false;
  visible: boolean = true;
  changetype: boolean = true;
  @ViewChild('signup') signUpForm!: NgForm;
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

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  signUp(email: string, pass: string) {
    if (this.signUpForm.invalid) return;
    this.firebase.handleRegister(email, pass);

    console.log(this.signUpForm.controls);
    setTimeout(() => {
      this.signUpForm.resetForm();
      this.firebase.errorMsg = '';
      this.firebase.successMsg = '';
    }, 3000);
  }
}
