import { Injectable } from '@angular/core';
const MovieURL = 'https://imdb-top-100-movies.p.rapidapi.com/';
const Options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '557f30af59mshbed5bc3a493916dp18c13ejsne90eceb95d4b',
    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
  },
};
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor() {}

  async movies() {
    try {
      const response = await fetch(MovieURL, Options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
