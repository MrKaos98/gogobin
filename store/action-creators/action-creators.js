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
const updateLocationAndTime = (city, store, address, delivery) => ({
  type: actionTypes.updateLocationAndTime,
  val: {city, store, address, delivery}
});
module.exports = {
  toggleLogin,
  addCartItem,
  removeCartItem,
  updateLocationAndTime
};