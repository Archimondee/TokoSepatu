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
  Form,
} from 'native-base';
import {Ionicons} from 'react-native-vector-icons';
import {ImagePicker} from 'expo';

export default class Transaksi1Screen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      id_pembelian: this.props.navigation.getParam ('id_pembelian'),
      id_barang: this.props.navigation.getParam ('id_barang'),
      nama_barang: this.props.navigation.getParam ('nama_barang'),
      nama_pembeli: this.props.navigation.getParam ('nama_pembeli'),
      harga: this.props.navigation.getParam ('harga'),
      foto_barang: this.props.navigation.getParam ('foto_barang'),
      tipe_foto: this.props.navigation.getParam ('tipe_foto'),
      alamat: this.props.navigation.getParam ('alamat'),
      pesan: this.props.navigation.getParam ('pesan'),
      status_pembelian: this.props.navigation.getParam ('status_pembelian'),

      no_rek: '',
      nama_rek: '',
      bank_rek: '',

      data: [],
    };
  }

  _getRekening = () => {
    const {id_pembelian} = this.state;
    fetch ('http://192.168.0.7:8080/api_sepatu/getRek.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        id_pembelian: id_pembelian,
      }),
    })
      .then (response => response.json ())
      .then (responseJson => {
        this.setState ({
          data: responseJson,
        });
      });
  };

  componentDidMount () {
    this._getRekening ();
  }

  _submit = () => {
    const {id_pembelian, id_barang} = this.state;
    console.log (id_pembelian);
    console.log (id_barang);
    fetch ('http://192.168.0.7:8080/api_sepatu/changeStatus.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        id_pembelian: id_pembelian,
        id_barang: id_barang,
      }),
    })
      .then (response => response.json ())
      .then (responseJson => {
        if (responseJson == 'Bukti di acc') {
          alert ('Berhasil');
          this.props.navigation.navigate ('Home');
        } else {
          alert ('Terjadi kesalahan');
        }
      });
  };

  pindah=()=>{
    console.log('Pindah pindahhh');
    this.props.navigation.navigate('Pesanan')
  }
  render () {
    var {height, width} = Dimensions.get ('window');
    return (
      <View style={{flex: 1, paddingTop: 30}}>
        <Header>
          <Left>
            <TouchableOpacity onPress={this.pindah}>
              <Ionicons name="ios-arrow-back" size={32} color="white" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>Lihat Bukti Transaksi</Text>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            paddingBottom: 5,
            marginBottom: 5,
            paddingTop: 10,
            padding: 10,
          }}
        >
          <Card style={{height: 300}}>
            <View style={{padding: 10}}>
              <Text>Informasi Barang</Text>
            </View>
            <View style={{height: 200, flexDirection: 'row', paddingTop: 10}}>
              <View
                style={{
                  flex: 1.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '70%',
                    height: '90%',
                    borderWidth: 1,
                    borderColor: 'blue',
                  }}
                >
                  {this.state.foto_barang
                    ? <Image
                        source={{
                          uri: 'data:image/' +
                            this.state.tipe +
                            ';base64,' +
                            this.state.foto_barang,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="contain"
                      />
                    : null}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}
              >
                <Text>Transaksi : {this.state.id_pembelian}</Text>
                <Text>Nama Barang : {this.state.nama_barang} </Text>
                <Text>Harga : {this.state.harga} </Text>
                <Text>Nama : {this.state.nama_pembeli}</Text>
              </View>
            </View>
          </Card>
          <Card style={{height: 300, paddingTop: 10}}>
            <View style={{padding: 10}}>
              <Text>Informasi Rekening</Text>
            </View>
            <View style={{height: 200, flexDirection: 'row', paddingTop: 10}}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '85%',
                    height: '85%',
                    borderWidth: 1,
                    borderColor: 'blue',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {this.state.data.map ((items, i) => {
                    return (
                      <Image
                        key={i}
                        source={{
                          uri: 'data:image/' +
                            items.tipe_foto +
                            ';base64,' +
                            items.foto_bukti,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="contain"
                      />
                    );
                  })}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}
              >
                {this.state.data.map ((items, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        justifyContent: 'space-around',
                        alignContent: 'space-around',
                      }}
                    >
                      <Item>
                        <Input disabled onChangeText={no_rek => this.setState({ no_rek })} placeholder="No Rekening" defaultValue={items.no_rekening}/>
                      </Item>
                      <Item>
                        <Input disabled onChangeText={nama_rek => this.setState({ nama_rek })} placeholder="Nama Rekening" defaultValue={items.nama_rekening}/>
                      </Item>
                      <Item>
                        <Input disabled onChangeText={bank_rek => this.setState({ bank_rek })} placeholder="Nama Bank" defaultValue={items.bank_penerima}/>
                      </Item>
                    </View>
                  );
                })}
                <View
                  style={{
                    paddingTop: 15,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}
                >
                  
                </View>
              </View>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}
