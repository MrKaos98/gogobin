<?php
include_once "dbh-inc.php";

class ReturningUser {
  private $returning_user = [];
  public function __construct($username, $pwd){
    $this->returning_user['username'] = $username;
    $this->returning_user['pwd'] = $pwd;
  }
  public function process_user(){
    foreach($this->returning_user as $part){
      $isEmpty = $this->check_for_empties($part);
      if($isEmpty){
        $this->end_process('empty_value');
        return;
      }
    }
    $this->check_username_prep();
  }
  private function check_username_prep(){
    $sql_check_username = "SELECT * FROM users WHERE user_username = ?";
    $stmt = mysqli_stmt_init($GLOBALS['conn']);
    $prep_valid = mysqli_stmt_prepare($stmt, $sql_check_username);
    if(!$prep_valid){
      $this->end_process('user_check_prep');
    } else {
      $this->check_username($stmt);
    }
  }
  private function check_username($stmt){
    $username = $this->returning_user['username'];
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $result_rows = mysqli_num_rows($result);
    if($result_rows > 0){
      $row = mysqli_fetch_assoc($result);
      $this->verify_password($row);
    } else {
      $this->end_process($this->returning_user['username']);
    }
  }
  private function verify_password($row){
    $pwd = $this->returning_user['pwd'];
    $pwd_valid = password_verify($pwd, $row['user_pwd']);
    if(!$pwd_valid){
      $this->end_process($pwd);
    } else {
      $this->start_session($row);
    }
  }
  private function start_session($row){
    session_start();
    $_SESSION['user_id'] = $row['id'];
    $_SESSION['user_first'] = $row['user_first'];
    $_SESSION['user_last'] = $row['user_last'];
    $_SESSION['user_email'] = $row['user_email'];
    $_SESSION['user_username'] = $row['user_username'];
    $_SESSION['user_city'] = $row['user_city'];
    header("Location: ../homepage/gogobin.php?logged-in");
    exit();
  }
  private function check_for_empties($val){
    if(empty($val)){
      return true;
    } else {
      return false;
    }
  }
  private function end_process($val){
    header("Location: ../homepage/gogobin.php?error=$val");
    exit();
  }
}

$username = mysqli_real_escape_string($GLOBALS['conn'], $_POST['username']);
$pwd = mysqli_real_escape_string($GLOBALS['conn'], $_POST['pwd']);
$ret_user = new ReturningUser($username, $pwd);
$ret_user->process_user();