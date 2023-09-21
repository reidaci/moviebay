import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { MovieListComponent } from './features/movies/movie-list/movie-list.component';
import { LoginComponent } from './features/login/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { MoviesService } from './core/services/movies.service';
import { FirebaseService } from './core/services/firebase.service';
import { FavoritesMoviesComponent } from './features/favorites/favorites-movies/favorites-movies.component';
import { AdminPageComponent } from './features/admin/admin-page/admin-page.component';
import { MovieDetailsComponent } from './features/movies/movie-details/movie-details/movie-details.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    MovieListComponent,
    LoginComponent,
    SignUpComponent,
    FavoritesMoviesComponent,
    AdminPageComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [MoviesService, FirebaseService, AngularFireDatabase],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
