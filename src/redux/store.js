import {createStore, applyMiddleware} from 'redux';

// Import the `thunk` middleware
import thunk from 'redux-thunk';

// Import reducers
import reducers from './reducers';

export default createStore(reducers, applyMiddleware(thunk));