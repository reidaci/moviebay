import { Movie } from './movie';

export interface Category {
  id: number;
  name: string;
  movies: Movie;
}
