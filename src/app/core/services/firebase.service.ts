import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user!: any;
  constructor(
    public auth: Auth,
    private route: Router,
    private firebase: Firestore
  ) {}

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
        this.user = res.user.uid;
        localStorage.setItem('userId', this.user);
        console.log(this.user);
        this.route.navigate(['/movielist']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addToFavorite(movies: object) {
    const collectionInstance = collection(this.firebase, this.user);
    addDoc(collectionInstance, movies).then((res) => {
      console.log(this.user);
      console.log(res);
    });
  }
}
