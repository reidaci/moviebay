import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from '@angular/fire/firestore';
import { deleteDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.css'],
})
export class FavoritesMoviesComponent {
  favArray: any = [];
  userUid: any;
  isLoading: boolean = true;

  constructor(private firebase: Firestore) {
    this.getFavs();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  getFavs() {
    this.userUid = localStorage.getItem('userId');
    const collectionInstance = collection(this.firebase, this.userUid);
    getDocs(collectionInstance).then((response) => {
      console.log(
        response.docs.map((item) => {
          console.log({ ...item.data(), id: item.id });
          this.favArray.push({ ...item.data(), id: item.id });
        })
      );
    });
  }

  logOut() {
    localStorage.removeItem('userId');
  }

  removeFromFav(movieId: any) {
    const collectionInstance = collection(this.firebase, this.userUid);

    // deleteDoc(collectionInstance).then((res) => {
    //   console.log(this.userUid);
    //   console.log(res);
    // });

    const db = getFirestore();
    const docRef = doc(db, this.userUid, movieId);

    deleteDoc(docRef)
      .then(() => {
        console.log('Entire Document has been deleted successfully.');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
