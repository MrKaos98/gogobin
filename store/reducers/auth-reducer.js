const { userAuth } = require('../action-types/action-types');
const initState = {
  isAuth: false
};
const updateAuthStatus = (state, val) => ({...state, isAuth: val});
const authReducer = (state = initState, action) => {
  switch(action.type){
    case userAuth: return updateAuthStatus(state, action.val);
    default: return state;
  }
}

module.exports = authReducer;