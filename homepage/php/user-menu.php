<?php
  echo '
    <ul class="user-menu">
      <li>
        <a href="/profile" id="my-profile-btn"><i class="fa fa-user-circle"></i> &nbsp;Profile</a>
      </li>
      <li id="my-notifications-btn">
        <i class="fa fa-bell-o"></i> &nbsp; Notifications<span id="noti-badge">!</span>
      </li>
      <li id="my-conversations-btn">
        <i class="fa fa-comments-o"></i> &nbsp;Conversations <span id="convo-badge">!</span>
      </li>
      <li id="my-deliveries-btn">
        <i class="fa fa-truck"></i> &nbsp;My Deliveries
      </li>
      <li id="logout-btn">
        <i class="fa fa-sign-out"></i>&nbsp; Logout
      </li>
    </ul>
  ';
?>