const bannerSection = {
  init: function(){
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM: function(){
    this.bannerBtns = document.getElementsByClassName("banner-btn");
  },
  bindEvents: function(){
    this.bannerBtns[0].addEventListener('click', this.scrollToSection.bind(this, 'food-area'));
    this.bannerBtns[1].addEventListener('click', this.scrollToSection.bind(this, 'user-map-area'));
  },
  scrollToSection: function(section){
    const sectionOffset = document.getElementById(section).offsetTop - 90;
    window.scroll({
      top: sectionOffset,
      left: 0,
      behavior: "smooth"
    });
  }
}

module.exports = bannerSection;