const actionTypes = require('../action-types/action-types');
const initState = {
  orderInProgress: false,
  editInProgress: false,
  currentOrderItems: []
};
const checkCurrentOrderStatus = async state => {
  const orderStatus = await fetch('../../checkCurrentOrders.php').then(res => res.json());
  if(orderStatus === ""){
    return {...state};
  }
  return {...state, orderInProgress: true};
}
const editOrderHandler = state => ({
  ...state,
  editInProgress: true,
  orderInProgress: false
});
const completeOrderHandler = state => ({
  ...state
});
const orderReducer = (state = initState, action) => {
  switch(action.type){
    case actionTypes.checkCurrentOrders: return checkCurrentOrderStatus(state);
    case actionTypes.editOrder: return editOrderHandler(state);
    case actionTypes.completeOrder: return completeOrderHandler(state);
    default: return state;
  }
}
module.exports = orderReducer;