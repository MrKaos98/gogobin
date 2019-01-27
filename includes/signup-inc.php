<?php

if (isset($_POST['submit'])){
	session_start();
	include_once 'dbh-inc.php';

	$first = mysqli_real_escape_string($conn, $_POST['first']);
	$last = mysqli_real_escape_string($conn, $_POST['last']);
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$username = mysqli_real_escape_string($conn, $_POST['username']);
	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
	$city = mysqli_real_escape_string($conn, $_POST['city']);

	if (empty($first) || empty($last) || empty($email) || empty($username) || empty($pwd) || empty($city)) {
		header("Location: ../join/signup.php?empty-field");
		exit();
	} else {
		if (!preg_match("/^[a-zA-Z ]*$/", $first) || !preg_match("/^[a-zA-Z ]*$/", $last)) {
			header("Location: ../join/signup.php?invalid-chars");
			exit();
		} else {
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
				header("Location: ../join/signup.php?invalid-email");
				exit();
			} else {
				$usernameCheck = "SELECT * FROM users WHERE user_username=? OR user_email=?;";
				$stmt1 = mysqli_stmt_init($conn);
				if(!mysqli_stmt_prepare($stmt1, $usernameCheck)){
					header("Location: ../join/signup.php?stmt-unprepared");
					exit();
				} else {
					mysqli_stmt_bind_param($stmt1, "ss", $username, $email);
					mysqli_stmt_execute($stmt1);
					$result = mysqli_stmt_get_result($stmt1);
					$resultRows = mysqli_num_rows($result);
					if($resultRows > 0){
						header("Location: ../join/signup.php?user-taken");
						exit();
					} else {
						$hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
						$insertUser = "INSERT INTO users (user_first, user_last, user_username, user_email, user_pwd, user_city) VALUES (?, ?, ?, ?, ?, ?);";
						$stmt2 = mysqli_stmt_init($conn);
						if(!mysqli_stmt_prepare($stmt2, $insertUser)){
							header("Location: ../join/signup.php?stmt2-error");
							exit();
						} else {
							mysqli_stmt_bind_param($stmt2, "ssssss", $first, $last, $username, $email, $hashedPwd, $city);
							mysqli_stmt_execute($stmt2);
							$getUserData = "SELECT * FROM users WHERE user_username=? AND user_email=?;";
							$stmt3 = mysqli_stmt_init($conn);
							if(!mysqli_stmt_prepare($stmt3, $getUserData)){
								header("Location: ../join/signup.php?stmt3-error");
								exit();
							} else {
								mysqli_stmt_bind_param($stmt3, "ss", $username, $email);
								mysqli_stmt_execute($stmt3);
								$result3 = mysqli_stmt_get_result($stmt3);
								$resultRows3 = mysqli_num_rows($result3);
								if($resultRows3 <= 0){
									header("Location: ../join/signup.php?user-none");
									exit();
								} else {
									$row = mysqli_fetch_assoc($result3);
									$userId = $row['id'];
									$setUserImg = "INSERT INTO imgupload (user_id, img_status) VALUES (?, 1);";
									$stmt4 = mysqli_stmt_init($conn);
									if(!mysqli_stmt_prepare($stmt4, $setUserImg)){
										header("Location: ../join/signup.php?stmt3-error");
										exit();
									} else {
										mysqli_stmt_bind_param($stmt4, "s", $userId);
										mysqli_stmt_execute($stmt4);
										session_start();
										$_SESSION['user_id'] = $row['id'];
										$_SESSION['user_first'] = $row['user_first'];
										$_SESSION['user_last'] = $row['user_last'];
										$_SESSION['user_email'] = $row['user_email'];
										$_SESSION['user_username'] = $row['user_username'];
										$_SESSION['user_city'] = $row['user_city'];
										header("Location: ../homepage/foodbin.php?logged-in");
										exit();
									}
								}
							}
						}
					}
				}
			}
		}
	}

} else {
	header("Location: ../join/signup.php");
	exit();
}
