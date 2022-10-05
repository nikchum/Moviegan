import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const KEY = 'a1b67e21d001fd0b301e3f4d42b48ca7';

export function getTrandingMovies() {
  return axios.get(`/trending/movie/week?api_key=${KEY}`);
}

export function getMoviesByQuery(query) {
  return axios.get(
    `/search/movie?api_key=${KEY}&query=${query}&page=1&include_adult=false`
  );
}

export function getMovieById(id) {
  return axios.get(`/movie/${id}?api_key=${KEY}`);
}

export function getMovieCastById(id) {
  return axios.get(`/movie/${id}/credits?api_key=${KEY}`);
}

export function getMovieReviewsById(id) {
  return axios.get(`/movie/${id}/reviews?api_key=${KEY}`);
}
