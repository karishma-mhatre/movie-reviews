import React from 'react';
import { connect } from 'react-redux';
import { rateMovie } from '../../actions';
import './rating.scss';

class Rating extends React.Component {
    rate = (rating) => {
        this.props.dispatch(rateMovie(this.props.id, rating));
    }

    render() {
        let { rating, id } = this.props;
        let stars = [];

        for(let i=5; i>0; i--) {
            stars.push(
                <>
                    <input key={i} type="radio" id={"star" + i} name="rate" value={i} defaultChecked={rating <= i && rating > 0}/>
                    <label key={"label" + i} htmlFor={"star" + i} title="text" onClick={() => {this.rate(i)}} className={rating >= i && rating > 0 ? "star checked" : "star"}></label>
                </>
            )
        }
        return (
            <div>
                <div className="rate">
                    {
                        stars
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    rating: state.movieDetails[ownProps.id].MRRating
})

export default connect(mapStateToProps)(Rating);