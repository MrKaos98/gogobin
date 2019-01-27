
var pwdField = document.getElementById("password-field"),
    signUpBtn = document.getElementById("signup-btn");
window.onload = function(){
  var firstNameField = document.getElementById("fname-field");
	firstNameField.focus();
}
pwdField.addEventListener("keypress", function(e){
	if(e.keyCode == 13){
		e.preventDefault();
		signUpBtn.click();
	}
})
