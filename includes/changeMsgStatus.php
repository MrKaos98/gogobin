<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['sender'])){
  $sender = $_POST['sender'];
}
$id = $_SESSION['user_id'];
$getUnreadMsgs = "SELECT * FROM msg_system WHERE recipient_id='$id' AND sender_id='$sender' AND msg_status='unread';";
$msgResult = mysqli_query($conn, $getUnreadMsgs);
$msgResultNum = mysqli_num_rows($msgResult);
$unreadMsgArr = mysqli_fetch_all($msgResult, MYSQLI_ASSOC);
if($msgResultNum > 0){
  for($x = 0; $x < $msgResultNum; $x++){
    $msgId = $unreadMsgArr[$x]['msg_id'];
    $changeToRead = "UPDATE msg_system SET msg_status='read' WHERE msg_id='$msgId';";
    mysqli_query($conn, $changeToRead);
  }
}
