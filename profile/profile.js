const headerObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.orderInProgress = document.getElementById("order-in-progress");
    if(this.orderInProgress) this.orderInProgressVal = this.orderInProgress.textContent;
    this.editInProgress = document.getElementById("edit-in-progress");
    if(this.editInProgress) this.editInProgressVal = this.editInProgress.textContent;
    this.sameOrderInProgress = document.getElementById("same-order-in-progress");
    if(this.sameOrderInProgress) this.sameOrderInProgressVal = this.sameOrderInProgress.textContent;
    this.userIcon = document.getElementsByClassName("fa-user")[0];
    this.userMenu = document.getElementsByClassName("user-menu")[0];
    this.goHomeBtn = document.getElementById("go-home-btn");
    this.logoutBtn = document.getElementById("logout-btn");
    this.logoutSubmit = document.getElementById("logout-submit");
  },
  bindEvents: function(){
    this.userIcon.addEventListener("click", this.showUserMenu.bind(this));
    this.goHomeBtn.addEventListener("click", this.redirectToHome.bind(this));
    this.logoutBtn.addEventListener("click", this.logOutHandler.bind(this));
  },
  showUserMenu: function(){
    if(this.userMenu.style.display === "block"){
      this.userMenu.style.display = "none";
    } else {
      this.userMenu.style.display = "block"
    }
  },
  redirectToHome: function(){
    document.getElementById("home-anchor").click();
  },
  logOutHandler: function(){
    this.logoutSubmit.click();
  }
};
headerObj.init();


const editModalObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.editBtn = document.getElementById("edit-btn");
    this.editModalWindow = document.getElementById("edit-modal-window");
    this.editModalContainer = document.getElementById("edit-modal-container");
    this.closeEditModalBtn = document.getElementById("close-edit-modal-btn");
  },
  bindEvents: function(){
    this.editBtn.addEventListener("click", this.showEditModalHandler.bind(this));
    this.editModalWindow.addEventListener("click", this.closeEditModalHandler.bind(this));
    this.closeEditModalBtn.addEventListener("click", this.closeEditModalHandler.bind(this));
  },
  showEditModalHandler: function(){
    this.editModalWindow.style.display = "block";
    this.editModalContainer.style.display = "block";
    $("body").addClass("stop-scrolling");
  },
  closeEditModalHandler: function(){
    this.editModalWindow.style.display = "none";
    this.editModalContainer.style.display = "none";
    $("body").removeClass("stop-scrolling");
  }
};
editModalObj.init();


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


const profileInfoObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  }, 
  cacheDom: function(){
    this.imageContainer = document.getElementById("image-container");
    this.inputFileElement = document.getElementById("file-input");
    this.changePicBtn = document.getElementById("change-pic-btn");
    this.uploadPicBtn = document.getElementById("upload-pic-btn");

  },
  bindEvents: function(){
    this.changePicBtn.addEventListener("click", this.changePicHandler.bind(this));
    this.uploadPicBtn.addEventListener("click", this.uploadPicHandler.bind(this));
  },
  changePicHandler: function(){
    this.inputFileElement.click();
    this.changePicBtn.style.display = "none";
    this.uploadPicBtn.style.display = "block";
  },
  uploadPicHandler: function(){
    this.changePicBtn.style.display = "block";
    this.uploadPicBtn.style.display = "none";
  }
};
profileInfoObj.init();


const currOrderObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.currentOrderHeading = document.getElementById("current-order-heading");
    this.currentOrderOuter = document.getElementById("current-order-outer");
    this.currOrderTooltip = document.getElementById("curr-order-tooltip");
    this.orderCompletedSubmit = document.getElementById("order-complete-submit");
    this.entireOrdersSection = document.getElementsByClassName(".col-8")[0];
    this.currentOrderRow = document.getElementById("current-order-row");
    this.currentOrderDestination = document.getElementsByClassName(".location-address-name-container")[0];
    this.orderCompletedBtn = document.getElementById("order-completed-btn");
    this.editOrderBtn = document.getElementById("edit-order-btn");
    this.editOrderSubmit = document.getElementById("edit-order-submit");
    this.cancelOrderBtn = document.getElementById("cancel-order-btn");
    this.cancelOrderSubmit = document.getElementById("cancel-order-submit");
  },
  bindEvents: function(){
    if(this.currentOrderRow){
      this.currentOrderRow.addEventListener("mouseover", this.showTooltipHandler.bind(this));
      this.currentOrderRow.addEventListener("mouseout", this.hideTooltipHandler.bind(this));
      if(this.editOrderBtn){
        this.editOrderBtn.addEventListener("click", this.removeOrderHandler.bind(this, 'edit'));
      }
      if(this.cancelOrderBtn){
        this.cancelOrderBtn.addEventListener("click", this.removeOrderHandler.bind(this, 'cancel'));
      }
      if(this.orderCompletedBtn){
        this.orderCompletedBtn.addEventListener("click", this.removeOrderHandler.bind(this, 'complete'));
      }
    }
  },
  showTooltipHandler: function(){
    this.currOrderTooltip.style.opacity = "1";
  },
  hideTooltipHandler: function(){
    this.currOrderTooltip.style.opacity = "0";
  },
  removeOrderHandler: function(text){
    console.log("removing order");
    this.currentOrderOuter.style.height = "0px";
    this.currentOrderHeading.style.height = "0px";
    setTimeout(function(){
      switch(true){
        case (text == "edit"):
          this.editOrderSubmit.click();
        break;
        case (text == "complete"):
          this.orderCompletedSubmit.click();
        break;
        case (text == "cancel"):
          this.cancelOrderSubmit.click();
        break;
      }
    }.bind(this), 2000);
  }
}
currOrderObj.init();


const prevOrderObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.prevOrdersContainer = document.getElementById("previous-orders-container");
    this.prevOrdersHeading = document.getElementById("previous-orders-heading");
    this.prevOrderRows = document.getElementsByClassName("previous-order-row");
    this.prevOrderTooltips = document.getElementsByClassName("prev-order-tooltip");
    this.orderAgainBtns = document.getElementsByClassName("order-again-btn");
    this.orderAgainSubmits = document.getElementsByClassName("order-again-submit-btn");
    this.removeOrderBtns = document.getElementsByClassName("remove-order-btn");
    this.removeOrderSubmits = document.getElementsByClassName("remove-order-submit-btn");
    this.prevOrderInners = document.getElementsByClassName("previous-order-inner");
  },
  bindEvents: function(){
    if(this.prevOrderRows){
      for(let i = 0; i < this.prevOrderRows.length; i++){
        this.prevOrderRows[i].addEventListener("mouseover", this.showTooltipHandler.bind(this, i));
        this.prevOrderRows[i].addEventListener("mouseout", this.hideTooltipHandler.bind(this, i));
        this.orderAgainBtns[i].addEventListener("click", this.orderAgainHandler.bind(this, i));
        this.removeOrderBtns[i].addEventListener("click", this.removeOrderHandler.bind(this, i));
      }
    }
  },
  showTooltipHandler: function(index){
    this.prevOrderTooltips[index].style.opacity = "1";
  },
  hideTooltipHandler: function(index){
    this.prevOrderTooltips[index].style.opacity = "0";
  },
  orderAgainHandler: function(index){
    if(headerObj.orderInProgressVal == "yes" || headerObj.editInProgressVal == "yes" || headerObj.sameOrderInProgressVal == "yes"){
      alert("Complete current order before ordering again");
    } else {
      this.orderAgainSubmits[index].click();
    }
  },
  removeOrderHandler: function(index){
    this.prevOrderInners[index].style.height = "0px";
    setTimeout(function(){
      this.removeOrderSubmits[index].click();
    }.bind(this), 2000);
  }
};
prevOrderObj.init();


const convosObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.conversationsBtn = document.getElementById("my-conversations-btn");
    this.convoBadge = document.getElementById("convo-badge");
    this.convoModalWindow = document.getElementById("convos-modal-window");
    this.convoBodyWrapper = document.getElementById("convos-body-wrapper");
    this.closeConvosBtn = document.getElementById("close-convos-btn");
    this.viewConvos = document.getElementsByClassName("view-convo"); 
    this.messagesOuters = document.getElementsByClassName("messages-outer");
    this.messagesInners = document.getElementsByClassName("messages-inner");
    this.convoCheckboxes = document.getElementsByClassName("convo-checkbox");
    this.convoSendSubmit = document.getElementsByClassName("convo-send-submit");
  },
  bindEvents: function(){
    if(this.conversationsBtn){
      this.conversationsBtn.addEventListener("click", this.showConvosHandler.bind(this));
      this.closeConvosBtn.addEventListener("click", this.closeConvosHandler.bind(this));
      this.convoModalWindow.addEventListener("click", this.closeConvosHandler.bind(this));
      for(let i = 0; i < this.viewConvos.length; i++){
        this.viewConvos[i].addEventListener("click", this.viewConvoHandler.bind(this, i));
        this.convoSendSubmit[i].addEventListener("click", this.sendMsgHandler.bind(this, i));
      }
    }
  },
  sendMsgHandler: function(index){
    var $thisReplyForm = $(".reply-msg-form").eq(index);
    var $otherId = $thisReplyForm.children(".hidden").val();
    var $msg = $thisReplyForm.children(":text").val();
    console.log("otherID: " + $otherId + "message: " + $msg);
    if($msg == ""){
      alert("cannot send blank");
    } else {
      this.sendAjaxMsg($otherId, $msg);
      $(".hidden").siblings(":text").val("");
    }
  },
  sendAjaxMsg: function(otherId, message){
    console.log("msg");
    var xhr = new XMLHttpRequest();
    var params = "other-id=" + otherId + "&message=" + message;
    xhr.open("POST", "../includes/sendAjaxMsg.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
      if(xhr.status == 200){
        var data = `
          <div class='sent-message-grid'>
           <div></div>
            <p><span  class='sent-msg'>${message}</span></p>
          </div>
        `;
        $("#with-user-" + otherId).append(data);
        this.scrollMsgsToBottom();
      }
    }.bind(this);
    xhr.send(params);
  },
  viewConvoHandler: function(index){
    this.closeOtherConvos(index);
    this.scrollMsgsToBottom();
    var senderId = this.viewConvos[index].getAttribute("sender");
    this.uncheckOtherBoxes(index, senderId);
    var thisCheckbox = this.convoCheckboxes[index];
    if(thisCheckbox.checked == false){
      thisCheckbox.checked = true;
    } else if(thisCheckbox.checked == true){
      thisCheckbox.checked = false;
    }
    this.openConversation(thisCheckbox, senderId);
    this.viewConvos[index].classList.toggle("toggle-view-convo");
    this.messagesOuters[index].classList.toggle("toggle-messages-outer");
  },
  showConvosHandler: function(){
    this.convoModalWindow.style.display = "block";
    this.convoBodyWrapper.style.display = "block";
    this.convoBodyWrapper.style.left = "0";
    $("body").addClass("stop-scrolling");
  },
  closeConvosHandler: function(){
    this.convoModalWindow.style.display = "none";
    this.convoBodyWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
    this.closeAllConvos();
    this.stopMsgLoading();
  },
  checkForNewMsgs: function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/checkForNewMsgs.php", true);
    xhr.onload = function(){
      if(xhr.status == 200){
        var data = xhr.responseText;
        if(data){
          let data = JSON.parse(xhr.responseText);
          for(let i = 0; i < data.length; i++){
            this.displayNewMsgAlert(data[i]);
          }
        } else {
          this.convoBadge.style.opacity = "0";
        }
      }
    }.bind(this);
    xhr.send();
  },
  displayNewMsgAlert: function(senderId){
    $("#" + senderId + "-user").find(".new-msg-alert").css("display", "block");
    console.log("new msg from " + senderId);
    this.toDisplayBadge();
  },
  toDisplayBadge: function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/toDisplayBadge.php", true);
    xhr.onload = function(){
      if(xhr.status == 200){
        var data = xhr.responseText;
        if(data){
          this.convoBadge.style.opacity = "1";
        } else {
          this.convoBadge.style.opacity = "0";
        }
      }
    }.bind(this);
    xhr.send();
  },
  closeOtherConvos: function(index){
    for(let i = 0; i < this.messagesOuters.length; i++){
      if(i != index){
        if(this.messagesOuters[i].classList.contains("toggle-messages-outer")){
          this.messagesOuters[i].classList.remove("toggle-messages-outer");
        }
        if(this.viewConvos[i].classList.contains("toggle-view-convo")){
          this.viewConvos[i].classList.remove("toggle-view-convo");
        }
      }
    }
  },
  scrollMsgsToBottom: function(){
    for(let i = 0; i < this.messagesInners.length; i++){
      this.messagesInners[i].scrollTop = this.messagesInners[i].scrollHeight;
    }
  },
  uncheckOtherBoxes: function(index, senderId){
    for(let i = 0; i < this.convoCheckboxes.length; i++){
      if(i != index){
        this.convoCheckboxes[i].checked = false;
        var thisCheckbox = this.convoCheckboxes[i];
        this.openConversation(thisCheckbox, senderId);
      }
    }
  },
  openConversation: function(thisCheckbox, senderId){
    if(thisCheckbox.checked == true){
      this.msgInt = setInterval(function(){
        console.log("getting msgs from " + senderId);
        this.getNewMessages(senderId);
      }.bind(this), 1000);
    } else if(thisCheckbox.checked == false){
      console.log("stop log");
      this.stopMsgLoading();
    }
  },
  getNewMessages: function(senderId){
    var xhr = new XMLHttpRequest();
    var sender = "sender=" + senderId;
    xhr.open("POST", "../includes/getNewMessages.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
      if(xhr.status == 200){
        var data = xhr.responseText;
        if(data){
          $("#with-user-" + senderId + "").append(data);
          $("#" + senderId + "-alert").css("display","none");
          console.log(sender + "-alert");
          this.scrollMsgsToBottom();
        }
      }
    }.bind(this);
    xhr.send(sender);
  },
  stopMsgLoading: function(){
    clearInterval(this.msgInt);
  },
  closeAllConvos: function(){
    for(let i = 0; i < this.convoCheckboxes.length; i++){
      this.convoCheckboxes[i].checked = false;
      if(this.messagesOuters[i].classList.contains("toggle-messages-outer")){
        this.messagesOuters[i].classList.remove("toggle-messages-outer");
      }
      if(this.viewConvos[i].classList.contains("toggle-view-convo")){
        this.viewConvos[i].classList.remove("toggle-view-convo");
      }
    }
  }
};
convosObj.init();


const deliveriesObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.myDeliveriesBtn = document.getElementById("my-deliveries");
    this.deliveriesModalWindow = document.getElementById("deliveries-modal-window");
    this.deliveriesModalContainer = document.getElementById("deliveries-modal-container");
    this.closeDeliveriesBtn = document.getElementById("close-deliveries-btn");
    this.deliveryCancelBtns = document.getElementsByClassName("delivery-cancel-btn");
    this.deliveryCancelSubmits = document.getElementsByClassName("delivery-cancel-submit");
    this.deliveryCompletedBtns = document.getElementsByClassName("delivery-completed-btn");
    this.deliveryCompletedSubmits = document.getElementsByClassName("delivery-completed-submit");
    this.deliveryMsgSubmits = document.getElementsByClassName("delivery-msg-submit");
  },
  bindEvents: function(){
    this.myDeliveriesBtn.addEventListener("click", this.showDeliveriesHandler.bind(this));
    this.deliveriesModalWindow.addEventListener("click", this.closeDeliveriesHandler.bind(this));
    this.closeDeliveriesBtn.addEventListener("click", this.closeDeliveriesHandler.bind(this));
    for(let i = 0; i < this.deliveryCancelBtns.length; i++){
      this.deliveryCancelBtns[i].addEventListener("click", this.cancelDeliveryHandler.bind(this, i));
      this.deliveryCompletedBtns[i].addEventListener("click", this.completeDeliveryHandler.bind(this, i));
      for(let i = 0; i < this.deliveryMsgSubmits.length; i++){
        this.deliveryMsgSubmits[i].addEventListener("click", this.deliveriesMsgHandler.bind(this, i));
      }
    }
  },
  showDeliveriesHandler: function(){
    this.deliveriesModalWindow.style.display = "block";
    this.deliveriesModalContainer.style.display = "block";
    $("body").addClass("stop-scrolling");
  },
  closeDeliveriesHandler: function(){
    this.deliveriesModalWindow.style.display = "none";
    this.deliveriesModalContainer.style.display = "none";
    $("body").removeClass("stop-scrolling");
  },
  cancelDeliveryHandler: function(index){
    this.deliveryCancelSubmits[index].click();
  },
  completeDeliveryHandler: function(index){
    this.deliveryCompletedSubmits[index].click();
  },
  deliveriesMsgHandler: function(index){
    var $deliveryMsgForm = $(".delivery-msg-form").eq(index);
    var $otherId = $deliveryMsgForm.children(".hidden").val();
    var $message = $deliveryMsgForm.children(":text").val();
    if($message == ""){
      alert("cannot send blank");
    } else {
      sendAjaxMsg($otherId, $message);
      $deliveryMsgForm.children(":text").val("");
    }
  }
};
deliveriesObj.init();


window.addEventListener("resize", function(){
  var windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  if(windowWidth < 1250 && windowWidth > 1185){
    var orderItems = document.getElementsByClassName("order-item");
    var elmtWidth = document.getElementsByClassName("order-store-date")[0].offsetWidth;
    for(let i = 0; i < orderItems.length; i++){
      orderItems[i].style.width = (elmtWidth - 0.1) + "px";
    }
  }
})

window.addEventListener("load", function(){
  var windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  if(windowWidth < 1250 && windowWidth > 1185){
    var orderItems = document.getElementsByClassName("order-item");
    var elmtWidth = document.getElementsByClassName("order-store-date")[0].offsetWidth;
    for(let i = 0; i < orderItems.length; i++){
      orderItems[i].style.width = (elmtWidth) + "px";
    }
  }
})