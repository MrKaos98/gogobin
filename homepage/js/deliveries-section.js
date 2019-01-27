const deliveriesModalObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  }, 
  cacheDom: function(){
    this.myDeliveriesBtn = document.getElementById("my-deliveries-btn");
    this.deliveriesModalWindow = document.getElementById("deliveries-modal-window");
    this.deliveriesModalWrapper = document.getElementById("deliveries-modal-wrapper");
    this.closeDeliveriesBtn = document.getElementById("close-deliveries-btn");
    this.deliveryCancelBtns = document.getElementsByClassName("delivery-cancel-btn");
    this.deliveryCancelSubmits = document.getElementsByClassName("delivery-cancel-submit");
    this.deliveryCompletedBtns = document.getElementsByClassName("delivery-completed-btn");
    this.deliveryCompletedSubmits = document.getElementsByClassName("offer-completed-submit");
    this.deliveryMsgSubmits = document.getElementsByClassName("delivery-msg-submit");
  },
  bindEvents: function(){
    if(this.myDeliveriesBtn){
      this.myDeliveriesBtn.addEventListener("click", this.showDeliveriesHandler.bind(this));
      this.deliveriesModalWindow.addEventListener("click", this.closeDeliveriesHandler.bind(this));
      this.closeDeliveriesBtn.addEventListener("click", this.closeDeliveriesHandler.bind(this));
      for(let i = 0; i < this.deliveryCancelBtns.length; i++){
        this.deliveryCancelBtns[i].addEventListener("click", this.cancelDeliveryHandler.bind(this, i));
        this.deliveryCompletedBtns[i].addEventListener("click", this.completeDeliveryHandler.bind(this, i));
        this.deliveryMsgSubmits[i].addEventListener("click", this.deliveryMsgHandler.bind(this, i));
      }
    }
  },
  showDeliveriesHandler: function(){
    this.deliveriesModalWindow.style.display = "block";
    this.deliveriesModalWrapper.style.display = "block";
    $("body").addClass("stop-scrolling");
  },
  closeDeliveriesHandler: function(){
    this.deliveriesModalWindow.style.display = "none";
    this.deliveriesModalWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
  },
  cancelDeliveryHandler: function(index){
    this.deliveryCancelSubmits[index].click();
  },
  completeDeliveryHandler: function(index){
    this.deliveryCompletedSubmits[index].click();
  },
  deliveryMsgHandler: function(index){
    var $deliveryMsgForm = $(".delivery-msg-form").eq(index);
    var $otherId = $deliveryMsgForm.children(".hidden").val();
    var $message = $deliveryMsgForm.children(":text").val();
    if($message == ""){
      alert("cannot send blank");
    } else {
      this.sendAjaxMsg($otherId, $message);
      $deliveryMsgForm.children(":text").val("");
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
  }
};
deliveriesModalObj.init();