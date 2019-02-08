<?php 
  echo "
    <header>
      <div id='brand-logo'><a href='../index.php'>Gogobin</a></div>";
      if (isset($_SESSION['user_id'])){
        $id = $_SESSION['user_id'];
        echo "
          <span id='user-logged-in' class='yes'></span>
          <nav id='logged-in-nav'>
            <ul>
              <li id='contact-btn'>Contact</li>
              <li id='user-box'>
                <span id='user-box-img' data-id='".$id."'></span>
                <strong>&nbsp;".$_SESSION['user_username']."&nbsp;
                  <i class='fa fa-angle-down' style='font-weight:bold'></i>
                </strong>
                <span id='user-badge'>!</span>
              </li>
        ";
        //updated session edit-in-progress for shopping cart items
        if(isset($_SESSION["edit-in-progress"]) && $_SESSION['edit-in-progress'] == "yes"){
          include_once "php/edit-in-progress-cart.php";
        } else if (isset($_SESSION["same-order-in-progress"]) && $_SESSION['same-order-in-progress'] == "yes"){
          include_once "php/order-in-progress-cart.php";
        } else {
          //default cart (no order or order edit in progress)
          echo "
            <li id='shopping-cart'>
              <p id='cart-container' vers='empty-cart'>
                <i class='fa fa-shopping-cart' aria-hidden='true'></i>
                <span id='cart-badge'></span>
              </p>
            </li>
          ";
        }
        echo "
              </ul>
            </nav>
          </header>
        "; 
        //closing tags for logged-in-nav & > ul
      } else {
        echo "
          <nav id='horizontal-nav'><ul>
            <li id='contact-btn' class='h-nav-item'>Contact</li>
            <li id='login-btn' class='h-nav-item'>Login</li>
            <li id='signup-btn' class='h-nav-item'><a href='../signup/signup.php'>Sign Up</a></li>
          </ul></nav></header>
        "; //closing tags for logged-in-nav & > ul
      }
      echo "
        <form action='../includes/logout-inc.php' method='POST' id='logout-form'>
          <input type='submit' name='submit' value='Logout' id='logout-submit'/>
          <span><i class='fa fa-sign-out'></i></span>
        </form>
      ";
      //this burger menu and nav are displayed when screen width = mobile device
    if(!isset($_SESSION['user_id'])){
      echo "
        <div id='burger-wrapper'>
          <div id='burger-content'>
            <span class='burger-top'></span>
            <span class='burger-middle'></span>
            <span class='burger-bottom'></span>
          </div>
        </div>
        <nav class='vertical-nav'>
          <ul>
            <li id='vert-contact-btn'><i class='fa fa-envelope'></i>&nbsp; Contact</li>
            <li id='vert-login-btn'><i class='fa fa-user-o'></i>&nbsp; Login</li>
            <li id='vert-signup-btn'><i class='fa fa-user-plus'></i>&nbsp; <a href='../signup/signup.php'>Sign Up</a></li>
          </ul>
        </nav>
      </header>
    ";
  }
?>