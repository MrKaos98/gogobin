const store = require('../../store/store-index');
const { toggleLogin } = require('../../store/action-creators/action-creators');

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
    store.dispatch(toggleLogin(true));
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

module.exports = headerObj;