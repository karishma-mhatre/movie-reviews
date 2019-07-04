import React from 'react';
import './app.scss';
import {Provider} from 'react-redux';
import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Search from './components/Search';
import MovieList from './components/MovieList';
import './styles/common.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Search></Search>
        <MovieList></MovieList>
      </div>
    </Provider>
  );
}

export default App;
