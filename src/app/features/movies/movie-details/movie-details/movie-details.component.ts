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
  // movieId: any = '';
  description!: any;
  genre!: any;
  id!: string;
  image!: string;
  rank!: string;
  rating!: string;
  thumbnail!: string;
  title!: string;
  year!: number;
  constructor(
    private movieservice: MoviesService,
    private firebase: FirebaseService,
    private activatedRoute: ActivatedRoute
  ) {
    //s this.getDetails();
    // this.movieId = this.route.snapshot.params['id']; //.queryParamMap.get('id');
    // console.log(this.movieId);
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.description = this.activatedRoute.snapshot.queryParams['description'];
    this.year = +this.activatedRoute.snapshot.queryParams['year']; // Convert string to number using "+"
    this.genre = this.activatedRoute.snapshot.queryParams['genre'];
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.image = this.activatedRoute.snapshot.queryParams['image'];
    this.rank = this.activatedRoute.snapshot.queryParams['rank'];
    this.rating = this.activatedRoute.snapshot.queryParams['rating'];
    this.thumbnail = this.activatedRoute.snapshot.queryParams['thumbnail'];
    this.title = this.activatedRoute.snapshot.queryParams['title'];
  }
  // getDetails(i: any) {
  //   const db = getDatabase();
  //   const starCountRef = ref(db, '/' + this.movieId);
  //   console.log(starCountRef);

  //   onValue(starCountRef, (snapshot) => {
  //     console.log(snapshot);

  //     const data = snapshot.val();
  //     console.log(data.i);
  //   });

  //   /*     this.movieservice.getMovieDetails(0).subscribe(
  //     (res: any) => {
  //       debugger;
  //     },
  //     (err: any) => console.log(err)
  //   ); */
  // }
}
