import { Component } from '@angular/core';
import {
  Database,
  set,
  ref,
  update,
  getDatabase,
  remove,
  push,
  child,
} from '@angular/fire/database';
import { Auth, getAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/core/services/firebase.service';

import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from '@angular/fire/firestore';
import { deleteDoc, doc } from '@angular/fire/firestore';
import { User } from 'src/app/core/models/user';
import { HttpClient } from '@angular/common/http';

// const allDetails = rank: number,
// title: string,
// description: string,
// image: string,
// genre: string[],
// thumbnail: string,
// rating: string,
// id: string,
// year: number

// const auth = getAuth();
// const user = auth.currentUser;
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  rank!: any; // Initialize with default value
  title: string = '';
  description: string = '';
  image: string = '';
  genre: string = '';
  thumbnail: string = '';
  rating: string = '';
  id: string = '';
  year: string = ''; // Initialize with default value
  movieIdToDelete: string = '';
  usersList: any[] = [];

  constructor(
    private http: HttpClient,
    public database: Database,
    private auth: Auth,
    private myService: FirebaseService,
    private firebase: Firestore
  ) {
    this.getUsers();
  }

  addMovie() {
    // const db = getDatabase();
    const movieData = {
      rank: this.rank,
      title: this.title,
      description: this.description,
      image: this.image,
      genre: this.genre,
      thumbnail: this.thumbnail,
      rating: this.rating,
      id: this.id,
      year: this.year,
    };

    //TO DO instead  of /movies increment
    this.http
      .post(
        'https://moviebay-71cc8-default-rtdb.europe-west1.firebasedatabase.app/.json',
        movieData
      )
      .subscribe((res) => {
        console.log(res);
      });
    // set(ref(db, '/movies/' + this.id), movieData).then(() => {
    this.rank = '';
    this.title = '';
    this.description = '';
    this.image = '';
    this.genre = '';
    this.thumbnail = '';
    this.rating = '';
    this.id = '';
    this.year = '';
    //   console.log('Movie added to the database.'); // You can add error handling as needed
    // });
  }
  // writeNewPost() {
  //   const db = getDatabase();

  //   // A post entry.
  //   const postData = {
  //     rank: this.rank,
  //     title: this.title,
  //     description: this.description,
  //     image: this.image,
  //     genre: this.genre,
  //     thumbnail: this.thumbnail,
  //     rating: this.rating,
  //     id: this.id,
  //     year: this.year,
  //   };

  //   // Get a key for a new Post.
  //   const newPostKey = push(child(ref(db), 'movies')).key;

  //   // Write the new post's data simultaneously in the posts list and the user's post list.
  //   const updates = {};
  //   updates['/movies/' + newPostKey] = postData;
  //   updates['/movies/' + uid + '/' + newPostKey] = postData;

  //   return update(ref(db), updates);
  // }

  removeMovie(id: string) {
    const db = getDatabase();

    // Use the 'remove' method to delete a movie by its ID
    remove(ref(db, id))
      .then(() => {
        this.movieIdToDelete = '';
        console.log('Movie removed from the database.');
      })
      .catch((error: any) => {
        console.error('Error removing movie:', error);
      });
  }

  /*   getUsers() {
    console.log(this.auth); // to do shfaq emrin e userit
    this.myService.getUsers();
    // if (user !== null) {
    // The user object has basic properties such as display name, email, etc.

    // const email = user.email;
    // const uid = user.uid;
  } */

  getUsers() {
    const collectionInstance = collection(this.firebase, '/users');

    getDocs(collectionInstance).then((response) => {
      console.log(
        response.docs.map((item) => {
          this.usersList.push({ ...item.data(), id: item.id });
          console.log(this.usersList);
        })
      );
    });
  }

  logOut() {
    localStorage.removeItem('userId');
  }

  async deleteUsers(id: string) {
    const collectionInstance = collection(this.firebase, '/users');
    await deleteDoc(doc(collectionInstance, id));
    window.location.reload();
  }
}
