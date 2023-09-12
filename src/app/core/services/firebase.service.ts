import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public auth: Auth) {}

  handleRegister(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((respone: any) => {
        console.log(respone);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  handleLogin(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
