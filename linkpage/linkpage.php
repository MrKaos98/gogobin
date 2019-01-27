<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Gogobin | Change Password</title>
  <link rel="stylesheet" href="linkpage.css">
  <link href="https://fonts.googleapis.com/css?family=Lobster|Ubuntu" rel="stylesheet">
</head>
<body>
  <?php
    if(isset($_GET["email"]) && isset($_GET["token"])){
      include_once "dbh-inc.php";
      $email = mysqli_real_escape_string($conn, $_GET["email"]);
      $token = mysqli_real_escape_string($conn, $_GET["token"]);
      $selectQuery = "SELECT * FROM users WHERE user_email=? AND user_token=?;";
      $stmt = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt, $selectQuery)){
        header("Location: ../foodbin.php?pwd-stmt-error");
        exit();
      } else {
        mysqli_stmt_bind_param($stmt, "ss", $email, $token);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $resultRows = mysqli_num_rows($result);
        if($resultRows > 0){
          echo "
            <section id='main-wrapper'>
              <div id='form-wrapper'>
                <div id='header-logo'><a href='foodbin.php'>Gogobin</a></div>
                <h4>Change Password</h4>
                <form action='includes/changepwd.php' method='POST'>
                  <input type='text' id='user-email' name='email' value='$email' hidden/>
                  <input type='text' name='token' value='$token' hidden/>
                  <input type='text' id='pwd-field-one' name='pwd' placeholder='Password' autocomplete='off' required>
                  <p id='prev-pwds'>Cannot use previous passwords</p>
                  <input type='text' id='pwd-field-two' name='pwd-two' placeholder='Confirm Password' autocomplete='off' required>
                  <p id='pwds-unmatched'>Passwords don't match</p>
                  <input type='submit' id='pwd-submit-btn' name='submit' value='Submit'>
                </form>
              </div>
            </section>
          ";
        } else {
          header("Location: foodbin.php?reroute");
          exit();
        }
      }
    } else {
      header("Location: ../inputphysics.com?reroute");
      exit();
    }
  ?>
  <script type="text/javascript" src="linkpage.js"></script>
</body>
</html>
