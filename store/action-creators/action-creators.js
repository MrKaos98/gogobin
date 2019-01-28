const actionTypes = require('../action-types/action-types');
const toggleLogin = val => ({
  type: actionTypes.TOGGLE_LOGIN,
  val: val
});
module.exports = {
  toggleLogin
};