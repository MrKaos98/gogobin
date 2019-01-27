<?php
  echo "
    <div id='convos-modal-window'></div>
    <section id='convos-modal-wrapper'>
      <div id='convos-body'>
        <div id='close-convos-btn'>
          <span class='close-bar-one'></span>
          <span class='close-bar-two'></span>
        </div>
        <h2>My Conversations</h2>
        <div id='conversations-container'>";
?>
        <?php
          unset($_SESSION['unread_msg_arr']);
          include_once "../includes/myConversations.php";
        ?>
<?php
  //closing tags for wrapper, body, and container
  echo "
        </div>
      </div>
    </section>";
?>