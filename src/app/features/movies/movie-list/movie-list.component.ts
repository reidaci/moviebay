import { getFirestore } from '@angular/fire/firestore';
import { Category } from './../../../core/models/category';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { MoviesService } from './../../../core/services/movies.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  // allMovies = this.movieservice.getMovies();
  allMovies: any;
  filterMovies: any;
  inputValue!: any;
  bestMovies: any;
  searchedMovies: any;
  page: any = 1;
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
    private firebase: FirebaseService
  ) {}
  ngOnInit() {
    this.movieservice.getMovies().subscribe(
      (res: any) => {
        this.allMovies = res;
        this.filterMovies = res;
        console.log(this.allMovies.length);
      },
      (err: any) => console.log(err)
    );
  }
  

  addToFav(i: any) {
    console.log(i);
    this.firebase.addToFavorite(i);
  }

  logOut() {
    localStorage.removeItem('userId');
  }

  filterCategory(category: string) {
    this.allMovies = this.filterMovies;
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
}
