var userNameField = document.getElementById("username-field"),
    emailField = document.getElementById("email-field"),
    confirmField = document.getElementById("confirm-field"),
    usernameDne = document.getElementById("username-dne"),
    emailDne = document.getElementById("email-dne"),
    emailMatch = document.getElementById("email-match"),
    userError = document.getElementById("user-error"),
    changeSubmitBtn = document.getElementById("change-submit-btn");
window.onload = function(){
  userNameField.focus();
}

userNameField.addEventListener("blur", function(){
  if(userNameField.value != ""){
    var inputValue = userNameField.value;
    checkForUsername(inputValue);
  } else if(userNameField.value == ""){
    usernameDne.style.display = "none";
  }
})

userNameField.addEventListener("focus", function(){
  if(userNameField.value == ""){
    usernameDne.style.display = "none";
  }
})

userNameField.addEventListener("input", function(){
  if(userNameField.value == ""){
    usernameDne.style.display = "none";
  }
})

function checkForUsername(inputValue){
  console.log(inputValue);
  var xhr = new XMLHttpRequest();
  var param = "username=" + inputValue + "";
  xhr.open("POST", "includes/checkForUsername.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status == 200 || xhr.status == 200){
      var resp = this.responseText;
      if(resp){
        console.log(resp);
        usernameDne.style.display = "none";
        changeSubmitBtn.disabled = false;
      } else {
        console.log("no matching usernames");
        usernameDne.style.display = "block";
        changeSubmitBtn.disabled = true;
      }
    }
  }
  xhr.send(param);
}

emailField.addEventListener("blur", function(){
  if(emailField.value != ""){
    let inputEmail = emailField.value;
    checkForEmail(inputEmail);
  } else if(emailField.value == ""){
    emailDne.style.display = "none";
  }
  if(userNameField.value != "" && emailField.value != ""){
    console.log("both not blank");
    let inputUsrName = userNameField.value;
    let inputEmail = emailField.value;
    usernameEmailCheck(inputUsrName, inputEmail);
  }
})

emailField.addEventListener("focus", function(){
  if(emailField.value == ""){
    emailDne.style.display = "none";
    userError.style.display = "none";
  }
})

emailField.addEventListener("input", function(){
  emailDne.style.display = "none";
  userError.style.display = "none";
})

function checkForEmail(inputEmail){
  var xhr = new XMLHttpRequest();
  var param = "email=" + inputEmail + "";
  xhr.open("POST", "includes/checkForEmail.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status == 200 || xhr.status == 200){
      var resp = this.responseText;
      if(resp){
        console.log(resp);
        emailDne.style.display = "none";
        changeSubmitBtn.disabled = false;
      } else {
        console.log("email does not exist");
        emailDne.style.display = "block";
        changeSubmitBtn.disabled = true;
      }
    }
  }
  xhr.send(param);
}

function usernameEmailCheck(userName, email){
  var xhr = new XMLHttpRequest();
  var param = "username=" + userName + "&email=" + email;
  xhr.open("POST", "includes/usernameEmailCheck.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(xhr.status == 200 || this.status == 200){
      var resp = this.responseText;
      if(resp){
        console.log("username email match");
        emailDne.style.display = "none";
        userError.style.display = "none";
        changeSubmitBtn.disabled = false;
      } else {
        console.log("username email don't match");
        userError.style.display = "block";
        changeSubmitBtn.disabled = true;
      }
    }
  }
  xhr.send(param);
}

confirmField.addEventListener("blur", function(){
  if(confirmField.value != ""){
    if(confirmField.value != emailField.value){
      emailMatch.style.display = "block";
      changeSubmitBtn.disabled = true;
    } else {
      emailMatch.style.display = "none";
      changeSubmitBtn.disabled = false;
    }
  } else {
    emailMatch.style.display = "none";
    changeSubmitBtn.disabled = false;
  }
})

confirmField.addEventListener("focus", function(){
  if(confirmField.value == ""){
    emailMatch.style.display = "none";
    changeSubmitBtn.disabled = false;
  }
})

confirmField.addEventListener("input", function(){
  emailMatch.style.display = "none";
  changeSubmitBtn.disabled = false;
})
