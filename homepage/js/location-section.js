const store = require('../../store/store-index');

const locationSection = {
  init: async function(){
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
    this.jsonObj = await fetch('../homepage/gogobin.json').then(res => res.json());
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
    this.jsonObj["" + correctStoreArr].forEach((store) => {
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
    this.jsonObj.storeLocations.forEach(function(storeLocation){
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
  }
}

module.exports = locationSection;