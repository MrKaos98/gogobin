var pwdFieldOne = document.getElementById("pwd-field-one"),
    pwdFieldTwo = document.getElementById("pwd-field-two"),
    prevPwds = document.getElementById("prev-pwds"),
    pwdsUnmatched = document.getElementById("pwds-unmatched"),
    userEmail = document.getElementById("user-email");
window.onload = function(){
  pwdFieldOne.focus();
}

pwdFieldOne.addEventListener("blur", function(){
  if(pwdFieldOne.value != ""){
    let pwdValue = pwdFieldOne.value;
    checkExistingPwds(pwdValue);
  } else if(pwdFieldOne.value == ""){
    prevPwds.style.display = "none";
    pwdsUnmatched.style.display = "none";
  }
})

pwdFieldOne.addEventListener("focus", function(){
  if(pwdFieldOne.value == ""){
    prevPwds.style.display = "none";
    pwdsUnmatched.style.display = "none";
  }
})

pwdFieldOne.addEventListener("input", function(){
  prevPwds.style.display = "none";
  pwdsUnmatched.style.display = "none";
})

function checkExistingPwds(pwdValue){
  let email = userEmail.value;
  var param = "email=" + email + "&pwd=" + pwdValue;
  var xhr = new XMLHttpRequest();
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.open("POST", "checkExistingPwds.php", true);
  xhr.onload = function(){
    if(this.status == 200 || xhr.status == 200){
      var resp = this.responseText;
      if(resp){
        console.log("prev pwds");
        prevPwds.style.display = "block";
      } else {
        prevPwds.style.display = "none";
      }
    }
  }
  xhr.send(param);
}
