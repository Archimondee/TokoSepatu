<?php 
  include "Config.php";
    $con = mysqli_connect($hostname, $user, $password, $db);
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $id_pembelian = $obj['id_pembelian'];
    
    $query = "update pembelian set status_pembelian = '1' where id_pembelian = '$id_pembelian'";

     $query1 = "update bukti_pembayaran set status_foto = '1' where id_pembelian = '$id_pembelian'";

    if(mysqli_query($con, $query)){
        $check = mysqli_query($con, $query1);
        $msg = 'Terupdate';

        $json = json_encode($msg);
        echo $json;
    }else{
        echo 'Ada kesalahan';
    }

    mysqli_close($con);
?>