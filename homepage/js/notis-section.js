const notisObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    setInterval(function(){
      this.checkNewNotifications();
    }.bind(this), 2000);
  },
  cacheDom: function(){
    this.notisBtn = document.getElementById("my-notifications-btn");
    this.notiBadge = document.getElementById("noti-badge");
    this.notisModalWindow = document.getElementById("notis-modal-window");
    this.notisModalWrapper = document.getElementById("notis-modal-wrapper");
    this.closeNotisBtn = document.getElementById("close-notis-btn");
    this.noNotisMsg = document.getElementById("no-notis-msg");
    this.denyOfferSubmits = document.getElementsByClassName("deny-offer-submit");
    this.removeNotiSubmits = document.getElementsByClassName("remove-noti-submit");
    this.acceptOfferSubmits = document.getElementsByClassName("accept-offer-submit");
    this.notiMsgForms = document.getElementsByClassName("send-message-form");
    this.textSubmitContainers = document.getElementsByClassName("text-submit-container");
    this.notiMsgSubmits = document.getElementsByClassName("noti-message-submit");
  },
  bindEvents: function(){
    if(this.notisBtn){
      this.notisBtn.addEventListener("click", this.showNotisHandler.bind(this));
      this.notisModalWindow.addEventListener("click", this.closeNotisHandler.bind(this));
      this.closeNotisBtn.addEventListener("click", this.closeNotisHandler.bind(this));
      for(let i = 0; i < this.notiMsgSubmits.length; i++){
        this.notiMsgSubmits[i].addEventListener("click", this.notiMsgHandler.bind(this, i));
      }
    }
  },
  notiMsgHandler: function(index){
    var $textSubmitContainer = $(".text-submit-container").eq(index);
    var $otherId = $textSubmitContainer.children(".hidden").val();
    var $message = $textSubmitContainer.children(":text").val();
    console.log("otherId: " + $otherId + ", msg: " + $message);
    if($message == ""){
      alert("cannot send blank");
    } else {
      this.sendAjaxMsg($otherId, $message);
      $textSubmitContainer.children(":text").val("");
    }
  },
  sendAjaxMsg: function(otherId, message){
    var xhr = new XMLHttpRequest();
    var params = "other-id=" + otherId + "&message=" + message;
    xhr.open("POST", "../includes/sendAjaxMsg.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
      if(this.status == 200){
        var data = `
          <div class='sent-message-grid'>
           <div></div>
            <p><span  class='sent-msg'>${message}</span></p>
          </div>
        `;
        $("#with-user-" + otherId).append(data);
      }
    }
    xhr.send(params);
  },
  showNotisHandler: function(){
    this.notisModalWindow.style.display = "block";
    this.notisModalWrapper.style.display = "block";
    $("body").addClass("stop-scrolling");
    this.getNewNotifications();
  },
  closeNotisHandler: function(){
    this.notisModalWindow.style.display = "none";
    this.notisModalWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
    this.closeNotiMsgForms();
  },
  closeNotiMsgForms: function(){
    for(let i = 0; i < this.notiMsgForms.length; i++){
      if(this.notiMsgForms[i].classList.contains("toggle-send-message-form")){
        this.notiMsgForms[i].classList.toggle("toggle-send-message-form");
        this.removeBtns[i].classList.toggle("toggle-move-up");
        this.mailIcons[i].classList.toggle("toggle-move-up");
      }
    }
  },
  checkNewNotifications: function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../includes/checkNewNotifications.php", true);
    xhr.onload = function(){
      if(xhr.status == 200){
        var data = xhr.responseText;
        if(data){
          if(this.noNotisMsg) {
            this.noNotisMsg.style.opacity = "1";
          } 
        } else {
          if(this.noNotisMsg){
            this.notiBadge.style.opacity = "0";
          }
        }
      }
    }.bind(this);
    xhr.send();
  },
  getNewNotifications: function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/getNewNotifications.php", true);
    xhr.onload = function(){
      if(xhr.status == 200){
        var data = xhr.responseText;
        if(data){
          $("#notis-modal-body").append(data);
        }
      }
      this.addFunctionToNotiBtns();
    }.bind(this);
    xhr.send();
  },
  addFunctionToNotiBtns: function(){
    this.addFunctionToAcceptBtns();
    this.addFunctionToDenyBtns();
    this.addFunctionToMsgBtns();
    this.addFunctionToRemoveBtns();
    this.addFunctionToYesBtns();
    this.addFunctionToNoBtns();
  },
  addFunctionToAcceptBtns: function(){
    this.acceptBtns = document.getElementsByClassName("accept-btn");
    if(this.acceptBtns){
      for(let i = 0; i < this.acceptBtns.length; i++){
        this.acceptBtns[i].addEventListener("click", function(){
          this.acceptOfferSubmits[i].click();
        }.bind(this));
      }
    }
  },
  addFunctionToDenyBtns: function(){
    this.denyBtns = document.getElementsByClassName("deny-btn");
    if(this.denyBtns){
      for(let i = 0; i < this.denyBtns.length; i++){
        this.denyBtns[i].addEventListener("click", function(){
          this.denyOfferSubmits[i].click();
        }.bind(this));
      }
    }
  },
  addFunctionToRemoveBtns: function(){
    this.removeBtns = document.getElementsByClassName("close-box");
    if(this.removeBtns){
      for(let i = 0; i < this.removeBtns.length; i++){
        this.removeBtns[i].addEventListener("click", function(){
          this.removeNotiSubmits[i].click();
        }.bind(this));
      }
    }
  },
  addFunctionToMsgBtns: function(){
    this.mailIcons = document.getElementsByClassName("mail-icon");
    if(this.mailIcons){
      for(let i = 0; i < this.mailIcons.length; i++){
        this.mailIcons[i].addEventListener("click", function(){
          console.log("mail icon clicked, index: " + i);
          this.notiMsgForms[i].classList.toggle("toggle-send-message-form");
          this.removeBtns[i].classList.toggle("toggle-move-up");
          this.mailIcons[i].classList.toggle("toggle-move-up");
        }.bind(this));
      }
    }
  },
  addFunctionToYesBtns: function(){
    this.deliveryCompleteForms = document.getElementsByClassName("delivery-complete-form");
    this.deliveryCompleteSubmits = document.getElementsByClassName("delivery-complete-submit");
    this.notiYesBtns = document.getElementsByClassName("yes-btn");
    for(let i = 0; i < this.notiYesBtns.length; i++){
      this.notiYesBtns[i].addEventListener("click", this.deliveryCompleteHandler.bind(this, i));
    }
  },
  addFunctionToNoBtns: function(){
    this.deliveryIncompleteForms = document.getElementsByClassName("delivery-incomplete-form");
    this.deliveryIncompleteSubmits = document.getElementsByClassName("delivery-incomplete-submit");
    this.notiNoBtns = document.getElementsByClassName("no-btn");
    for(let i = 0; i < this.notiNoBtns.length; i++){
      this.notiNoBtns[i].addEventListener("click", this.deliveryIncompleteHandler.bind(this, i));
    }
  },
  deliveryCompleteHandler: function(index){
    this.deliveryCompleteSubmits[index].click();
  },
  deliveryIncompleteHandler: function(index){
    this.deliveryIncompleteSubmits[index].click();
  }
};
notisObj.init();