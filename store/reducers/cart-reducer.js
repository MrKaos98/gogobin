const actionTypes = require('../action-types/action-types');
const initState = {
  cartItems: [],
  cartLocation: {}
};
const addCartItemHandler = (state, item) => {
  const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.index === item.index);
  if(existingItemIndex > -1){
    const newCartItems = [...state.cartItems];
    newCartItems[existingItemIndex].quantity += item.quantity;
    return {...state, cartItems: newCartItems};
  }
  return {...state, cartItems: state.cartItems.concat(item)};
}
const removeCartItemHandler = (state, index) => {
  const arrIndex = state.cartItems.findIndex(item => item.index === index);
  const cartItems = state.cartItems.slice(0, arrIndex).concat(state.cartItems.slice(arrIndex + 1));
  return {...state, cartItems};
}
const updateLocationHandler = (state, location) => ({
  ...state,
  cartLocation: location
});
const cartReducer = (state = initState, action) => {
  switch(action.type){
    case actionTypes.addCartItem: return addCartItemHandler(state, action.val);
    case actionTypes.removeCartItem: return removeCartItemHandler(state, action.val);
    case actionTypes.updateLocation: return updateLocationHandler(state, action.val);
    default: return state;
  }
}
module.exports = cartReducer;