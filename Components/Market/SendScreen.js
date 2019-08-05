import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {List, ListItem, Left, Right, Body, SwipeRow, Card} from 'native-base';
import {Ionicons} from 'react-native-vector-icons';
//import console = require('console');

export default class SendScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      nama: '',
      user_id: '',
      data: [],
    };
  }

  componentDidMount () {
    AsyncStorage.getItem ('Profile').then (value => {
      let data = JSON.parse (value);
      //console.log(value);
      if (data != null) {
        this.setState ({
          nama: data.nama,
          user_id: data.user_id,
        });
        this._getItem ();
      }
    });
  }

  _getItem () {
    const {nama, user_id} = this.state;
    fetch ('http://192.168.0.7:8080/api_sepatu/getSelesai.php', {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        nama: nama,
        user_id: user_id,
      }),
    })
      .then (response => response.json ())
      .then (responseJson => {
        this.setState ({
          data: responseJson,
        });
        console.log ('Data : ' + this.state.data);
      });
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          {this.state.data.map ((items, i) => {
            if (items.status_pembelian == '0') {
              status = 'Menunggu Pembayaran';
            } else if (items.status_pembelian == '1') {
              status = 'Pembayaran sedang di proses';
            } else if (items.status_pembelian == '2') {
              status = 'Barang sedang dikirim';
            } else if (items.status_pembelian == '3') {
              status = 'Barang telah di terima';
            }
            return (
              <Card
                key={i}
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              >
                <SwipeRow
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  disableLeftSwipe={true}
                  disableRightSwipe={true}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 5,
                  }}
                  body={
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 3.3, flexWrap: 'wrap'}}>
                        <Text style={{color: 'black', paddingBottom: 3}}>
                          {items.nama_barang}
                        </Text>
                        <Text style={{color: 'black'}}>
                          {items.id_pembelian}
                        </Text>
                      </View>
                      <View style={{flex: 3}}>
                        <Text style={{color: 'black', paddingBottom: 3}}>
                          Status
                        </Text>
                        <Text style={{color: 'black'}}>
                          {status}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                      >
                        {//Awal input bukti transaksi
                        items.status_pembelian == '0'
                          ? <TouchableOpacity
                              onPress={() =>
                                navigate ('Transaksi', {
                                  id_pembelian: items.id_pembelian,
                                  id_barang: items.id_barang,
                                  nama_barang: items.nama_barang,
                                  user_id: items.user_id,
                                  nama_pembeli: items.nama_pembeli,
                                  harga: items.harga,
                                  foto_barang: items.foto_barang,
                                  tipe_foto: items.tipe_foto,
                                  alamat: items.alamat,
                                  pesan: items.pesan,
                                  status_pembelian: items.status_pembelian,
                                })}
                            >
                              <Ionicons
                                name="ios-arrow-forward"
                                size={32}
                                color="black"
                              />
                            </TouchableOpacity>
                          : null}

                        {//Bukti transaksi bisa di edit
                        items.status_pembelian == '1'
                          ? <TouchableOpacity
                              onPress={() =>
                                navigate ('Transaksi1', {
                                  id_pembelian: items.id_pembelian,
                                  id_barang: items.id_barang,
                                  nama_barang: items.nama_barang,
                                  harga: items.harga,
                                  nama_pembeli: items.nama_pembeli,
                                  foto_barang: items.foto_barang,
                                  tipe: items.tipe,
                                  status_pembelian: items.status_pembelian,
                                  alamat: items.alamat,
                                  pesan: items.pesan,
                                })}
                            >
                              <Ionicons
                                name="ios-arrow-forward"
                                size={32}
                                color="black"
                              />
                            </TouchableOpacity>
                          : null}

                        {//Acc pembelian barang
                        items.status_pembelian == '2'
                          ? <TouchableOpacity
                              onPress={() =>
                                navigate ('Penerima', {
                                  id_pembelian: items.id_pembelian,
                                  id_barang: items.id_barang,
                                  nama_barang: items.nama_barang,
                                  user_id: items.user_id,
                                  nama_pembeli: items.nama_pembeli,
                                  harga: items.harga,
                                  foto_barang: items.foto_barang,
                                  tipe_foto: items.tipe_foto,
                                  alamat: items.alamat,
                                  pesan: items.pesan,
                                  status_pembelian: items.status_pembelian,
                                })}
                            >
                              <Ionicons
                                name="ios-arrow-forward"
                                size={32}
                                color="black"
                              />
                            </TouchableOpacity>
                          : null}

                      </View>
                    </View>
                  }
                />
              </Card>
            );
          })}

        </ScrollView>
      </View>
    );
  }
}
