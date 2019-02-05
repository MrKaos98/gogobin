const actionTypes = require('../action-types/action-types');
const initState = {
  newMessagesFound: false
};
const checkNewMessagesHandler = async state => {
  const result = await fetch('../../includes/checkForNewMsgs.php').then(res => res.json());
  if(result === ""){
    return {...state, newMessagesFound: false};
  }
  return {...state, newMessagesFound: true};
}
const convosReducer = (state = initState, action) => {
  switch(action.type){
    case actionTypes.checkNewMessages: return checkNewMessagesHandler(state);
    default: return state;
  }
}
module.exports = convosReducer;