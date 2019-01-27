<?php

if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  $username = mysqli_real_escape_string($conn, $_POST['username']);
  $pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
  if(empty($username) || empty($pwd)){
    header("Location: ../homepage/gogobin.php?login=empty");
    exit();
  } else {
    $sql = "SELECT * FROM users WHERE user_username=?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
      header("Location: ../homepage/gogobin.php?statement=unprepared");
      exit();
    } else {
      mysqli_stmt_bind_param($stmt, "s", $username);
      mysqli_stmt_execute($stmt);
      $result = mysqli_stmt_get_result($stmt);
      $resultRows = mysqli_num_rows($result);
      $row = mysqli_fetch_assoc($result);
      if(!($resultRows > 0)){
        header("Location: ../homepage/gogobin.php?login=nouser");
        exit();
      } else {
        $unhashedpwd = password_verify($pwd, $row['user_pwd']);
        if(!$unhashedpwd){
          header("Location: ../homepage/gogobin.php?login=error");
          exit();
        } else if ($unhashedpwd) {
          session_start();
          $_SESSION['user_id'] = $row['id'];
          $_SESSION['user_first'] = $row['user_first'];
          $_SESSION['user_last'] = $row['user_last'];
          $_SESSION['user_email'] = $row['user_email'];
          $_SESSION['user_username'] = $row['user_username'];
          $_SESSION['user_city'] = $row['user_city'];
          header("Location: ../homepage/gogobin.php");
          exit();
        }
      }
    }
  }
} else {
  header("Location: ../homepage/gogobin.php?login=failed");
  exit();
}
