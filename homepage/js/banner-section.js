(function(){
  cacheAndBindEventHandlers();
  function cacheAndBindEventHandlers(){
    const sectionOffset = document.getElementById("user-location-section").offsetTop - 90;
    const bannerBtns = document.getElementsByClassName("banner-btn");
    [...bannerBtns].forEach(btn => btn.addEventListener("click", scrollToMapSection.bind(null, sectionOffset)));
  }
  function scrollToMapSection(sectionOffset){
    window.scroll({
      top: sectionOffset,
      left: 0,
      behavior: "smooth"
    });
  }
})();