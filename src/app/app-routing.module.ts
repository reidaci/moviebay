import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up/sign-up.component';
import { MovieListComponent } from './features/movies/movie-list/movie-list.component';
import { AuthGuard } from './core/guards/login.guard';
import { FavoritesMoviesComponent } from './features/favorites/favorites-movies/favorites-movies.component';
import { AdminPageComponent } from './features/admin/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'movielist',
    component: MovieListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favoritesmovies',
    component: FavoritesMoviesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adminpage',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
