const foodSection = {
  state: {
    rowReset: false
  },
  init(){
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM(){
    this.innerImageContainers = document.getElementsByClassName("inner-images-container");
    this.slideLeftBtns = document.getElementsByClassName("slide-left-btn");
    this.slideRightBtns = document.getElementsByClassName("slide-right-btn");
    this.currentSectionIndex = 0;  
    this.width = 100; 
  },
  bindEvents(){
    window.addEventListener("resize", this.rowResetHandler.bind(this));
    [...this.slideLeftBtns].forEach((btn, index) => {
      btn.addEventListener('click', this.slideRowLeft.bind(this, index));
    });
    [...this.slideRightBtns].forEach((btn, index) => {
      btn.addEventListener('click', this.slideRowRight.bind(this, index));
    });
  },
  rowResetHandler() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const shouldReset = (windowWidth < 1200) ? true : false;
    if(shouldReset && this.state.rowReset === false){
      this.resetFoodItemRows();
    } else if (shouldReset === false && this.state.rowReset){
      this.state.rowReset = false;
    }
  },
  resetFoodItemRows(){
    this.state.rowReset = true;
    [...this.innerImageContainers].forEach(container => container.style.left = 0);
  },
  slideRowLeft(index){
    this.currentSectionIndex--;
    if(this.currentSectionIndex < 0){
      this.currentSectionIndex = 1;
    }
    moveFoodSection(index);
  },
  slideRowRight(index){
    this.currentSectionIndex++;
    if(this.currentSectionIndex >= 2){
      this.currentSectionIndex = 0;
    }
    moveFoodSection(index);
  },
  moveFoodSection(index){
    this.innerImageContainers[index].style.left = -this.width * this.currentSectionIndex + "%";
  }
};

module.exports = foodSection;