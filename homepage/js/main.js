window.onbeforeunload = function(){
  window.scrollTo(0,0);
}
var jsonObj;
window.onload = function(){
  fetch("../homepage/gogobin.json").then(res => res.json()).then(res => jsonObj = res);
}

const headerObj = {
  init(){
    this.cacheDom();
    this.bindEvents();
    this.showBurger = true;
    this.defaultHeaderColors = true;
    this.cartItems = 0;
  },
  cacheDom: function() {
    this.header = document.getElementsByTagName("header")[0];
    this.brandLogo = document.querySelector("#brand-logo a");
    this.contactBtn = document.getElementById("contact-btn");
    this.loginBtn = document.getElementById("login-btn");
    this.vertLoginBtn = document.getElementById("vert-login-btn");
    this.loginWrapper = document.getElementById("login-wrapper");
    this.signUpAnchor = document.querySelector("#signup-btn a");
    this.signUpBg = document.querySelector("#signup-btn");
    this.burgerWrapper = document.getElementById("burger-wrapper");
    this.burgerTop = document.getElementsByClassName("burger-top")[0];
    this.burgerMiddle = document.getElementsByClassName("burger-middle")[0];
    this.burgerBottom = document.getElementsByClassName("burger-bottom")[0];
    this.userBox = document.getElementById("user-box");
    this.userBoxImg = document.getElementById("user-box-img");
    this.userBadge = document.getElementById("user-badge");
    this.userMenu = document.getElementsByClassName("user-menu")[0],
    this.verticalNav = document.getElementsByClassName("vertical-nav")[0];
    this.logoutBtn = document.getElementById("logout-btn");
    this.logoutSubmit = document.getElementById("logout-submit");
    this.userLoggedIn = document.getElementById("user-logged-in");
    this.shoppingCart = document.getElementById("shopping-cart");
    this.cartWindow = document.getElementById("cart-window");
    this.cartWrap = document.getElementById("cart-wrap");
    this.cartBadge = document.getElementById("cart-badge");
    this.closeCartBtn = document.getElementById("close-cart-btn");
    this.orderInProgress = document.getElementById("order-in-progress");
    if(this.orderInProgress) this.orderInProgressVal = this.orderInProgress.textContent;
    this.editInProgress = document.getElementById("edit-in-progress");
    if(this.editInProgress) this.editInProgressVal = this.editInProgress.textContent;
    this.sameOrderInProgress = document.getElementById("same-order-in-progress");
    if(this.sameOrderInProgress) this.sameOrderInProgressVal = this.sameOrderInProgress.textContent;
  },
  bindEvents: function() {
    window.addEventListener("resize", this.handleWidthChange.bind(this));
    window.addEventListener("scroll", this.handleScroll.bind(this));
    if(this.burgerWrapper) this.burgerWrapper.addEventListener("click", this.toggleBurger.bind(this));
    if(this.loginBtn) this.loginBtn.addEventListener("click", this.showLoginWrap.bind(this));
    if(this.vertLoginBtn) this.vertLoginBtn.addEventListener("click", this.showLoginWrap.bind(this));
    if(this.userBadge) {
      setInterval(function() {
        this.displayUserBadge();
      }.bind(this), 5000);
    }
    if(this.shoppingCart) this.shoppingCart.addEventListener("click", this.showCartModal.bind(this));
    if(this.closeCartBtn) this.closeCartBtn.addEventListener("click", this.closeCartModal.bind(this));
    if(this.userBox) this.userBox.addEventListener("click", this.handleUserBoxClick.bind(this));
    if(this.userBoxImg) this.getProfileImage();
    if(this.logoutBtn) this.logoutBtn.addEventListener("click", this.logUserOut.bind(this));
    this.cartWindow.addEventListener("click", this.closeCartModal.bind(this));
  },
  getProfileImage: function(){
    var userId = this.userBoxImg.getAttribute("data-id");
    fetch("../includes/getProfileImage.php", {
      method: "POST",
      body: "userId=" + userId,
      headers: {
        "Content-type":"application/x-www-form-urlencoded"
      }
    }).then(res => res.text()).then(function(res){
      if(res.length > 0){
        this.userBoxImg.style.backgroundImage = "" + res;
      }
    }.bind(this));
  },
  closeCartModal: function(){
    this.closeCartBtn.style.display = "none";
    this.cartWindow.style.display = "none";
    this.cartWrap.style.display = "none";
    $("body").removeClass("stop-scrolling");
  },
  showCartModal: function(){
    this.userMenu.style.display = "none";
    this.cartWindow.style.display = "block";
    this.cartWrap.style.display = "block";
    this.closeCartBtn.style.display = "block";
    $("body").addClass("stop-scrolling");
  },
  logUserOut: function(){
    this.logoutSubmit.click();
  },
  handleUserBoxClick: function(){
    if(this.userMenu.style.display != "grid"){
      this.userMenu.style.display = "grid";
      convosObj.checkForNewMsgs();
    } else {
      this.userMenu.style.display = "none";
    }
    this.displayUserBadge();
  },
  handleScroll: function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var toggleHeaderColors = (scrollTop > 0) ? true : false;
    if(toggleHeaderColors === true && this.defaultHeaderColors === true){
      this.toggleHeaderColors();
      this.defaultHeaderColors = false;
    } else if (toggleHeaderColors === false && this.defaultHeaderColors === false){
      this.resetHeaderColors();
      this.defaultHeaderColors = true;
    }
  },
  toggleHeaderColors: function(){
    this.header.classList.add("active-header");
    this.brandLogo.classList.add("active-brand-logo");
    this.contactBtn.classList.add("active-nav-item");
    if(this.loginBtn) this.loginBtn.classList.add("active-nav-item");
    if(this.signUpAnchor) this.signUpAnchor.classList.add("active-nav-item");
    if(this.signUpBg) this.signUpBg.classList.add("active-bg");
    if(this.userBox) this.userBox.classList.add("active-nav-item");
    if(this.shoppingCart) this.shoppingCart.classList.add("active-nav-item");
    if(this.burgerWrapper){
      this.burgerTop.classList.add("toggle-burger-colors");
      this.burgerMiddle.classList.add("toggle-burger-colors");
      this.burgerBottom.classList.add("toggle-burger-colors");
    }
  },
  resetHeaderColors: function(){
    this.header.classList.remove("active-header");
    this.brandLogo.classList.remove("active-brand-logo");
    this.contactBtn.classList.remove("active-nav-item");
    if(this.loginBtn) this.loginBtn.classList.remove("active-nav-item");
    if(this.signUpAnchor) this.signUpAnchor.classList.remove("active-nav-item");
    if(this.signUpBg) this.signUpBg.classList.remove("active-bg");
    if(this.userBox) this.userBox.classList.remove("active-nav-item");
    if(this.shoppingCart) this.shoppingCart.classList.remove("active-nav-item");
    if(this.burgerWrapper){
      this.burgerTop.classList.remove("toggle-burger-colors");
      this.burgerMiddle.classList.remove("toggle-burger-colors");
      this.burgerBottom.classList.remove("toggle-burger-colors");
    }
  },
  toggleBurger: function() {
    this.showBurger = false;
    this.burgerTop.classList.toggle("active-top");
    this.burgerMiddle.classList.toggle("active-middle");
    this.burgerBottom.classList.toggle("active-bottom");
    this.verticalNav.classList.toggle("show-vertical-nav");
  },
  handleWidthChange: function() {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var resetBurger = (windowWidth > 525) ? true : false;
    if(resetBurger === true && this.showBurger === false){
      this.resetBurger();
    }
  },
  resetBurger: function(){
    this.showBurger = true;
    this.burgerTop.classList.remove("active-top");
    this.burgerMiddle.classList.remove("active-middle");
    this.burgerBottom.classList.remove("active-bottom");
    this.verticalNav.classList.remove("show-vertical-nav");
  },
  displayUserBadge: function(){
    fetch("../includes/newNotisOrMsgs.php")
    .then(res => res.text()).then(function(data){
      if(data.length > 0){
        this.userBadge.style.opacity = "1";
      } else {
        this.userBadge.style.opacity = "0";
      }
    }.bind(this));
  },
  showLoginWrap: function(){
    this.loginWrapper.style.top = 0;
    loginObj.init();
    $("body").addClass("stop-scrolling");
  },
  incrementBadgeNum: function(){
    if(this.editInProgressVal == "yes"){
      this.cartBadgeNum = this.cartBadge.textContent;
      this.cartBadge.style.display = "block";
      this.cartBadge.textContent = parseInt(this.cartBadgeNum) + 1;
    } else if (this.sameOrderInProgressVal == "yes") {
      this.cartBadgeNum = this.cartBadge.textContent;
      this.cartBadge.style.display = "block";
      this.cartBadge.textContent = parseInt(this.cartBadgeNum) + 1;
    } else {
      this.cartItems++;
      this.cartBadge.textContent = this.cartItems;
      this.cartBadge.style.display = "block";
    }
  },
  decrementCartBadgeNum: function(){
    switch(true){
      case (this.editInProgressVal == "yes"):
        this.decrementEditInProgressCartBadgeNum();
        break;
      case (this.sameOrderInProgressVal == "yes"):
        this.decrementSameOrderInProgressCartBadgeNum();
        break;
      default:
        this.decrementNormalCartBadgeNum();
    }
  },
  decrementEditInProgressCartBadgeNum(){
    this.cartBadgeNum = this.cartBadge.textContent;
    this.cartBadge.textContent = this.cartBadgeNum - 1;
    if(this.cartBadge.textContent === "0") {
      this.cartBadge.style.display = "none";
      cartModalObj.placeOrderBtn.style.display = "none";
      cartModalObj.noGroceriesAdded.style.display = "block";
    }
  },
  decrementSameOrderInProgressCartBadgeNum(){
    this.cartBadgeNum = cartBadge.textContent;
    this.cartBadge.textContent = this.cartBadgeNum - 1;
    if(this.cartBadge.textContent === "0"){
      this.cartBadge.style.display = "none";
      cartModalObj.placeOrderBtn.style.display = "none";
      cartModalObj.noGroceriesAdded.style.display = "block";
    }
  },
  decrementNormalCartBadgeNum(){
    this.cartItems--;
    this.cartBadge.textContent = this.cartItems;
    if(this.cartBadge.textContent === "0"){
      this.cartBadge.style.display = "none";
      cartModalObj.placeOrderBtn.style.display = "none";
      cartModalObj.noGroceriesAdded.style.display = "block";
    }
  }
};
headerObj.init();




























const itemModalObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
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
    this.itemModalHeading.textContent = jsonObj.itemNames[index];
    this.modalImage.style.backgroundImage = `url(../img/image${(index + 1)}.jpg)`;
    this.modalImage.setAttribute("alt", jsonObj.itemNames[index]);
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
itemModalObj.init();

































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





















































const mapSectionObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.storeMarkers = [];
    this.defaultCenterZoom = {
      zoom: 5,
      center: {lat: 38.415405, lng: -120.770234}
    };
    this.userLocation; 
    this.userCoords;
    this.selectedCity;
    this.selectedStore;
    this.selectedStoreAddress;
    this.selectedTime;
  },
  cacheDom: function(){
    this.locationInputField = document.getElementById("location-input-field"),
    this.cityList = document.getElementById("city-list"),
    this.cityListItems = document.querySelectorAll("#city-list li"),
    this.mapElement = document.getElementById("map");
    this.storeLists = document.getElementsByClassName("store-list");
    this.sacramentoStoreList = document.getElementById("sacramento-store-list");
    this.sanDiegoStoreList = document.getElementById("san-diego-store-list");
    this.oaklandStoreList = document.getElementById("oakland-store-list");
    this.sanFranciscoStoreList = document.getElementById("san-francisco-store-list");
    this.fremontStoreList = document.getElementById("fremont-store-list");
    this.berkeleyStoreList = document.getElementById("berkeley-store-list");
    this.stocktonStoreList = document.getElementById("stockton-store-list");
    this.sanJoseStoreList = document.getElementById("san-jose-store-list");
    this.losAngelesStoreList = document.getElementById("los-angeles-store-list");
    this.santaBarbaraStoreList = document.getElementById("santa-barbara-store-list");
    this.riversideStoreList = document.getElementById("riverside-store-list");
    this.longBeachStoreList = document.getElementById("long-beach-store-list");
    this.anaheimStoreList = document.getElementById("anaheim-store-list");
    this.irvineStoreList = document.getElementById("irvine-store-list");
    this.deliveryTimeList = document.getElementById("delivery-time-list");
    this.deliveryTimeOptions = document.querySelectorAll("#delivery-time-list option");
    this.startOrderBtn = document.getElementById("start-order-btn");
    this.checkmark = document.getElementById("checkmark");
    this.mapSectionErrorMsg = document.getElementById("map-section-error-msg");
  },
  bindEvents: function(){
    this.locationInputField.addEventListener("click", this.toggleCityListView.bind(this));
    this.locationInputField.addEventListener("input", this.locationInputHandler.bind(this));
    for(let i = 0; i < this.cityListItems.length; i++){
      this.cityListItems[i].addEventListener("click", this.cityClickHandler.bind(this, i));
    }
    this.deliveryTimeList.addEventListener("change", this.timeChangeHandler.bind(this));
    this.startOrderBtn.addEventListener("click", this.startOrderHandler.bind(this));
  },
  cityClickHandler: function(index){
    this.deselectOtherCities(index);
    this.selectedCity = this.cityListItems[index];
    this.selectedCity.style.backgroundColor = "#0080ff";
    this.selectedCity.style.color = "#fff";
    this.cityList.style.height = "176px";
    this.getSelectedCityJsonObj();
    var selectedCityText = this.selectedCity.textContent;
    $("#city-list").animate({
        scrollTop: $("li:contains(" + selectedCityText + ")").offset().top - $("#city-list").offset().top + $("#city-list").scrollTop()
    }, "500");
    this.prepareSelectedCityStoreList(index);
  },
  deselectOtherCities: function(index){
    var counter = 0;
    var length = this.cityListItems.length;
    for(counter; counter < length; counter++){
      if(this.cityListItems[counter].style.backgroundColor === "rgb(46, 204, 113)"){
        this.cityListItems[counter].style.backgroundColor = "";
      }
    }
  },
  prepareSelectedCityStoreList: function(index){
    this.deliveryTimeList.style.display = "block";
    if(this.mapSectionErrorMsg.style.display == "block"){
      this.mapSectionErrorMsg.style.display = "none";
    }
    this.checkmark.style.left = "-100px";
    for(let i = 0; i < this.storeLists.length; i++){
      this.storeLists[i].style.display = "none";
      this.storeLists[i].options[0].selected = true;
    }
    this.showSelectedCityStoreList(index);
  },
  showSelectedCityStoreList: function(index){
    this.correctStoreArr;
    var selectedCity = this.cityListItems[index].textContent;
    for(let list of this.storeLists){
      if(list.getAttribute("data-for") === selectedCity){
        list.style.display = "block";
        list.options[0].selected = true;
        list.addEventListener("change", this.storeClickHandler.bind(this));
        this.correctStoreArr = list.getAttribute("name");
        break;
      } 
    }
  },
  storeClickHandler: function(){
    var $storeOptionText = $(".store-list option:selected").text();
    var firstP = $storeOptionText.indexOf("(");
    var lastP = $storeOptionText.indexOf(")");
    var $finalOptionText = $storeOptionText.substring(firstP + 1, lastP).toUpperCase();
    var storeAddress = $storeOptionText.substring(firstP + 1, lastP);
    this.selectedStoreAddress = storeAddress;
    this.deleteMarkers();
    this.getStoreListArr(storeAddress)
  },
  getStoreListArr: function(address){
    var correctStoreArr = this.correctStoreArr;
    var storeAddress, storeCoords, storeAddress;
    jsonObj["" + correctStoreArr].forEach((store) => {
      if(store.address.indexOf(address) > -1){
        storeAddress = store.address;
        storeCoords = store.coords;
        storeName = store.storeName;
      }
    });
    this.selectedStore = storeName;
    this.addStoreMarkers(storeName, storeCoords, storeAddress);
  },
  deleteMarkers: function(){
    for (var i = 0; i < this.storeMarkers.length; i++) {
      this.storeMarkers[i].setMap(null);
    }
    this.storeMarkers = [];
  },
  addStoreMarkers: function(storeName, storeCoords, storeAddress){
    var marker = new google.maps.Marker({
      map: this.mapInstance,
      icon: "../img/shopping-cart.png",
      animation: google.maps.Animation.DROP,
      position: storeCoords
    });
    this.storeMarkers.push(marker);

    var infoWindow = new google.maps.InfoWindow({
        content: `
          <p style='font-weight: bold'>${storeName}</p>
          <span>${storeAddress}</span><br/>
          <a href='https://maps.google.com/?q=${storeName} ${storeAddress}' target='_blank' style='color: rgb(0,128,255)'>
            <b>View on Google Maps</b>
          </a><br/>
          <span class='store-orders' onclick='showStoreOrders(this.id)' id='${storeAddress}'><b>View orders</b></span>
        `
    });
    infoWindow.open(map, marker);
    marker.addListener("click", function(){
      infoWindow.open(map, marker);
    });
  },
  getSelectedCityJsonObj: function(){
    var selectedCity = this.selectedCity.textContent;
    jsonObj.storeLocations.forEach(function(storeLocation){
      if(storeLocation.location === selectedCity){
        this.locationInputField.value = selectedCity;
        this.createMapObj(11, storeLocation.coords);
        this.addLocationMarker(storeLocation.location, storeLocation.coords);
      }
    }.bind(this)); 
  },
  createMapObj: function(zoom, coords){
    var activeCenterZoom = {
      zoom: zoom,
      center: coords
    }
    this.mapInstance = new google.maps.Map(this.mapElement, activeCenterZoom);
  },
  addLocationMarker: function(location, coords){
    var marker = new google.maps.Marker({
      map: this.mapInstance,
      animation: google.maps.Animation.DROP,
      position: coords
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "<h4>" + location + "</h4>"
    });
    marker.addListener("click", function(){
        infoWindow.open(map, marker);
    });
  },
  toggleCityListView: function(){
    if(this.cityList.style.height !== "150px"){
      this.cityList.style.height = "150px";
      this.cityList.style.overflowY = "auto";
    }
  },
  locationInputHandler: function(){
    let counter = 0;
    var cityListItemsLength = this.cityListItems.length;
    var inputValue = this.locationInputField.value.toUpperCase();
    for(counter; counter < cityListItemsLength; counter++){
      let currItem = cityListItems[i];
      if(currItem.textContent.toUpperCase().indexOf(inputValue) > -1){
          currItem.style.display = "";
      } else {
          currItem.style.display = "none";
      }
    }
  },
  timeChangeHandler: function(index){
    this.selectedTime = this.deliveryTimeList.options[this.deliveryTimeList.selectedIndex].text;
  },
  startOrderHandler: function(){
    if(this.selectedCity == undefined || this.selectedStoreAddress == undefined){
      this.mapSectionErrorMsg.style.display = "block";
    } else if (this.selectedCity != undefined && this.selectedStoreAddress != undefined){
      cartModalObj.updateCartLocationAndTime();
      this.mapSectionErrorMsg.style.display = "none";
      $("#checkmark").css({"position":"absolute", "left": "40px"});
      this.scrollToFoodArea();
    }
  },
  scrollToFoodArea: function(){
    const foodAreaOffset = document.getElementById("food-area").offsetTop - 30;
    window.scroll({
      top: foodAreaOffset,
      left: 0,
      behavior: 'smooth'
    });
  },
  initializeMap: function(){
    this.mapInstance = new google.maps.Map(this.mapElement, this.defaultCenterZoom);
  }
}
mapSectionObj.init();


/*--- Initialize Google Maps API ---*/

function initializeMap(){
  mapSectionObj.initializeMap();
}; //end of initMap function
/*--- End of Google Maps API ---*/




/*--- Open Store Orders Modal ---*/
function showStoreOrders(storeAddress){
  if(headerObj.userLoggedIn.textContent != "yes"){
    alert("Log in to view store orders");
  } else {
    var comma = storeAddress.indexOf(",");
    var trimAddress = storeAddress.substring(0, comma);
    setAddressForm(trimAddress);
  }
}
/*--- Submit Address Form so its displayed in store orders Modal ---*/
function setAddressForm(address){
  var storeAddress = document.getElementById("store-address");
  storeAddress.value = address;
  setTimeout(function(){
    submitAddressForm();
  }, 500);
  function submitAddressForm(){
    $("#address-submit-btn").click();
  }
}