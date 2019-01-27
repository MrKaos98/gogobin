<?php
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $first = mysqli_real_escape_string($conn, $_POST['first']);
  $last = mysqli_real_escape_string($conn, $_POST['last']);
  $fbId = mysqli_real_escape_string($conn, $_POST['fb-id']);
  $sqlCheck = "SELECT * FROM fb_users WHERE user_first='$first' AND user_last='$last' AND fb_id='$fbId';";
  $resultCheck = mysqli_query($conn, $sqlCheck);
  $resultCheckRows = mysqli_num_rows($resultCheck);
  if($resultCheckRows > 0){
    header("Location: ../login.php?userexists=error");
    exit();
  } else {
    $sql = "INSERT INTO fb_users (user_first, user_last, fb_id) VALUES ('$first', '$last', '$fbId');";
    mysqli_query($conn, $sql);
    session_start();
    $row = mysqli_fetch_assoc(mysqli_query($conn, $sqlCheck));
    //$_SESSION['user_id'] = $row['id'];
    $_SESSION['user_first'] = $row['user_first'];
    $_SESSION['user_last'] = $row['user_last'];
    header("Location: ../foodbin.php?fblogin=success");
    exit();
  }
} else {
  header("Location: ../foodbin.php?submit=error");
  exit();
}
