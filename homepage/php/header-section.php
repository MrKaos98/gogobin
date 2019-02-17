<?php 
  if(isset($_SESSION['user_id'])){
    $id = $_SESSION['user_id'];
    echo "
      <header>
        <div id='brand-logo'>
          <a href='../gogobin.php'>Gogobin</a>
        </div>
        <nav id='logged-in-nav'>
          <ul>
            <li id='user-box'>
              <span id='user-box-img' data-id='".$id."'></span>
              <strong>&nbsp;".$_SESSION['user_username']."&nbsp;
                <i class='fa fa-angle-down' style='font-weight:bold'></i>
              </strong>
              <span id='user-badge'>!</span>
            </li>
            <li id='shopping-cart'>
              <p id='cart-container' vers='empty-cart'>
                <i class='fa fa-shopping-cart' aria-hidden='true'></i>
                <span id='cart-badge'></span>
              </p>
            </li>
          </ul>
        </nav>
        <section id='burger-wrap'>
          <span class='burger-layer'></span>
        </section>
      </header>
    ";
  } else {
    echo "
      <header>
        <div id='brand-logo'>
          <a href='../gogobin.php'>Gogobin</a>
        </div>
        <nav id='horizontal-nav'>
          <ul>
            <li id='login-btn' class='h-nav-item'>Login</li>
            <li id='signup-btn' class='h-nav-item'><a href='../signup/signup.php'>Sign Up</a></li>
            <li id='shopping-cart'>
              <p id='cart-container' vers='empty-cart'>
                <i class='fa fa-shopping-cart' aria-hidden='true'></i>
                <span id='cart-badge'></span>
              </p>
            </li>
          </ul>
        </nav>
      </header>
    ";
  }