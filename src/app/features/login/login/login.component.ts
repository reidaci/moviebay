import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { MoviesService } from 'src/app/core/services/movies.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
  };
  isLoading: boolean = true;
  visible: boolean = true;
  changetype: boolean = true;
  @ViewChild('loginForm') logInForm!: NgForm;
  constructor(
    public firebase: FirebaseService,
    private getMovies: MoviesService,
    private router: Router
  ) {
    getMovies.getMovies();
  }
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  ngOnInit(): any {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  logIn(email: string, pass: string) {

    this.firebase.handleLogin(email, pass);
    setTimeout(() => {
      this.logInForm.resetForm();
      this.firebase.errorMsg = '';
      this.firebase.successMsg = '';
    }, 3000);
  }
}


