import { Component } from '@angular/core';
import {
  Database,
  set,
  ref,
  update,
  getDatabase,
  remove,
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
  rank: number = 0; // Initialize with default value
  title: string = '';
  description: string = '';
  image: string = '';
  genre: string = '';
  thumbnail: string = '';
  rating: string = '';
  id: string = '';
  year: number = 0; // Initialize with default value
  movieIdToDelete: string = '';
  usersList: any[] = [];

  constructor(
    public database: Database,
    private auth: Auth,
    private myService: FirebaseService,
    private firebase: Firestore
  ) {
    this.getUsers();
  }

  addMovie() {
    const db = getDatabase();
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

    set(ref(db, '/movies/' + this.id), movieData).then(() => {
      console.log('Movie added to the database.'); // You can add error handling as needed
    });
  }
  removeMovie(id: string) {
    const db = getDatabase();

    // Use the 'remove' method to delete a movie by its ID
    remove(ref(db, '/movies/' + id))
      .then(() => {
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
          debugger;
          // return { ...item.data(), id: item.id };
          this.usersList.push({ ...item.data(), id: item.id });
          console.log(this.usersList);
        })
      );
    });
  }
}
