import { MoviesService } from './../../../core/services/movies.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  constructor(private movieservice: MoviesService) {}
  ngOnInit(): void {
    console.log(this.getMovies());
  }

  getMovies() {
    this.movieservice.movies();
  }
}
