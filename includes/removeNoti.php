<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
  $id = $_SESSION['user_id'];
  $delQuery = "DELETE FROM notification_system WHERE noti_id='$notiId' AND recipient_id='$id';";
  mysqli_query($conn, $delQuery);
  if(isset($_POST['from'])){
    header("Location: ../homepage/foodbin.php?remove-success");
    exit();
  }
  header("Location: ../profile/profile.php?remove-success");
  exit();
} else {
  if(isset($_POST['from'])){
    header("Location: ../homepage/foodbin.php?remove-error");
    exit();
  }
  header("Location: ../profile/profile.php?remove-error");
  exit();
}
