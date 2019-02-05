const convosSection = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.userBox = document.getElementById('user-box');
    this.userMenu = document.getElementsByClassName('user-menu')[0];
    this.conversationsBtn = document.getElementById("my-conversations-btn");
    this.convoBadge = document.getElementById("convo-badge");
    this.convoModalWindow = document.getElementById("convos-modal-window");
    this.convoBodyWrapper = document.getElementById("convos-modal-wrapper");
    this.closeConvosBtn = document.getElementById("close-convos-btn");
    this.viewConvos = document.getElementsByClassName("view-convo"); 
    this.messagesOuters = document.getElementsByClassName("messages-outer");
    this.messagesInners = document.getElementsByClassName("messages-inner");
    this.convoCheckboxes = document.getElementsByClassName("convo-checkbox");
    this.convoSendSubmit = document.getElementsByClassName("convo-send-submit");
  },
  bindEvents: function(){
    if(this.userBox){
      this.userBox.addEventListener('click', this.toggleUserMenu.bind(this));
      this.conversationsBtn.addEventListener("click", this.showConvosHandler.bind(this));
      this.closeConvosBtn.addEventListener("click", this.closeConvosHandler.bind(this));
      this.convoModalWindow.addEventListener("click", this.closeConvosHandler.bind(this));
      for(let i = 0; i < this.viewConvos.length; i++){
        this.viewConvos[i].addEventListener("click", this.viewConvoHandler.bind(this, i));
        this.convoSendSubmit[i].addEventListener("click", this.sendMsgHandler.bind(this, i));
      }
    }
  },
  toggleUserMenu: function(){
    if(this.userMenu.style.display != "grid"){
      this.userMenu.style.display = "grid";
      this.checkForNewMsgs();
    } else {
      this.userMenu.style.display = "none";
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
    headerObj.userMenu.style.display = "none";
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
          console.log("new msg is there");
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

module.exports = convosSection;