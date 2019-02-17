const actionTypes = require('../action-types/action-types');
const toggleLogin = val => ({
  type: actionTypes.toggleLogin,
  val: val
});
const addCartItem = (name, image, index, quantity) => ({
  type: actionTypes.addCartItem,
  val: {name, image, index, quantity}
});
const removeCartItem = index => ({
  type: actionTypes.removeCartItem,
  val: index
});
const editCartItem = index => ({
  type: actionTypes.editCartItem,
  val: index
});
const resetOpenSpecificItem = () => ({
  type: actionTypes.resetOpenSpecificItem
});
const updateUserAuth = status => ({
  type: actionTypes.userAuth,
  val: status
});
const updateLocationAndTime = (city, address, store, delivery) => ({
  type: actionTypes.updateLocationAndTime,
  val: {city, address, store, delivery}
});
const resetCart = () => ({
  type: actionTypes.resetCart
});
module.exports = {
  toggleLogin,
  addCartItem,
  removeCartItem,
  editCartItem,
  resetOpenSpecificItem,
  updateLocationAndTime,
  updateUserAuth,
  resetCart
};