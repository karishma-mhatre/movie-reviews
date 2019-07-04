import React from 'react';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../../actions';
import './movie.scss';
class Movie extends React.Component {
    getDetails = (id) => {
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
                    movie && 
                    <div className="movie-details">
                        <div className="movie-details-title">{movie.Title}</div>
                        <div className="movie-details-year">{movie.Year}</div>
                        <div className="movie-details-cast">{movie.Actors}</div>
                        <div className="movie-details-imdb_rating">IMDB : {movie.imdbRating}</div>
                        <div className="movie-details-rating">{movie.MRRating}
                            <div className="rate">
                                <input type="radio" id="star5" name="rate" value="5" defaultChecked={true}/>
                                <label htmlFor="star5" title="text">5 stars</label>
                                <input type="radio" id="star4" name="rate" value="4" />
                                <label htmlFor="star4" title="text">4 stars</label>
                                <input type="radio" id="star3" name="rate" value="3" />
                                <label fohtmlForr="star3" title="text">3 stars</label>
                                <input type="radio" id="star2" name="rate" value="2" />
                                <label htmlFor="star2" title="text">2 stars</label>
                                <input type="radio" id="star1" name="rate" value="1" />
                                <label htmlFor="star1" title="text">1 star</label>
                            </div>
                        </div>
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