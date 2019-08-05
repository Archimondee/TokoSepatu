<?php
    include 'Config.php';
    $con = mysqli_connect($hostname, $user, $password, $db);
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $username = $obj['username'];
    $user_id = uniqid();
    $email = $obj['email'];
    $password = password_hash($obj['password'], PASSWORD_DEFAULT);

    $nama = $obj['nama'];
    $alamat = $obj['alamat'];
    $telepon = $obj['telepon'];
    $foto = $obj['foto'];
    $tipe = $obj['tipe'];

    $check_sql = "SELECT *  FROM user where user_id = '$user_id' ";
    $check = mysqli_fetch_array(mysqli_query($con, $check_sql));

    if(isset($check)){
        $exist_msg = 'User ID is already exist';
        $exist_json = json_encode($exist_msg);
        echo $exist_json;
    }else{
        $sql_query = "INSERT INTO user (user_id, username, email, password) 
        values ('$user_id', '$username', '$email', '$password')";

        $sql = "INSERT into user_info(user_id, nama, alamat, telepon, foto, tipe_foto) values ('$user_id', '$nama','$alamat','$telepon', '$foto', '$tipe')";

        if(mysqli_query($con, $sql_query)){
            $user_info = mysqli_query($con, $sql);
            $msg = 'Success';
            $json = json_encode($msg);
            echo $json;
        }else{
            echo 'Try again';
        }
    }
    mysqli_close($con);
