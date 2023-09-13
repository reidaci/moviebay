import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { MoviesService } from 'src/app/core/services/movies.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private firebase: FirebaseService,
    private getMovies: MoviesService
  ) {
    getMovies.getMovies();
  }
  formData = {
    email: '',
    password: '',
  };

  logIn(email: string, pass: string) {
    this.firebase.handleLogin(email, pass);
  }
}
