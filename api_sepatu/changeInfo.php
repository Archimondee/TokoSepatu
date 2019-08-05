<?php 
  include "Config.php";
    $con = mysqli_connect($hostname, $user, $password, $db);
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $username = $obj['username'];
    $email = $obj['email'];
    $user_id=$obj['user_id'];
    //$password = password_hash($obj['password'], PASSWORD_DEFAULT);

     $nama = $obj['nama'];
     $alamat = $obj['alamat'];
     $telepon = $obj['telepon'];
     $foto = $obj['foto'];
     $tipe = $obj['tipe'];

    $query = "update user set email = '$email' where username = '$username'";

     $query1 = "update user_info set nama='$nama', alamat='$alamat', telepon='$telepon', foto='$foto', tipe_foto='$tipe' where user_id = '$user_id'";

    if(mysqli_query($con, $query)){
        $check = mysqli_query($con, $query1);
        $msg = 'Data Update';

        $json = json_encode($msg);
        echo $json;
    }else{
        echo 'Ada kesalahan';
    }

    mysqli_close($con);
?>