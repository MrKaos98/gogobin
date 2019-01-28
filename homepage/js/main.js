const loginSection = require('./login-section').init();
const headerSection = require('./header-section').init();
const bannerSection = require('./banner-section').init();
const contactSection = require('./contact-section').init();
const foodSection = require('./food-section').init();
const itemModalSection = require('./item-modal-section').init();
const locationSection = require('./location-section').init();

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

window.onbeforeunload = function(){
  window.scrollTo(0,0);
}