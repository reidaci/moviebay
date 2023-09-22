import { Component } from '@angular/core';
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

  constructor(
    private firebase: FirebaseService,
    private getMovies: MoviesService,
    private router: Router
  ) {
    getMovies.getMovies();
  }

  ngOnInit(): any {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  logIn(email: string, pass: string) {
    this.firebase.handleLogin(email, pass);
  }
}
