import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    this.http
      .get(
        'https://moviebay-71cc8-default-rtdb.europe-west1.firebasedatabase.app/.json'
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }
}
