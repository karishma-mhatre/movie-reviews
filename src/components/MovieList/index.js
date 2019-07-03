import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Movie from '../Movie';
import { fetchMovies } from '../../actions';

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;

        window.onscroll = this.handleScroll;
    }

    handleScroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            && this.props.movies.length !== +this.props.totalResults) {
                this.props.dispatch(fetchMovies(this.props.searchString, ++this.currentPage));
        }
    }, 250)

    render() {
        let { movies, error, totalResults, isLoadingMovies } = this.props;
        console.log(movies);
        return (
            <div >
                {
                    movies.map((movie, index) => {
                        return <Movie key={index} poster={movie.Poster} id={movie.imdbID}></Movie>
                    })
                }
                {
                    error && 
                    <div>{error}</div>
                }
                {
                    movies.length > 0 && movies.length === +totalResults &&
                    <div>Thats all we have!</div>
                }
                {
                    isLoadingMovies && 
                    <div>Loading...</div>
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