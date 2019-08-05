<?php
    include 'Config.php';
    $con = mysqli_connect($hostname, $user, $password, $db);
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $id_barang = uniqid();
	$nama_barang = $obj['nama_barang'];
	
	$foto1 = $obj['foto1'];
	$tipe1 = $obj['tipe1'];
	$foto2 = $obj['foto2'];
	$tipe2 = $obj['tipe2'];
	$foto3 = $obj['foto3'];
	$tipe3 = $obj['tipe3'];
	
	$harga = (int)$obj['harga'];
	
	$kota_penjual = $obj['kota_penjual'];
	$kategori = $obj['kategori'];
	$stock = (int)$obj['stock'];
	$sizeMin = (int)$obj['sizeMin'];
	$sizeMax = (int)$obj['sizeMax'];
	$keterangan = $obj['keterangan'];
	

    $check_sql = "SELECT *  FROM barang where id_barang = '$id_barang' ";
    $check = mysqli_fetch_array(mysqli_query($con, $check_sql));

    if(isset($check)){
        $exist_msg = 'Barang ID is already exist';
        $exist_json = json_encode($exist_msg);
        echo $exist_json;
    }else{
        $sql_query = "INSERT INTO barang (id_barang, nama_barang,foto1, tipe1, foto2, tipe2, foto3, tipe3, kota_penjual, kategori, stock, sizeMin, sizeMax, keterangan, harga) 
        values ('$id_barang', '$nama_barang', '$foto1', '$tipe1','$foto2', '$tipe2', '$foto3','$tipe3', '$kota_penjual', '$kategori','$stock','$sizeMin','$sizeMax','$keterangan', '$harga')";

        if(mysqli_query($con, $sql_query)){
            $msg = 'Success';
            $json = json_encode($msg);
            echo $json;
        }else{
            echo 'Try again';
        }
    }
    mysqli_close($con);
