import { createStore, applyMiddleware, combineReducers } from 'redux';
import User from '../store/reducers/User';
// import themeReducer from '../reducers/themeReducer'
// import countReducer from '../reducers/countReducer'
// import crudReducer from '../reducers/crudReducer'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
}


const rootReducer = combineReducers({
  User
  // themeReducer,
  // countReducer,
  // crudReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));



export default store;