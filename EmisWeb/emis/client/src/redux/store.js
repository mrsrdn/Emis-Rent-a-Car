import { legacy_createStore as createStore} from 'redux'
import {applyMiddleware , combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';  
import { carsReducer } from './reducers/carsReducer';
import {Provider} from 'react-redux';
import{alertsReducer} from './reducers/alertsReducer'
import { bookingsReducer } from './reducers/bookingsReducer';
const composeEnhancers = composeWithDevTools({

});

const rootReducer =combineReducers({
carsReducer,
alertsReducer,
bookingsReducer,

})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store