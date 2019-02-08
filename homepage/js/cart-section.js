const { removeCartItem } = require('../../store/action-creators/action-creators');
const store = require('../../store/store-index');

const cartSection = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.shoppingCart = document.getElementById("shopping-cart");
    this.cartWindow = document.getElementById("cart-window");
    this.cartWrap = document.getElementById("cart-wrap");
    this.closeCartBtn = document.getElementById("close-cart-btn");
    this.placeOrderBtn = document.getElementById("place-order-btn");
    this.noGroceriesAdded = document.getElementById("no-groceries-added");
    this.cartItemsWrap = document.getElementById("cart-items-wrap");
    this.cartItemTemplate = document.getElementsByClassName("cart-item")[0];
    this.cartItemHeading = document.getElementsByClassName("cart-item-heading")[0];
    this.cartImage = document.getElementsByClassName("cart-image")[0];
    this.cartBadge = document.getElementById("cart-badge");
    this.editBtnTemplate = document.getElementsByClassName("edit-item-btn")[0];
    this.removeBtnTemplate = document.getElementsByClassName("remove-item-btn")[0];
    this.locationTimeContainer = document.getElementById("location-and-time-container");
    this.cartLocation = document.getElementById("cart-location");
    this.cartStoreName = document.getElementById("cart-store-name");
    this.cartStoreAddress = document.getElementById("cart-store-address");
    this.cartDeliveryTime = document.getElementById("cart-delivery-time");
    this.cartCalculateWrap = document.getElementById('cart-calculate-wrap');
    this.itemsTotal = document.getElementById('items-total');
    this.deliveryFee = document.getElementById('delivery-fee');
    this.cpmFee = document.getElementById('cpm-fee');
    this.cartTotal = document.getElementById('cart-total');
  },
  bindEvents: function(){
    this.shoppingCart.addEventListener('click', this.showCartHandler.bind(this));
    this.placeOrderBtn.addEventListener("click", this.placeOrderHandler.bind(this));
    this.cartWindow.addEventListener('click', this.hideCartHandler.bind(this));
    this.closeCartBtn.addEventListener('click', this.hideCartHandler.bind(this));
    document.addEventListener("click", function(e){
      if(e.target.getAttribute("class") === "edit-item-btn"){
        this.editItemHandler(e);
      } else if (e.target.getAttribute("class") === "remove-item-btn"){
        this.removeItemHandler(e);
      }
    }.bind(this));
  },
  showCartHandler: function(){
    this.cartWindow.style.display = "block";
    this.cartWrap.style.display = "block";
    this.closeCartBtn.style.display = "block";
    this.loadCartItems();
  },
  hideCartHandler: function(){
    this.cartWindow.style.display = "none";
    this.cartWrap.style.display = "none";
    this.closeCartBtn.style.display = "none";
  },
  //updated cart items are always loaded to display when cart is displayed
  //loop through cart items array in store and render cart item from template
  loadCartItems: function(){
    this.cartItemsWrap.innerHTML = "";
    const cartItemObjs = store.getState().cart.cartItems;
    if(cartItemObjs.length > 0){
      this.placeOrderBtn.style.display = "block";
      this.noGroceriesAdded.style.display = "none";
      cartItemObjs.forEach(item => {
        const rowItem = this.cartItemTemplate.cloneNode(true);
        rowItem.style.display = "block";
        rowItem.classList.add('real-cart-item');
        rowItem.children[0].textContent = item.name;
        rowItem.children[1].setAttribute('src', item.image);
        rowItem.children[1].setAttribute('alt', item.name);
        rowItem.children[2].children[2].textContent = item.quantity;
        rowItem.children[2].children[3].textContent = `$${item.quantity * 1.99}`;
        rowItem.children[3].children[1].setAttribute('item-index', item.index);
        this.cartItemsWrap.appendChild(rowItem);
      });
    }
    this.loadLocationInfo();
  },
  loadLocationInfo: function(){
    const showLocationAndTime = store.getState().cart.showLocationAndTime;
    if(showLocationAndTime){
      this.locationTimeContainer.style.display = "block";
    } else {
      this.locationTimeContainer.style.display = "none";
    }
    const locationAndTimeObj = store.getState().cart.locationAndTime;
    this.locationTimeContainer.children[0].textContent = locationAndTimeObj.store;
    this.locationTimeContainer.children[1].textContent = locationAndTimeObj.address;
    this.locationTimeContainer.children[2].textContent = locationAndTimeObj.city;
    this.locationTimeContainer.children[3].textContent = locationAndTimeObj.delivery;
    this.showCarCalculationsWrap();
  },
  showCarCalculationsWrap() {
    const showCartCalculations = store.getState().cart.showCartCalculations;
    if(showCartCalculations){
      this.cartCalculateWrap.style.display = "block";
    } else {
      this.cartCalculateWrap.style.display = "none";
    }
    this.loadCartCalculations();
  },
  loadCartCalculations() {
    this.cartItemTotals = document.getElementsByClassName('cart-item-total');
    const cartItemArr = [...this.cartItemTotals].slice(1);
    this.itemSum = cartItemArr.map(cost => cost.textContent).reduce((accum, cost) => {
      return accum + parseFloat(cost.replace('$', ''));
    }, 0);
    this.itemsTotal.textContent = `$${this.itemSum}`;
    this.loadCartTotal();
  },
  loadCartTotal() {
    const deliveryFeeNum = parseFloat(this.deliveryFee.textContent.replace('$', ''));
    const cpmFeeNum = parseFloat(this.cpmFee.textContent.replace('$', ''));
    this.cartTotal.textContent = `$${deliveryFeeNum + cpmFeeNum + this.itemSum}`;
  },
  //opens up the item modal to update the quantity
  editItemHandler(e){
    let target = e.target.parentElement.parentElement
    console.log(target);
  },
  removeItemHandler: function(e){
    const itemIndex = e.target.getAttribute('item-index');
    store.dispatch(removeCartItem(itemIndex));
    this.hideCartHandler();
    this.updateCartBadge();
    this.removeCartItem(e);
  },
  updateCartBadge: function(){
    const cartItemsLength = store.getState().cart.cartItems.length;
    this.cartBadge.textContent = cartItemsLength;
    if(cartItemsLength > 0){
      this.cartBadge.style.display = "block";
      this.noGroceriesAdded.style.display = "none";
      this.placeOrderBtn.style.display = "block";
    } else {
      this.cartBadge.style.display = "none";
      this.noGroceriesAdded.style.display = "block";
      this.placeOrderBtn.style.display = "none";
    }
  },
  removeCartItem: function(e){
    const rowItem = e.target.parentElement.parentElement;
    rowItem.remove();
  },
  placeOrderHandler: function(){
    if(store.getState().order.orderInProgress && store.getState().order.editInProgress === false){
      alert('You already have an order in progress');
    } else if (store.getState().order.editInProgress && store.getState().order.orderInProgress === false){
      //get all cart item ids and then
      //this.updateOrderItemIds()
      //store.dispatch(updateOrderItemIds)
    } else {
      //get all cart item ids and then
      //this.updateOrderItemIds()
      //store.dispatch(updateOrderItemIds)
    }
  }
}
module.exports = cartSection;