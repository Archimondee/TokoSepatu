<?php 
    include "Config.php";
    $con = mysqli_connect($hostname, $user, $password, $db);
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    
    $username = $obj['username'];
    $password = $obj['password'];

    if(isset($username) && isset($password)){
        $sql_query = "SELECT * FROM user where username = '$username'";
        $check = mysqli_fetch_array(mysqli_query($con, $sql_query));
        if(isset($check)){
            if($check['username']){
                if(password_verify($password, $check['password'])){
                    $success_msg = 'Logged In';
                    $success_json = json_encode($success_msg);
                    echo $success_json;
                }else{
                    $invalid_msg = 'Invalid username or password. Please try again';
                    $invalid_json = json_encode($invalid_msg);
                    echo $invalid_json;
                }
            } 
        }else{
            $invalid_msg = 'Invalid username or password. Please try again';
            $invalid_json = json_encode($invalid_msg);
            echo $invalid_json;
        }
    }else{
        $invalid_msg = 'Username and Password cant be blank';
        $invalid_json = json_encode($invalid_msg);
        echo $invalid_json;
    }
    
    mysqli_close($con);
