import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Input,
  Item,
  Textarea,
  Label,
  Card,
} from 'native-base';
import {Ionicons} from 'react-native-vector-icons';

export default class InformationScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      id_barang: this.props.navigation.getParam ('id_barang'),
      nama_barang: this.props.navigation.getParam ('nama_barang'),
      harga: this.props.navigation.getParam ('harga'),
      foto_base641: this.props.navigation.getParam ('foto_base641'),
      tipe1: this.props.navigation.getParam ('tipe1'),

      alamat: this.props.navigation.getParam ('alamat'),
      pesan: this.props.navigation.getParam ('pesan'),
      nama: '',
      user_id: '',
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem ('Profile').then (value => {
      let data = JSON.parse (value);
      //console.log(value);
      if (data != null) {
        this.setState ({
          nama: data.nama,
          user_id: data.user_id,
        });
      }
    });
  };

  _inputPembelian = () => {
    const {
      id_barang,
      nama_barang,
      harga,
      foto_base641,
      tipe1,
      alamat,
      pesan,
      nama,
      user_id,
    } = this.state;
    //console.log(this.state);
    fetch ('http://192.168.0.7:8080/api_sepatu/PostPembelian.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        id_barang: id_barang,
        nama_barang: nama_barang,
        harga: harga,
        user_id: user_id,
        nama_pembeli: nama,
        foto_barang: foto_base641,
        tipe_foto: tipe1,
        alamat: alamat,
        pesan: pesan
      }),
    })
      .then (response => response.json ())
      .then (responseJson => {
        if (responseJson == 'Terbeli') {
          alert ('Barang sudah di beli\n Silahkan masuk ke menu pembelian');
          this.props.navigation.navigate ('Pembelian');
        } else {
          alert ('Terjadi kesalahan');
        }
      }).catch((error)=>{
        console.log(error);
      });
  };

  //Pake dimensions

  render () {
    var {height, width} = Dimensions.get ('window');
    return (
      <View style={{flex: 1, paddingTop: 32}}>
        <View
          style={{
            height: 70,
            width: width,
            flex: 0.07,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <TouchableOpacity
            style={{flex: 0.1, paddingLeft: 10}}
            onPress={() => this.props.navigation.navigate ('Checkout')}
          >
            <Ionicons name="ios-arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <View style={{flex: 0.8}}>
            <Text style={{color: 'black', fontSize: 18}}>Informasi Barang</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            paddingBottom: 5,
            marginBottom: 5,
            paddingTop: 5,
          }}
        />
        <Card
          style={{
            flex: 0.25,
            paddingTop: 20,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 2, paddingLeft: 5}}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              >
                {this.state.foto_base641 &&
                  <Image
                    source={{
                      uri: 'data:image/' +
                        this.state.tipe1 +
                        ';base64,' +
                        this.state.foto_base641,
                    }}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />}
              </View>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'space-around',
                alignContent: 'space-around',
                height: 80,
              }}
            >
              <Text style={{fontSize: 16}}>{this.state.nama_barang}</Text>
              <Text style={{fontSize: 16}}> Rp. {this.state.harga}</Text>
            </View>
          </View>
        </Card>
        <Card
          style={{
            flex: 0.3,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Text style={{fontSize: 16}}>Dikirim Ke</Text>
            <View style={{paddingTop: 5}}>
              <Text>
                Nama : {this.state.nama} {
                  //belum
                }
              </Text>
              <View style={{flexWrap: 'wrap'}}>
                <Text>Alamat : {this.state.alamat}</Text>
              </View>
              <View style={{flexWrap: 'wrap'}}>
                <Text>Pesan : {this.state.pesan}</Text>
              </View>
            </View>
          </View>
        </Card>
        <Card
          style={{
            flex: 0.3,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Text style={{fontSize: 16}}>Transfer Ke</Text>
            <View style={{paddingTop: 5}}>
              <Text>Bank : 08121021021 An Gilang</Text>
              <Text>Sejumlah : Rp. {this.state.harga}</Text>
              <Text>Upload bukti pembayaran pada tab pembelian</Text>
            </View>
          </View>
        </Card>

        <View style={{padding: 10, marginLeft: 15, marginRight: 15}}>
          <Button block onPress={() => this._inputPembelian()}>
            <Text style={{color: 'white'}}>Selesai</Text>
          </Button>
        </View>
      </View>
    );
  }
}
