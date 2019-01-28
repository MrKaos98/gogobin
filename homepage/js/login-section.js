const store = require('../../store/store-index');
const { toggleLogin } = require('../../store/action-creators/action-creators');

const loginObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.checkWrapStatus();
  },
  checkWrapStatus: function(){
    if(store.getState().loginReducer.showLoginWrap){
      this.showWrapHandler();
    } else {
      this.closeWrapperHandler();
    }
  },
  cacheDom: function(){
    this.loginWrapperWindow = document.getElementById("login-wrapper-window");
    this.loginWrapper = document.getElementById("login-wrapper");
    this.loginForm = document.getElementById("login-form");
    this.usernameField = document.getElementById("login-usn-field");
    this.passwordField = document.getElementById("login-pwd-field");
    this.loginWrapperBtn = document.getElementById("login-wrapper-btn");
    this.loginSubmitBtn = document.getElementById("login-submit");
    this.closeLoginWrapper = document.getElementById("login-wrapper-close-btn");
    this.incorrectLoginMsg = document.getElementById("incorrect-login-msg");
    this.closeMsgBtn = document.getElementById("close-msg-btn");
  },
  bindEvents: function(){
    if(this.loginWrapperWindow) {
      this.passwordField.addEventListener("keypress", this.handlePwdKey.bind(this));
      this.closeMsgBtn.addEventListener("click", this.closeErrorMsg.bind(this));
      this.closeLoginWrapper.addEventListener("click", () => store.dispatch(toggleLogin(false)));
      this.loginWrapperWindow.addEventListener("click", () => store.dispatch(toggleLogin(false)));
      this.loginWrapperBtn.addEventListener("click", this.authenticateUser.bind(this));
    }
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
  showWrapHandler: function(){
    this.loginWrapperWindow.style.display = "block";
    this.loginWrapper.style.top = 0;
    this.usernameField.focus();
  },
  closeWrapperHandler: function(){
    if(this.loginWrapperWindow){
      this.loginWrapperWindow.style.display = "none";
      this.loginWrapper.style.top = "-500px";
      this.usernameField.blur();    
      this.loginForm.reset();
      document.body.classList.remove("stop-scrolling");
    }
  }
}
store.subscribe(() => {
  loginObj.checkWrapStatus();
});

module.exports = loginObj;