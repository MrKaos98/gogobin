const store = require('../../store/store-index');
const { addCartItem } = require('../../store/action-creators/action-creators');

const itemModalSection = {
  init: async function(){
    this.cacheDom();
    this.bindEvents();
    this.jsonObj = await fetch('../homepage/gogobin.json').then(res => res.json());
  },
  cacheDom: function(){
    this.itemModalWindow = document.getElementById("item-modal-window");
    this.perImageContainers = document.getElementsByClassName("per-image-container");
    this.itemModalWrapper = document.getElementsByClassName("item-modal-wrapper")[0];
    this.itemModalHeading = document.querySelector(".item-modal-wrapper h3");
    this.itemModalCloseBtn = document.getElementById("item-modal-close-btn");
    this.cartBadge = document.getElementById("cart-badge");
    this.modalImage = document.getElementsByClassName("item-modal-image")[0];
    this.itemAmount = document.querySelector("[type='number']");
    this.amountBtns = document.querySelectorAll("#amount-btns > button");
    this.itemPrice = document.getElementById("item-price");
    this.addToCartBtn = document.getElementById("add-to-cart-btn");
    this.loggedInElement = document.getElementById("logged-in");
    this.currOrderStatus;
  },
  bindEvents: function(){
    [...this.perImageContainers].forEach((image, index) => {
      image.addEventListener("click", this.displayItemModal.bind(this, index));
    });
    [...this.amountBtns].forEach((btn, index) => {
      btn.addEventListener("click", this.changeAmountHandler.bind(this, index));
    });
    this.itemModalCloseBtn.addEventListener("click", this.closeItemModal.bind(this));
    this.addToCartBtn.addEventListener("click", this.addToCartHandler.bind(this));
    this.itemModalWindow.addEventListener("click", this.closeItemModal.bind(this));
  },
  changeAmountHandler(index){
    if(index === 0){
      this.itemAmount.value = parseInt(this.itemAmount.value, 10) + 1;
    } else if (index !== 0 && this.itemAmount.value > 1) {
      this.itemAmount.value = parseInt(this.itemAmount.value, 10) - 1;
    } else if (index !== 0 && this.itemAmount.value == 1){
      return;
    }
  },
  addToCartHandler: function(){
    const itemName = this.addToCartBtn.getAttribute('data-name');
    const itemIndex = this.addToCartBtn.getAttribute('data-index');
    const itemImage = this.addToCartBtn.getAttribute('data-img');
    const itemQuantity = parseInt(this.itemAmount.value, 10);
    store.dispatch(addCartItem(itemName, itemImage, itemIndex, itemQuantity));
    this.closeItemModal();
    this.updateCartBadge();
  },
  updateCartBadge: function(){
    const cartItemLength = store.getState().cart.cartItems.length;
    this.cartBadge.textContent = cartItemLength;
    if(cartItemLength > 0){
      this.cartBadge.style.display = "block";
    } else {
      this.cartBadge.style.display = "none";
    }
  },
  displayItemModal: function(index){
    this.itemModalWindow.style.display = "block";
    this.itemModalWrapper.style.display = "block";
    this.itemModalWrapper.setAttribute("data-for", "item-" + (index + 1) + "-window");
    this.itemModalHeading.textContent = this.jsonObj.itemNames[index];
    this.modalImage.style.backgroundImage = `url(../img/image${(index + 1)}.jpg)`;
    this.modalImage.setAttribute("alt", this.jsonObj.itemNames[index]);
    this.modalImage.setAttribute("data", (index + 1));
    this.modalImage.setAttribute("data-src", (index + 1));
    this.addToCartBtn.setAttribute("data-index", index);
    this.addToCartBtn.setAttribute('data-name', this.jsonObj.itemNames[index]);
    this.addToCartBtn.setAttribute('data-img', `../img/image${(index + 1)}.jpg`);
  },
  closeItemModal: function(){
    this.itemModalWrapper.style.display = "none";
    this.itemModalWindow.style.display = "none";
    this.itemAmount.value = 1;
  }
}

module.exports = itemModalSection;