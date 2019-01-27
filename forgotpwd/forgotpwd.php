<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Gogobin | Forgot Password</title>
  <link href="https://fonts.googleapis.com/css?family=Lobster|Ubuntu" rel="stylesheet">
  <link type="text/css" rel="stylesheet" href="forgotpwd.css">
</head>
<body>
  <section id="main-wrapper">
    <div id="form-wrapper">
      <div id="header-logo"><a href="foodbin.php">Gogobin</a></div>
      <h4>Forgot Password</h4>
      <form action="includes/sendpwdmail.php" method="POST">
        <input type="text" id="username-field" name="username" placeholder="Username" autocomplete="off" required>
        <p id="username-dne">Username does not exist</p>
        <input type="text" id="email-field" name="email" placeholder="Email" autocomplete="off" required>
        <p id="email-dne">Email not in records</p>
        <p id="user-error">Username / Email Error</p>
        <input type="text" id="confirm-field" name="confirm-email" placeholder="Confirm Email" autocomplete="off" required>
        <p id="email-match">Emails must match</p>
        <input type="submit" id="change-submit-btn" name="submit" value="Send Email">
      </form>
    </div>
  </section>
  <script type="text/javascript" src="forgotpwd.js"></script>
</body>
</html>
