const foodRowsObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.defaultRowLayout = true;
    this.state = {
      rowReset: false
    };
    this.currentSectionIndex = 0;
    this.width = 100;
  },
  cacheDom: function(){
    this.innerImageContainers = document.getElementsByClassName("inner-images-container");
    this.slideLeftBtns = document.getElementsByClassName("slide-left-btn"),
    this.slideRightBtns = document.getElementsByClassName("slide-right-btn");
  },
  bindEvents: function(){
    window.addEventListener("resize", this.activateRowReset.bind(this));
    for(let counter = 0; counter < this.slideLeftBtns.length; counter++){
      this.slideLeftBtns[counter].addEventListener("click", this.slideFoodRowLeft.bind(this, counter));
      this.slideRightBtns[counter].addEventListener("click", this.slideFoodRowRight.bind(this, counter));
    }
  },
  activateRowReset(){
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var shouldReset = (windowWidth < 1200) ? true : false;
    if(shouldReset === true && this.state.rowReset === false){
      this.resetFoodItemRows();
    } else if (shouldReset === false && this.state.rowReset === true){
      this.state.rowReset = false;
    }
  },
  resetFoodItemRows(){
    this.state.rowReset = true;
    let counter = 0;
    let rowLength = this.innerImageContainers.length;
    for(counter; counter < rowLength; counter++){
      this.innerImageContainers[counter].style.left = "0";
    }
  },
  slideFoodRowLeft(index){
    this.currentSectionIndex--;
    if(this.currentSectionIndex < 0){
      this.currentSectionIndex = 1;
    }
    this.moveFoodSection(index);
  },
  slideFoodRowRight(index){
    this.currentSectionIndex++;
    if(this.currentSectionIndex >= 2){
      this.currentSectionIndex = 0;
    }
    this.moveFoodSection(index);
  },
  moveFoodSection(index){
    this.innerImageContainers[index].style.left = -this.width * this.currentSectionIndex + "%";
  }
};
foodRowsObj.init();