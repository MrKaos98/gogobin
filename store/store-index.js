const redux = require('redux');
const loginReducer = require('./reducers/login-reducer');
const rootReducer = redux.combineReducers({
  loginReducer
});
const store = redux.createStore(rootReducer);
module.exports = store;