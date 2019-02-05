const redux = require('redux');
const loginReducer = require('./reducers/login-reducer');
const orderReducer = require('./reducers/order-reducer');
const cartReducer = require('./reducers/cart-reducer');
const rootReducer = redux.combineReducers({
  login: loginReducer,
  order: orderReducer,
  cart: cartReducer
});
const store = redux.createStore(rootReducer);
module.exports = store;