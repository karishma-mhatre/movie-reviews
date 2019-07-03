import React from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { fetchMovies } from '../../actions';

class Search extends React.Component {
    handleChange = debounce((e) => {
        if(e.target.value) {
            this.props.dispatch(fetchMovies(e.target.value, 1));
        }
    }, 250);

    render() {
        return (
            <div className="search">
                <input type="text" onChange={(e) => {e.persist();this.handleChange(e)}} placeholder="Searh a movie"></input>
            </div>
        )
    }
}

export default connect()(Search);