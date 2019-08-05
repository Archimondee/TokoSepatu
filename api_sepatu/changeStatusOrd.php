<?php
	include 'Config.php';
	$conn = new mysqli($hostname, $user, $password, $db);
	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	
	$id_pembelian = $obj['id_pembelian'];
	$id_barang = $obj['id_barang'];
	if($conn->connect_error){
        die('Connection failed: '. $conn->connect_error);
    }
  
    //select * from user, user_info where user.username = 'gg' AND user.user_id = user_info.user_id
    
	$sql = "UPDATE pembelian set status_pembelian = '3' where id_pembelian='$id_pembelian' AND id_barang='$id_barang'";
	
	if(mysqli_query($conn, $sql)){
        $msg = 'Diterima';
        $json = json_encode($msg);
    }else{
        $msg = 'Ada kesalahan';
		$json = json_encode($msg);
    }
    echo $json;
    $conn->close();
