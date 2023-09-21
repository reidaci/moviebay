import { Component } from '@angular/core';
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  movieId: any = '';
  constructor(
    private movieservice: MoviesService,
    private firebase: FirebaseService,
    private route: ActivatedRoute
  ) {
    //s this.getDetails();
    this.movieId = this.route.snapshot.params['id']; //.queryParamMap.get('id');
    console.log(this.movieId);
  }

  getDetails(i: any) {
    const db = getDatabase();
    const starCountRef = ref(db, '/' + this.movieId);
    console.log(starCountRef);

    onValue(starCountRef, (snapshot) => {
      console.log(snapshot);

      const data = snapshot.val();
      console.log(data.i);
    });

    /*     this.movieservice.getMovieDetails(0).subscribe(
      (res: any) => {
        debugger;
      },
      (err: any) => console.log(err)
    ); */
  }
}
