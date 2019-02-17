<?php
  if(!isset($_SESSION['user_id'])){
    echo "
      <div id='login-wrapper-window'></div>
      <section id='login-wrapper'>
        <div id='login-inner'>
          <h2><a href='foobin.php'>Gogobin</a></h2>
          <div id='incorrect-login-msg'>
            <p>Incorrect username or password.<button id='close-msg-btn'><i class='fa fa-close'></i></button></p>
          </div>
          <form action='../includes/login-inc.php' method='POST' id='login-form'>
            <label for='login-usn-field'>Username</label>
            <input type='text' name='username' id='login-usn-field' autocomplete='off' required/>
            <label for='login-pwd-field'>Password</label>
            <input type='password' name='pwd' id='login-pwd-field' autocomplete='off' required/>
            <div id='forgot-pwd-container'>
              <a id='forgot-pwd-link' href='forgotpwd.php'>Forgot Password?</a>
            </div>
            <input type='button' id='login-wrapper-btn' value='Login'/>
          </form>
          <div id='create-account-wrapper'>
            <p>New to Gogobin? <a href='../join/signup.php'>Sign Up</a></p>
          </div>
          <div id='login-wrapper-close-btn'>
            <div class='close-btn-content'>
              <div class='close-bar-one'></div>
              <div class='close-bar-two'></div>
            </div>
          </div>
        </div>
      </section>
    ";
  }
?>