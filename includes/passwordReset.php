<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Lobster|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" href="login.css">
	<title>Login Form</title>
</head>
<body>
	<div class="container">
		<div class="header">
			<div id="header-logo"><a href="foodbin.php">Foodbin</a></div>
		</div>
		<form action="includes/login-inc.php" method="POST" id="login-form">
			<input type="text" name="email" placeholder="Email" required="required"/>
      <input type="text" name="token" placeholder="Token" required="required"/>
			<input type="submit" name="submit" id="login-btn" value="Login"/>
		</form>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script type="text/javascript" src="login.js"></script>
</body>
</html>
