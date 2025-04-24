import { getFirestore } from '@angular/fire/firestore';
import { Category } from './../../../core/models/category';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { MoviesService } from './../../../core/services/movies.service';
import { Component } from '@angular/core';

import {
  getDatabase,
  ref,
  onValue,
  // AngularFireDatabase,
} from '@angular/fire/database';
import { Router } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
} from '@angular/fire/compat/database';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  // allMovies = this.movieservice.getMovies();
  isLoading = true;
  allMovies!: any;
  filterMovies!: Array<Object>;
  inputValue!: any;
  bestMovies: any;
  searchedMovies: any;
  page: any = 1;
  addToFavoritesMessageVisible = false;
  selectedCategory: string = '';
  categories: any = [
    'All movies',
    'Top Rated',
    'Drama',
    'Crime',
    'Action',
    'Adventure',
    'Biography',
    'Romance',
    'History',
    'Fantasy',
    'Sci-Fi',
    'Music',
    'Horror',
    'Thriller',
  ];
  constructor(
    private movieservice: MoviesService,
    private firebase: FirebaseService,
    private router: Router,
    private agdb: AngularFireDatabase
  ) {}
  ngOnInit() {
    this.movieservice.getMovies().subscribe(
      (res: object) => {

        // this.allMovies = res;
        this.filterMovies = Object.entries(res).map(([key, value]) => ({
          key,
          ...value,
        }));
        this.allMovies = this.filterMovies;

        // this.filterMovies = res;


      },
      (err: any) => console.log(err)
    );
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  addToFav(i: any) {
    console.log(i);
    this.firebase.addToFavorite(i);
    this.addToFavoritesMessageVisible = true;
    setTimeout(() => {
      this.addToFavoritesMessageVisible = false;
    }, 3000);
  }

  logOut() {
    localStorage.removeItem('userId');
  }

  filterCategory(category: string) {
    this.allMovies = this.filterMovies;
    this.selectedCategory = category;
    const filteredResult: any[] = [];
    if (category === 'Top Rated') {
      this.allMovies.forEach((element: any) => {
        if (element.rating >= '9.0') {
          filteredResult.push(element);
          this.allMovies = filteredResult;
        }
      });
    } else {
      this.allMovies.forEach((element: any) => {
        if (element.genre.includes(category)) {
          filteredResult.push(element);
          this.allMovies = filteredResult;
        }
      });
      console.log(filteredResult);
    }
  }

  search() {
    const searchedResults: [] = [];

    if (this.inputValue == '') {
      this.allMovies = this.filterMovies;
    } else {
      this.allMovies = this.filterMovies;
      this.searchedMovies = this.allMovies;
      this.allMovies = this.searchedMovies.filter((moviesFound: any) =>
        moviesFound?.title.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    }
  }

  getDetails(i: any) {
    console.log(i);
    this.router.navigate(['/movies/movie-details', i.id], {
      queryParams: {
        description: i.description,
        genre: i.genre,
        id: i.id,
        image: i.image,
        rank: i.rank,
        rating: i.rating,
        thumbnail: i.thumbnail,
        title: i.title,
        year: i.year,
      },
    });

    //   console.log(this.agdb.object(i));

    //   this.router.navigate(['/movies/' + i + '/movie-details']);
    //   const db = getDatabase();
    //   const starCountRef = ref(db);
    //   // debugger;
    //   console.log(starCountRef);
    //   onValue(starCountRef, (snapshot) => {
    //     console.log(snapshot);
    //     debugger;
    //     const data = snapshot.val();
    //     console.log(data);
    //   });
    //   //     this.movieservice.getMovieDetails(0).subscribe(
    //   //   (res: any) => {
    //   //     debugger;
    //   //   },
    //   //   (err: any) => console.log(err)
    //   // );
  }
}
