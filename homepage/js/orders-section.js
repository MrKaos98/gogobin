const ordersObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.ordersDisplayed = document.getElementById("orders-displayed");
    this.ordersModalWindow = document.getElementById("orders-modal-window");
    if(this.ordersDisplayed){
      if(this.ordersDisplayed.textContent == "yes"){
        $("body").addClass("stop-scrolling");
      }
    }
    this.ordersModalWrapper = document.getElementById("orders-modal-wrapper");
    this.ordersAccordions = document.getElementsByClassName("orders-accordion");
    this.arrowDownIcons = document.getElementsByClassName("fa-angle-down");
    this.closeOrdersBtn = document.getElementById("close-orders-btn");
    this.deliverBtns = document.getElementsByClassName("deliver-order-btn");
    this.deliverOrderSubmits = document.getElementsByClassName("deliver-order-submit");
    this.unsetAddressBtn = document.getElementById("unset-address-btn");
  },
  bindEvents: function(){
    if(this.ordersModalWindow){
      this.ordersModalWindow.addEventListener("click", this.closeOrdersHandler.bind(this));
      this.closeOrdersBtn.addEventListener("click", this.closeOrdersHandler.bind(this));
      for(let i = 0; i < this.deliverBtns.length; i++){
        this.deliverBtns[i].addEventListener("click", this.deliverClickHandler.bind(this, i));
        this.ordersAccordions[i].addEventListener("click", this.accordionClickHandler.bind(this, i));
      }
    }
  },
  accordionClickHandler: function(index){
    this.arrowDownIcons[index].classList.toggle("rotate-arrow");
    var accordionInner = this.ordersAccordions[index].nextElementSibling;
    accordionInner.classList.toggle("accordion-inner-height");
  },
  closeOrdersHandler: function(){
    this.ordersModalWindow.style.display = "none";
    this.ordersModalWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
    this.unsetAddressBtn.click();
  },
  deliverClickHandler: function(index){
    this.deliverOrderSubmits[index].click();
  }
};
ordersObj.init();