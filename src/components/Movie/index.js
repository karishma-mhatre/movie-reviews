import React from 'react';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../../actions';

class Movie extends React.Component {
    getDetails = (id) => {
        if(!this.props.movie) {
            this.props.dispatch(fetchMovieDetails(id))
        }else {
            console.log(this.props.movie);
        }
    }

    render() {
        let { poster, id } = this.props
        let dummy = "https://placeimg.com/300/447/any"
        return (
            <div>
                <div onMouseOver={() => { this.getDetails(id) }}>
                    <img src={poster === "N/A" ? dummy : poster} alt={id}></img>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    movie: state.movieDetails[ownProps.id]
})
export default connect(mapStateToProps)(Movie);