import { REQUEST_MOVIES, REQUEST_MOVIE_DETAILS, RECEIVE_MOVIES, RECEIVE_MOVIE_DETAILS, RATE_MOVIE } from '../actions';
import { combineReducers } from 'redux';

let movieListState = {
    searchString: "",
    totalResults: 0,
    movies: [],
    isLoadingMovies: false,
    error: ""
}

const movieList = (state = movieListState, action) => {
    switch(action.type) {
        case REQUEST_MOVIES:
            if(state.searchString !== action.searchString) {
                return {
                    ...state,
                    isLoadingMovies: true,
                    movies: [],
                    searchString: action.searchString
                }
            }

            return {
                ...state,
                isLoadingMovies: true,
                searchString: action.searchString
            }

        case RECEIVE_MOVIES:    
            if(action.response.Response === "True") {
                return {
                    ...state,
                    totalResults: action.response.totalResults,
                    isLoadingMovies: false,
                    error: "",
                    movies: [
                        ...state.movies,
                        ...action.response.Search
                    ]
                }
            }

            return {
                ...state,
                isLoadingMovies: false,
                error: action.response.Error
            }

        default: 
            return state;
    }
}

const movieDetails = (state = {}, action) => {
    switch(action.type) {
        case REQUEST_MOVIE_DETAILS:
            return {
                ...state,
                [action.id]: {
                    isLoadingDetails: true
                }
            }
        case RECEIVE_MOVIE_DETAILS:
            return {
                ...state,
                [action.response.imdbID] : {
                    ...action.response,
                    isLoadingDetails: false,
                    MRRating: 0
                }
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({movieList, movieDetails})

export default rootReducer;

