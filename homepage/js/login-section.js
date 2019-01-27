const loginObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.usernameField.focus();
    this.loginWrapperWindow.style.display = "block";
  },
  cacheDom: function(){
    this.loginWrapperWindow = document.getElementById("login-wrapper-window");
    this.loginWrapper = document.getElementById("login-wrapper");
    this.loginForm = document.getElementById("login-form");
    this.usernameField = document.getElementById("username-field");
    this.passwordField = document.getElementById("password-field");
    this.loginWrapperBtn = document.getElementById("login-wrapper-btn");
    this.loginSubmitBtn = document.getElementById("login-submit");
    this.closeLoginWrapper = document.getElementById("login-wrapper-close-btn");
    this.incorrectLoginMsg = document.getElementById("incorrect-login-msg");
    this.closeMsgBtn = document.getElementById("close-msg-btn");
  },
  bindEvents: function(){
    this.passwordField.addEventListener("keypress", this.handlePwdKey.bind(this));
    this.closeMsgBtn.addEventListener("click", this.closeErrorMsg.bind(this));
    this.closeLoginWrapper.addEventListener("click", this.closeWrapperHandler.bind(this));
    this.loginWrapperWindow.addEventListener("click", this.closeWrapperHandler.bind(this));
    this.loginWrapperBtn.addEventListener("click", this.authenticateUser.bind(this));
  },
  authenticateUser: function(){
    var usrNameValue = this.usernameField.value;
    var pwdValue = this.passwordField.value;
    var param = "username="+usrNameValue+"&pwd="+pwdValue;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/checkUsernameAndPwd.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
      if(xhr.status == 200 || this.status == 200){
        var data = xhr.responseText;
        if(data){
          this.incorrectLoginMsg.style.display = "block";
        } else {
          this.incorrectLoginMsg.style.display = "none";
          this.loginSubmitBtn.click();
        }
      }
    }.bind(this);
    xhr.send(param);
  },
  closeErrorMsg: function(){
    this.incorrectLoginMsg.style.display = "none";
  },
  handlePwdKey: function(e){
    if(e.keyCode == 13){
      e.preventDefault();
      this.loginWrapperBtn.click();
    }
  },
  closeWrapperHandler: function(){
    this.loginWrapper.style.top = "-500px";
    this.usernameField.blur();
    this.loginWrapperWindow.style.display = "none";
    this.loginForm.reset();
    document.body.classList.remove("stop-scrolling");
  }
}