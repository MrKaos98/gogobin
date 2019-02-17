<?php
include_once "dbh-inc.php";

class UsernamePwdCheck {
  private $returning_user = [];
  public function __construct($username, $pwd){
    $this->returning_user['username'] = $username;
    $this->returning_user['password'] = $pwd;
  }
  public function process_user(){
    foreach($this->returning_user as $part){
      $isEmpty = $this->empty_val_check($part);
      if($isEmpty){
        $this->end_process('empty-field');
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
      $this->end_process('username-check-fail');
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
      $this->end_process('invalid-username');
    }
  }
  private function verify_password($row){
    $pwd = $this->returning_user['password'];
    $pwd_valid = password_verify($pwd, $row['user_pwd']);
    if(!$pwd_valid){
      $this->end_process('invalid-pwd');
    }
  }
  private function empty_val_check($part){
    if(empty($part)){
      return true;
    }
    return false;
  }
  private function end_process($error){
    exit($error);
  }
}

$username = mysqli_real_escape_string($GLOBALS['conn'], $_POST['username']);
$pwd = mysqli_real_escape_string($GLOBALS['conn'], $_POST['pwd']);
$ret_user = new UsernamePwdCheck($username, $pwd);
$ret_user->process_user();