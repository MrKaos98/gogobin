<?php 
  echo "
    <div id='notis-modal-window'></div>
    <section id='notis-modal-wrapper'>
      <div id='notis-modal-body'>
        <div id='close-notis-btn'>
          <span class='window-bar-one'></span>
          <span class='window-bar-two'></span>
        </div>
        <h2>My Notifications</h2>
        <p>(Oldest to Newest)</p>";
        include_once "../../includes/myNotifications.php";
echo  "</div>
    </section>
  ";
?>