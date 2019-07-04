export const REQUEST_MOVIES = "REQUEST_MOVIES";
export const REQUEST_MOVIE_DETAILS = "REQUEST_MOVIE_DETAILS";
export const RECEIVE_MOVIES = "RECEIVE_MOVIES";
export const RECEIVE_MOVIE_DETAILS = "RECEIVE_MOVIE_DETAILS";
export const RATE_MOVIE = "RATE_MOVIE";
const API_KEY = "edd80908";

export const requestMovies = (searchString) => ({
    type: REQUEST_MOVIES,
    searchString
});

export const receiveMovies = (response) => ({
    type: RECEIVE_MOVIES,
    response
});

export const requestMovieDetails = (id) => ({
    type: REQUEST_MOVIE_DETAILS,
    id
});

export const receiveMovieDetails = (response) => ({
    type: RECEIVE_MOVIE_DETAILS,
    response
});

export const rateMovie = (id, rating) => ({
    type: RATE_MOVIE,
    id,
    rating
});

export const fetchMovies = (searchString, pageNumber) => (dispatch) => {
    dispatch(requestMovies(searchString))
    return fetch(`http://www.omdbapi.com/?s=${searchString}&type=movie&page=${pageNumber}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(json => dispatch(receiveMovies(json)))
}

export const fetchMovieDetails = (id) => (dispatch) => {
    dispatch(requestMovieDetails(id))
    return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(json => dispatch(receiveMovieDetails(json)))
}