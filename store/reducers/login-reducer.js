const { toggleLogin } = require('../action-types/action-types');
const initState = {
  showLoginWrap: false
};
const toggleLoginWrap = (state, val) => ({
  ...state,
  showLoginWrap: val
});
const loginReducer = (state = initState, action) => {
  switch(action.type){
    case toggleLogin: return toggleLoginWrap(state, action.val);
    default: return state;
  }
}
module.exports = loginReducer;