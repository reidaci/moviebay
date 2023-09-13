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

  constructor(private movieservice: MoviesService) {}
  ngOnInit() {
    this.movieservice.getMovies().subscribe(
      (res: any) => {
        console.log(res);
        this.allMovies = res;
      },
      (err: any) => console.log(err)
    );
    console.log('nga lista', this.allMovies);
  }
}
