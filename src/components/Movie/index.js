import React from 'react';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../../actions';
import Rating from '../Rating';
import './movie.scss';
class Movie extends React.Component {
    getDetails = (id) => {
        // Action fetchMovies is dispatched only if a movie is not already fetched.
        if(!this.props.movie) {
            this.props.dispatch(fetchMovieDetails(id))
        }
    }

    render() {
        let { poster, id, movie } = this.props;
        
        let dummy = "https://placeimg.com/300/447/any"
        return (
            <div className="movie">
                <div className="movie-poster" onMouseOver={() => { this.getDetails(id) }}>
                    <img src={poster === "N/A" ? dummy : poster} alt={id}></img>
                </div>
                {
                    movie && !movie.isLoadingDetails &&
                    <div className="movie-details">
                        <div className="movie-details-title">{movie.Title}</div>
                        <div className="movie-details-year">{movie.Year}</div>
                        <div className="movie-details-cast">{movie.Actors}</div>
                        <div className="movie-details-imdb_rating">IMDB : {movie.imdbRating}</div>
                        <div className="movie-details-rating">
                            <Rating id={id}></Rating>
                        </div>
                    </div>
                }
                {
                    movie && movie.isLoadingDetails && 
                    <div className="movie-loader">
                        <span><i className="fa fa-spinner fa-spin loader"></i></span>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    movie: state.movieDetails[ownProps.id]
})
export default connect(mapStateToProps)(Movie);