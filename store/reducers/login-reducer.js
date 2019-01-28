const { TOGGLE_LOGIN } = require('../action-types/action-types');
const initState = {
  showLoginWrap: false
};
const toggleLoginWrap = (state, val) => ({
  showLoginWrap: val
});
const loginReducer = (state = initState, action) => {
  switch(action.type){
    case TOGGLE_LOGIN: return toggleLoginWrap(state, action.val);
    default: return state;
  }
}
module.exports = loginReducer;