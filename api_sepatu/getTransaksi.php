<?php
	include 'Config.php';
	$conn = new mysqli($hostname, $user, $password, $db);
	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	
	if($conn->connect_error){
        die('Connection failed: '. $conn->connect_error);
    }
  
    //select * from user, user_info where user.username = 'gg' AND user.user_id = user_info.user_id
    
	$sql = "SELECT * FROM pembelian where status_pembelian = '1' or status_pembelian = '2' or status_pembelian = '3'";
	
	$result = $conn->query($sql);
    if($result->num_rows>0){
        while($row[]=$result->fetch_assoc()){
            $item = $row;
            $json = json_encode($item);
        }
    }else{
        echo "Tidak ditemukan";
    }
    echo $json;
    $conn->close();
