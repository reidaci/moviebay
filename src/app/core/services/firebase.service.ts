import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user!: any;
  userUid: any;
  constructor(
    public auth: Auth,
    private route: Router,
    private firebase: Firestore
  ) {
    this.userUid = localStorage.getItem('userId');
  }

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
    const collectionInstance = collection(this.firebase, this.userUid);
    addDoc(collectionInstance, movies).then((res) => {
      console.log(this.user);
      console.log(res);
    });
  }
  getFavorites() {
    const collectionInstance = collection(this.firebase, this.userUid);
    console.log(typeof this.user);
    // debugger;
    getDocs(collectionInstance).then((response) => {
      console.log(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }
}
