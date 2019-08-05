<?php 
  include "Config.php";
    $con = mysqli_connect($hostname, $user, $password, $db);
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $id_pembelian = 'INV-'.uniqid();
    $id_barang = $obj['id_barang'];
    $nama_barang = $obj['nama_barang'];
    $user_id = $obj['user_id'];
    $nama_pembeli = $obj['nama_pembeli'];
    $harga = $obj['harga'];
    $foto_barang = $obj['foto_barang'];
    $tipe_foto = $obj['tipe_foto'];
    $alamat = $obj['alamat'];
    $pesan = $obj['pesan'];

    $query = "INSERT INTO pembelian(id_pembelian,id_barang, nama_barang, user_id, nama_pembeli, harga, foto_barang, tipe_foto, alamat, pesan) VALUES ('$id_pembelian','$id_barang','$nama_barang','$user_id','$nama_pembeli','$harga','$foto_barang','$tipe_foto','$alamat','$pesan')";

    if(mysqli_query($con, $query)){
        $msg = 'Terbeli';

        $json = json_encode($msg);
        echo $json;
    }else{
        echo 'Ada kesalahan';
    }

    mysqli_close($con);
