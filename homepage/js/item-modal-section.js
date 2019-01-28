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
    this.checkCurrOrders();
    setTimeout(() => {
      if(headerObj.userLoggedIn.textContent == "no"){
        alert("You must log in to place an order");
      } else if(this.currOrderStatus == "order in progress") {
        alert("You have an order in progress");
      } else {
        this.modalImgSrc = this.modalImage.getAttribute("data-src");
        let index = parseInt(this.addToCartBtn.getAttribute("btn-for"), 10);
        cartModalObj.checkImgSrcArr(this.modalImgSrc, index);
      }
    }, 400);
  },
  checkCurrOrders: function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../includes/checkCurrentOrders.php", true);
    xhr.onload = function(){
      if(xhr.status == 200 || this.status == 200){
        var data = this.responseText;
        if(data){
          this.currOrderStatus = data;
        } else {
          this.currOrderStatus = "";
          return;
        }
      }
    }
    xhr.send();
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
    this.addToCartBtn.setAttribute("btn-for", index);
  },
  closeItemModal: function(){
    this.itemModalWrapper.style.display = "none";
    this.itemModalWindow.style.display = "none";
  },
  addItemDataHandler: function(index){
    this.itemId = this.modalImage.getAttribute("data") - 1;
    this.getImageInfo(index);
  },
  getImageInfo: function(index){
    this.itemImageSrc = this.modalImage.getAttribute("src");
    this.itemImageData = this.modalImage.getAttribute("data");
    this.itemImageName = this.modalImage.getAttribute("alt");
    this.imageHeading = this.itemModalHeading.textContent;
    headerObj.incrementBadgeNum();
    this.showItemInCart(index);
  },
  showItemInCart: function(index){
    cartModalObj.cacheItemDetails(index);
    this.itemModalWindow.style.display = "none";
    this.itemModalWrapper.style.display = "none";
  }
}

module.exports = itemModalSection;