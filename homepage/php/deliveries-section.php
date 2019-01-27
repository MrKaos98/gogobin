<?php 
  echo "
    <div id='deliveries-modal-window'></div>
    <section id='deliveries-modal-container'>
      <div id='my-deliveries-body'>
        <div id='close-deliveries-btn'>
          <span class='window-bar-one'></span>
          <span class='window-bar-two'></span>
        </div>
        <h2>My Deliveries</h2>";
        $_POST["from"] = "home";
        include_once "../../includes/myDeliveries.php";
  echo "
      </div>
    </section>";
?>