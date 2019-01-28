const cartModalObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.foodItemIds = "";
    this.itemNames = "";
    if(headerObj.editInProgressVal == "yes" || headerObj.sameOrderInProgressVal == "yes"){
      this.addCartImgSrcsToArray();
    }
  },
  cacheDom: function(){
    this.cartImgSrcArr = [];
    this.placeOrderBtn = document.getElementById("place-order-btn");
    this.noGroceriesAdded = document.getElementById("no-groceries-added");
    this.cartItemsWrap = document.getElementById("cart-items-wrap");
    this.cartItemTemplate = document.getElementsByClassName("cart-item")[0];
    this.cartItemHeading = document.getElementsByClassName("cart-item-heading")[0];
    this.cartImage = document.getElementsByClassName("cart-image")[0];
    this.editBtnTemplate = document.getElementsByClassName("edit-item-btn")[0];
    this.removeBtnTemplate = document.getElementsByClassName("remove-item-btn")[0];
    this.locationTimeContainer = document.getElementById("location-and-time-container");
    this.locationTimeChildren = document.querySelectorAll("#location-and-time-container > div");
    this.cartLocation = document.getElementById("cart-location");
    this.cartStoreName = document.getElementById("cart-store-name");
    this.cartStoreAddress = document.getElementById("cart-store-address");
    this.cartDeliveryTime = document.getElementById("cart-delivery-time");
  },
  bindEvents: function(){
    this.placeOrderBtn.addEventListener("click", this.placeOrderHandler.bind(this));
    document.addEventListener("click", function(e){
      if(e.target.getAttribute("class") === "edit-item-btn"){
        this.editItemHandler(e);
      } else if (e.target.getAttribute("class") === "remove-item-btn"){
        this.removeItemHandler(e);
      }
    }.bind(this));
  },
  cacheItemDetails: function(index){
    this.placeOrderBtn.style.display = "block";
    this.noGroceriesAdded.style.display = "none";
    this.setNewCartItem(index);
  },
  setNewCartItem(index){
    this.cartItemTemplate.setAttribute("id", `item-${index + 1}-wrap`);
    this.cartImage.setAttribute("src", `../img/image${index + 1}.jpg`);
    this.editBtnTemplate.setAttribute("data-target", `image${index + 1}`);
    this.removeBtnTemplate.setAttribute("data-target", `image${index + 1}`);
    let newCartItem = this.cartItemTemplate.cloneNode(true);
    this.cartItemsWrap.appendChild(newCartItem);
  },
  editItemHandler(e){
    let target = e.target.parentElement.parentElement
    console.log(target);
  },
  removeItemHandler: function(e){
    let target = e.target.parentElement.parentElement
    target.parentElement.removeChild(target);
    headerObj.decrementCartBadgeNum();
    // let $thisBtn = $(event.target);
    // let $thisFoodRow = $thisBtn.parents(".cart-row");
    // let $modalImageData = $thisFoodRow.find("input:image").attr("data");
    // let $modalImageSrc = $thisFoodRow.find("input:image").attr("src");
    // let $modalItemName = $thisFoodRow.find("input:image").attr("alt");
    // let imgSrc = "" + $modalImageSrc;
    // let imgData = "" + $modalImageData;
    // let itemName = "" + $modalItemName;
    // let $nextLineDivider = $(event.target).parents(".cart-row").next(".line-divider");
    // let $hiddenInput = $("#form-inner").find("input[data='" + imgData + "']");
    // this.removeCartRowAndInput($thisFoodRow, $nextLineDivider, $hiddenInput);
    // this.removeImgSrcFromArray($modalImageSrc);
    // this.removeItemName(itemName);
    // this.removeFoodItemId(imgData, this.foodItemIds);
  },
  displayFromCart: function(imgData){
    itemModalObj.displayItemModal(imgData - 1);
  },
  removeItemName: function(itemName){
    var tempNames = this.itemNames.replace(itemName + " ", "");
    this.itemNames = tempNames.replace("  ", " ");
  },
  removeFoodItemId(imgData){
    var tempIds = this.foodItemIds.replace(imgData + " ", "");
    this.foodItemIds = tempIds.replace("  ", " ");
  },
  removeImgSrcFromArray: function(imgSrc){
    var index = this.cartImgSrcArr.indexOf(imgSrc);
    this.cartImgSrcArr.splice(index, 1);
  },
  placeOrderHandler: function(){
    itemModalObj.checkCurrOrders();
    setTimeout(() => {
      this.cartImgSrcArr = [];
      if(itemModalObj.currOrderStatus == "order in progress"){
        alert("You have an order in progress");
      } else if(headerObj.editInProgressVal != "yes" && headerObj.sameOrderInProgressVal != "yes"){
        this.addValuesToCartLocation();
      } else if (headerObj.editInProgressVal == "yes" || headerObj.sameOrderInProgressVal == "yes"){
        this.getItemIdsAndNames();
      }
      this.setFinalIdsAndNames(this.foodItemIds, this.itemNames);
      this.hiddenSubmit.click();
    }, 500);
  },
  setFinalIdsAndNames: function(foodIds, itemNames){
    var foodIdsInput = document.querySelector("input[name='food_ids'");
    var itemNamesInput = document.querySelector("input[name='item_names'");
    foodIdsInput.setAttribute("value", foodIds);
    itemNamesInput.setAttribute("value", itemNames);
  },
  addValuesToCartLocation: function(){
    $("input[name='store_city']").attr("value", mapSectionObj.selectedCity);
    $("input[name='store_address']").attr("value", mapSectionObj.selectedStoreAddress);
    $("input[name='store_name']").attr("value", mapSectionObj.selectedStore);
    $("input[name='delivery_time']").attr("value", mapSectionObj.selectedTime);
  },
  addCartImgSrcsToArray: function(){
    for(let i = 0; i < this.cartImages.length; i++){
      this.cartImgSrcArr.push(this.cartImages[i].getAttribute("src"));
    }
  },
  checkImgSrcArr: function(imgSrc, index){
    if(this.cartImgSrcArr.indexOf(imgSrc) > -1){
      alert("Item in cart. Make changes in cart");
    } else {
      itemModalObj.addItemDataHandler(index);
      this.cartImgSrcArr.push(imgSrc);
      $("body").removeClass("stop-scrolling");
    }
  },
  updateCartLocationAndTime: function(){
    this.resetLocationTimeChildren();
    this.locationTimeContainer.style.display = "grid";
    this.cartLocation.textContent = mapSectionObj.selectedCity.textContent;
    this.cartStoreName.textContent = mapSectionObj.selectedStore;
    this.cartStoreAddress.textContent = mapSectionObj.selectedStoreAddress;
    this.cartDeliveryTime.textContent = mapSectionObj.selectedTime;
    $("input[name='store_address']").val(mapSectionObj.selectedStoreAddress);
    $("input[name='store_name']").val(mapSectionObj.selectedStore);
    $("input[name='store_city']").val(mapSectionObj.selectedCity.textContent);
    $("input[name='delivery_time']").val(mapSectionObj.selectedTime);  
  },
  resetLocationTimeChildren: function(){
    for(let div of this.locationTimeChildren){
      div.textContent = "";
    }
  }
}
cartModalObj.init();