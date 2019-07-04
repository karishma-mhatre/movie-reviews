import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Movie from '../Movie';
import { fetchMovies } from '../../actions';
import './movie-list.scss';

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;

        window.onscroll = this.handleScroll;
    }

    handleScroll = debounce(() => {
        console.log("onscroll");
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            && this.props.movies.length !== +this.props.totalResults) {
                console.log("onscroll inside");
                this.props.dispatch(fetchMovies(this.props.searchString, ++this.currentPage));
        }
    }, 200)

    render() {
        let { movies, error, totalResults, isLoadingMovies } = this.props;
        console.log(isLoadingMovies);
        return (
            <div className="movie-list">
                {
                    movies.map((movie, index) => {
                        return <Movie key={index} poster={movie.Poster} id={movie.imdbID}></Movie>
                    })
                }
                {
                    error && 
                    <div className="message">{error}</div>
                }
                {
                    movies.length > 0 && movies.length === +totalResults &&
                    <div className="message">Thats all we have!</div>
                }
                {
                    isLoadingMovies && 
                    <div className="message">Loading...</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    searchString: state.movieList.searchString,
    movies: state.movieList.movies,
    totalResults: state.movieList.totalResults,
    error: state.movieList.error,
    isLoadingMovies: state.movieList.isLoadingMovies
})

export default connect(mapStateToProps)(MovieList);