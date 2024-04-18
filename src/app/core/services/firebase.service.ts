import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

// const adminMovieBay = 'lPphCLTxhWNsNEfSc4wNm6Ui0f33';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user!: any;
  userUid: any;
  errorMsg: string = '';
  successMsg = '';
  constructor(
    public auth: Auth,
    private router: Router,
    private firebase: Firestore
  ) {
    this.userUid = localStorage.getItem('userId');
  }

  handleRegister(email: string, password: string) {
    const collectionInstance = collection(this.firebase, '/users');

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((response: any) => {


        let user = {
          id: response.user.uid,
          email: email,
          password: password,
        };

        addDoc(collectionInstance, user).then((res) => {

        });
        this.successMsg = 'Welcome to MovieBay!';
      })
      .catch((err) => {
        console.log(err, err.message)
        this.errorMsg = err.message;
        if (
          this.errorMsg ===
          'Firebase: Password should be at least 6 characters (auth/weak-password).'
        ) {
          this.errorMsg = 'Password should be at least 6 characters';
        }
        if (this.errorMsg === 'Firebase: Error (auth/email-already-in-use).') {
          this.errorMsg = 'E-mail already exists'
        }
      }

      );

  }

  handleLogin(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res: any) => {
        this.user = res.user.uid;

        if (this.user === 'FFygvmPOumTl4sViUqzZqMffKih2') {
          localStorage.setItem('userId', this.user);
          this.router.navigate(['/adminpage']);
          // localStorage.removeItem('userId');
        } else {
          localStorage.setItem('userId', this.user);

          this.router.navigate(['/movies']);
        }
      })
      .catch((err) => {

        this.errorMsg = err.message;
        if (
          this.errorMsg ===
          'Firebase: Password should be at least 6 characters (auth/weak-password).'
        ) {
          this.errorMsg = 'Password should be at least 6 characters';
        }
        if (this.errorMsg === 'Firebase: Error (auth/user-not-found).') {
          this.errorMsg = 'User not found'
        }
        if (this.errorMsg = 'Firebase: Error (auth/wrong-password).') {
          this.errorMsg = 'Wrong password'
        }

      });
  }

  getUsers() {
    const collectionInstance = collection(this.firebase, '/users');


    getDocs(collectionInstance).then((response) => {
      console.log(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }

  addToFavorite(movies: object) {
    const collectionInstance = collection(this.firebase, this.userUid);
    addDoc(collectionInstance, movies).then((res) => {

    });

  }

  getFavorites() {
    const collectionInstance = collection(this.firebase, this.userUid);
    //  console.log(typeof this.user);

    getDocs(collectionInstance).then((response) => {
      console.log(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }
}
