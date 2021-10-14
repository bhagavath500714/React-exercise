import { createStore, applyMiddleware, combineReducers } from 'redux';
// import loginReducer from '../reducers/loginReducer';
// import themeReducer from '../reducers/themeReducer'
// import countReducer from '../reducers/countReducer'
// import crudReducer from '../reducers/crudReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    // loginReducer,
    // themeReducer,
    // countReducer,
    // crudReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;