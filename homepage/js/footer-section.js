const footerObj = {
  init: function(){
    this.cacheAndBindEvents();
  },
  cacheAndBindEvents: function(){
    const caLocations = document.querySelectorAll("#ca-locations a");
    [...caLocations].forEach(location => {
      location.addEventListener("click", footerObj.scrollToMapSection);
    });
  },
  scrollToMapSection: function(){
    let offset = document.querySelector("#user-location-section").offset().top - 60;
    window.scroll({
      top: offset,
      left: 0,
      behavior: 'smooth'
    });
  }
}
footerObj.init();