const actionTypes = require('../action-types/action-types');
const initState = {
  cartItems: [],
  showCartCalculations: false,
  showLocationAndTime: false,
  locationAndTime: {}
};
const addCartItemHandler = (state, item) => {
  const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.index === item.index);
  if(existingItemIndex > -1){
    const newCartItems = [...state.cartItems];
    newCartItems[existingItemIndex].quantity += item.quantity;
    return {...state, cartItems: newCartItems, showCartCalculations: true};
  }
  return {...state, cartItems: state.cartItems.concat(item), showCartCalculations: true};
}
const removeCartItemHandler = (state, index) => {
  const arrIndex = state.cartItems.findIndex(item => item.index === index);
  const cartItems = state.cartItems.slice(0, arrIndex).concat(state.cartItems.slice(arrIndex + 1));
  if(cartItems.length < 1){
    return {...state, cartItems, showCartCalculations: false};
  } else {
    return {...state, cartItems};
  }
}
const updateLocationAndTimeHandler = (state, obj) => ({
  ...state,
  showLocationAndTime: true,
  locationAndTime: obj
});
const cartReducer = (state = initState, action) => {
  switch(action.type){
    case actionTypes.addCartItem: return addCartItemHandler(state, action.val);
    case actionTypes.removeCartItem: return removeCartItemHandler(state, action.val);
    case actionTypes.updateLocationAndTime: return updateLocationAndTimeHandler(state, action.val);
    default: return state;
  }
}
module.exports = cartReducer;