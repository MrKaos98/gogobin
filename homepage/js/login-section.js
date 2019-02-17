const store = require('../../store/store-index');
const { toggleLogin } = require('../../store/action-creators/action-creators');

const loginSection = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.checkWrapStatus();
  },
  checkWrapStatus: function(){
    if(store.getState().login.showLoginWrap){
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
    const loginObj = {
      method: 'POST',
      body: new URLSearchParams(`username=${this.usernameField.value}&pwd=${this.passwordField.value}`)
    }
    fetch("../includes/checkUsernameAndPwd.php", loginObj)
    .then(res => res.text()).then(data => {
      if(data){
        this.incorrectLoginMsg.style.display = "block";
      } else {
        this.incorrectLoginMsg.style.display = "none";
        this.loginForm.submit();
      }
    });
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
  loginSection.checkWrapStatus();
});

module.exports = loginSection;