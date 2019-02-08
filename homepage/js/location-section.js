const store = require('../../store/store-index');
const { updateLocationAndTime } = require('../../store/action-creators/action-creators');

const locationSection = {
  async init(){
    this.cacheDom();
    this.bindEvents();
    this.storeMarkers = [];
    this.defaultCenterZoom = {
      zoom: 5,
      center: {lat: 38.415405, lng: -120.770234}
    };
    this.userLocation; 
    this.userCoords;
    this.jsonObj = await fetch('../homepage/gogobin.json').then(res => res.json());
  },
  cacheDom() {
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
    this.readyBtn = document.getElementById("ready-btn");
    this.checkmark = document.getElementById("checkmark");
    this.locationErrorMsg = document.getElementById("location-error-msg");
  },
  bindEvents() {
    this.locationInputField.addEventListener("click", this.toggleCityListView.bind(this));
    this.locationInputField.addEventListener("input", this.locationInputHandler.bind(this));
    [...this.cityListItems].forEach((city, index) => {
      city.addEventListener('click', this.cityClickHandler.bind(this, index));
    });
    this.deliveryTimeList.addEventListener("change", this.timeChangeHandler.bind(this));
    this.readyBtn.addEventListener("click", this.readyBtnClickHandler.bind(this));
  },
  cityClickHandler(index) {
    this.resetLocationError();
    this.deselectOtherCities(index);    
    this.getSelectedCityJsonObj();
    const selectedCityText = this.selectedCity.textContent;
    $("#city-list").animate({
        scrollTop: $("li:contains(" + selectedCityText + ")").offset().top - $("#city-list").offset().top + $("#city-list").scrollTop()
    }, "500");
    this.prepareSelectedCityStoreList(index);
  },
  deselectOtherCities(index) {
    [...this.cityListItems].forEach(city => {
      city.style.backgroundColor = "";
      city.style.color = "black";
    });
    this.styleSelectedCity(index);
  },
  styleSelectedCity(index) {
    this.selectedCity = this.cityListItems[index];
    this.selectedCity.style.backgroundColor = "#0080ff";
    this.selectedCity.style.color = "#fff";
    this.cityList.style.height = "176px";
  },
  prepareSelectedCityStoreList(index) {
    this.deliveryTimeList.style.display = "block";
    if(this.locationErrorMsg.style.display == "block"){
      this.locationErrorMsg.style.display = "none";
    }
    this.checkmark.style.left = "-100px";
    for(let i = 0; i < this.storeLists.length; i++){
      this.storeLists[i].style.display = "none";
      this.storeLists[i].options[0].selected = true;
    }
    this.showSelectedCityStoreList(index);
  },
  showSelectedCityStoreList(index) {
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
  //isolate name of store and short address for updating map info window and 'store' location
  storeClickHandler(e) {
    const completeStoreText = e.target.options[e.target.selectedIndex].text;
    const startBound = completeStoreText.indexOf("(");
    const endBound = completeStoreText.indexOf(")");
    this.selectedStore = completeStoreText.substring(0, startBound).trim();
    this.shortStoreAddress = completeStoreText.substring(startBound + 1, endBound);
    this.deleteMarkers();
    this.getStoreListArr()
    this.resetLocationError();
  },
  getStoreListArr() {
    var correctStoreArr = this.correctStoreArr;
    var storeAddress, storeCoords, storeAddress;
    this.jsonObj["" + correctStoreArr].forEach((store) => {
      if(store.address.indexOf(this.shortStoreAddress) > -1){
        storeAddress = store.address;
        storeCoords = store.coords;
        storeName = store.storeName;
      }
    });
    this.selectedStore = storeName;
    this.addStoreMarkers(storeName, storeCoords, storeAddress);
  },
  deleteMarkers() { 
    for (var i = 0; i < this.storeMarkers.length; i++) {
      this.storeMarkers[i].setMap(null);
    }
    this.storeMarkers = [];
  },
  addStoreMarkers(storeName, storeCoords, storeAddress) {
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
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  },
  getSelectedCityJsonObj() {
    const selectedCity = this.selectedCity.textContent;
    this.jsonObj.storeLocations.forEach(storeLocation => {
      if(storeLocation.location === selectedCity){
        this.locationInputField.value = selectedCity;
        this.createMapObj(11, storeLocation.coords);
        this.addLocationMarker(storeLocation.location, storeLocation.coords);
      }
    }); 
  },
  createMapObj(zoom, coords) {
    var activeCenterZoom = {
      zoom: zoom,
      center: coords
    }
    this.mapInstance = new google.maps.Map(this.mapElement, activeCenterZoom);
  },
  addLocationMarker(location, coords) {
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
  toggleCityListView() {
    if(this.cityList.style.height !== "150px"){
      this.cityList.style.height = "150px";
      this.cityList.style.overflowY = "auto";
    }
  },
  locationInputHandler() {
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
  timeChangeHandler() {
    this.selectedTime = (
      this.deliveryTimeList.options[this.deliveryTimeList.selectedIndex].text
    );
    this.resetLocationError();
  },
  readyBtnClickHandler() {
    switch(undefined){
      case this.selectedCity: return this.cityUnselectedHandler();
      case this.selectedStore: return this.storeUnselectedHandler();
      case this.selectedTime: return this.timeUnselectedHandler();
      default: return this.updateOrderLocation();
    }
  },
  cityUnselectedHandler() {
    this.locationErrorMsg.textContent = "Please select a city";
    this.locationErrorMsg.style.display = "block";
  },
  storeUnselectedHandler() {
    this.locationErrorMsg.textContent = "Please select a store";
    this.locationErrorMsg.style.display = "block";
  },
  timeUnselectedHandler() {
    this.locationErrorMsg.textContent = "Please select a delivery time";
    this.locationErrorMsg.style.display = "block";
  },
  resetLocationError() {
    this.locationErrorMsg.textContent = "";
    this.locationErrorMsg.style.display = "none";
    $("#checkmark").css({"position":"absolute", "left": "40px"});
  },
  updateOrderLocation() {
    store.dispatch(updateLocationAndTime(this.selectedCity.textContent, this.selectedStore, this.shortStoreAddress, this.selectedTime));
    this.scrollToFoodArea();
  },
  scrollToFoodArea() {
    const foodAreaOffset = document.getElementById("food-area").offsetTop - 30;
    window.scroll({
      top: foodAreaOffset,
      left: 0,
      behavior: 'smooth'
    });
  }
}

module.exports = locationSection;