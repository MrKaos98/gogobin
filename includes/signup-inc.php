<?php
include_once "dbh-inc.php";
if (!isset($_POST['submit'])){
  header("Location: ../signup/signup.php");
	exit();
}
class NewUser {
  public $new_user = [];
  private $empty_value_present;
  public function __construct($first, $last, $email, $username, $pwd, $city){
    $this->new_user['first'] = $first;
    $this->new_user['last'] = $last;
    $this->new_user['email'] = $email;
    $this->new_user['username'] = $username;
    $this->new_user['pwd'] = $pwd;
    $this->new_user['city'] = $city;
  }
  public function process_user(){
    $user_arr_length = count($this->new_user);
    foreach($this->new_user as $part){
      $isEmpty = $this->check_for_empties($part);
      if($isEmpty){
        $this->empty_value_present = true;
        $this->end_process('empty values', $part);
        return;
      } else {
        $this->empty_value_present = false;
      }
    }
    if(!$this->empty_value_present){
      $this->validate_first_last();
    }
  }
  private function check_for_empties($part){
    $part = trim($part);
    if(empty($part)){
      return true;
    } else {
      return false;
    }
  }
  private function validate_first_last(){
    $first = $this->new_user['first'];
    $last = $this->new_user['last'];
    if (!preg_match("/^[a-zA-Z ]*$/", $first) || !preg_match("/^[a-zA-Z ]*$/", $last)) {
      $this->end_process('first-last-invalid', $this->new_user['first']);
    } else {
      $this->validate_email();
    }
  }
  private function validate_email(){
    $email = $this->new_user['email'];
    $email_valid = filter_var($email, FILTER_VALIDATE_EMAIL);
    if($email_valid){
      $this->check_existing_users_prep();
    } else {
      $this->end_process('email invalid', $this->new_user['email']);
    }
  }
  private function check_existing_users_prep(){
    $sql_check_existing = "SELECT * FROM users WHERE user_username = ? OR user_email = ?";
    $stmt = mysqli_stmt_init($GLOBALS['conn']);
    $prep_valid = mysqli_stmt_prepare($stmt, $sql_check_existing);
    if(!$prep_valid){
      $this->end_process($prep_valid, 'check-fail');
    } else {
      $this->check_existing_users($stmt);
    }
  }
  private function check_existing_users($stmt){
    $username = $this->new_user['username'];
    $email = $this->new_user['email'];
    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $resultRows = mysqli_num_rows($result);
    if($resultRows > 0){
      $this->end_process('user exists', 'exists');
    } else {
      $this->add_new_user_prep();
    }
  }
  private function add_new_user_prep(){
    $sql_add_user = "INSERT INTO users (user_first, user_last, user_email, user_username, user_pwd, user_city) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($GLOBALS['conn']);
    $prep_valid = mysqli_stmt_prepare($stmt, $sql_add_user);
    if(!$prep_valid){
      $this->end_process('add_user_fail', 'add-user');
    } else {
      $this->add_new_user($stmt);
    }
  }
  private function add_new_user($stmt){
    $first = $this->new_user['first'];
    $last = $this->new_user['last'];
    $email = $this->new_user['email'];
    $username = $this->new_user['username'];
    $pwd = password_hash($this->new_user['pwd'], PASSWORD_DEFAULT);
    $city = $this->new_user['city'];
    mysqli_stmt_bind_param($stmt, "ssssss", $first, $last, $email, $username, $pwd, $city);
    mysqli_stmt_execute($stmt);
    $this->retrieve_user_prep();
  }
  private function retrieve_user_prep(){
    $sql_get_new_user = "SELECT * FROM users WHERE user_username = ? AND user_email = ?";
    $stmt = mysqli_stmt_init($GLOBALS['conn']);
    $prep_valid = mysqli_stmt_prepare($stmt, $sql_get_new_user);
    if(!$prep_valid){
      $this->end_process('get_user_fail', 'new-user');
    } else {
      $this->retrieve_user($stmt);
    }
  }
  private function retrieve_user($stmt){
    $username = $this->new_user['username'];
    $email = $this->new_user['email'];
    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $result_rows = mysqli_num_rows($result);
    if($result_rows > 0){
      $row = mysqli_fetch_assoc($result);
      $userId = $row['id'];
      $this->set_default_img_prep($userId);
    } else {
      $this->end_process('retrieve_fail', 'retrieval-fail');
    }
  }
  private function set_default_img_prep($id){
    $sql_insert_img = "INSERT INTO imgupload (user_id, img_status) VALUES (?, 1);";
    $stmt = mysqli_stmt_init($GLOBALS['conn']);
    $prep_valid = mysqli_stmt_prepare($stmt, $sql_insert_img);
    if(!$prep_valid){
      $this->end_process('img_insert_fail', 'img-prep');
    } else {
      $this->set_default_img($stmt, $id);
    }
  }
  private function set_default_img($stmt, $id){
    mysqli_stmt_bind_param($stmt, "s", $id);
    mysqli_stmt_execute($stmt);
    session_start();
    $_SESSION['user_id'] = $id;
    $_SESSION['user_first'] = $this->new_user['first'];
    $_SESSION['user_last'] = $this->new_user['last'];
    $_SESSION['user_email'] = $this->new_user['email'];
    $_SESSION['user_username'] = $this->new_user['username'];
    $_SESSION['user_city'] = $this->new_user['city'];
    header("Location: ../homepage/gogobin.php?new-user");
    exit();
  }
  private function end_process($cause, $val){
    header("Location: ../signup/signup.php?error=$cause&value=$val");
    exit();
  }
}

$first = mysqli_real_escape_string($GLOBALS['conn'], $_POST['first']);
$last = mysqli_real_escape_string($GLOBALS['conn'], $_POST['last']);
$email = mysqli_real_escape_string($GLOBALS['conn'], $_POST['email']);
$username = mysqli_real_escape_string($GLOBALS['conn'], $_POST['username']);
$pwd = mysqli_real_escape_string($GLOBALS['conn'], $_POST['pwd']);
$city = mysqli_real_escape_string($GLOBALS['conn'], $_POST['city']);
$new_user = new NewUser($first, $last, $email, $username, $pwd, $city);
$new_user->process_user();