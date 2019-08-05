<?php 
  include "Config.php";
    $con = mysqli_connect($hostname, $user, $password, $db);
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
	
	$id_bukti = 'BKT-'.uniqid();
    $id_pembelian = $obj['id_pembelian'];
    $id_barang = $obj['id_barang'];
    $nama_barang = $obj['nama_barang'];
    $harga = $obj['harga'];
    $user_id = $obj['user_id'];
    $nama_pembeli = $obj['nama_pembeli'];
	$nama_rekening = $obj['nama_rekening'];
    $bank_penerima = $obj['bank_penerima'];
    $no_rekening = $obj['no_rekening'];
    $foto_bukti = $obj['foto_bukti'];
    $tipe_foto = $obj['tipe_foto'];
	$status_foto = $obj['status_foto'];
    
    

    $query = "INSERT INTO bukti_pembayaran(id_pembelian, id_barang, nama_barang, harga, user_id, nama_pembeli, bank_penerima, no_rekening, foto_bukti, tipe_foto, nama_rekening, status_foto, id_bukti) VALUES ('$id_pembelian','$id_barang','$nama_barang','$harga','$user_id','$nama_pembeli','$bank_penerima','$no_rekening','$foto_bukti','$tipe_foto','$nama_rekening','$status_foto','$id_bukti')";
	
	$query1 = "UPDATE PEMBELIAN set status_pembelian = 1 where id_pembelian='$id_pembelian'";
	
    if(mysqli_query($con, $query)){
        $msg = 'Terkirim';
		
		mysqli_query($con, $query1);
        $json = json_encode($msg);
        echo $json;
    }else{
        echo 'Ada kesalahan';
    }

    mysqli_close($con);
