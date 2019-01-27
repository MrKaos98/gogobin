<?php
if(isset($_POST["pwd"]) && isset($_POST["username"]) && isset($_POST["email"])){
  include_once "dbh-inc.php";
  $email = mysqli_real_escape_string($conn, $_POST["email"]);
  $pwd = mysqli_real_escape_string($conn, $_POST["pwd"]);
  $checkQuery = "SELECT * FROM users WHERE user_email=? AND user_pwd=?;";
  $stmt = mysqli_stmt_init($conn);
  if(mysqli_stmt_prepare($stmt, $checkQuery)){
    mysqli_stmt_bind_param($stmt, "ss", $email, $pwd);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $resultRows = mysqli_num_rows($result);
    if($resultRows > 0){
      echo "yes";
    }
  }
}
