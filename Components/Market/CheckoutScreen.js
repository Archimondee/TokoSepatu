import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item, Textarea, Label, Card } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';

export default class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama_barang: this.props.navigation.getParam('nama_barang'),
      harga: this.props.navigation.getParam('harga'),
      foto_base641: this.props.navigation.getParam('foto_base641'),
      tipe1: this.props.navigation.getParam('tipe1'),
      id_barang: this.props.navigation.getParam('id_barang'),

      alamat: null,
      pesan: '',
    };
  }

  _checkInput(){
    const {alamat, id_barang, pesan, harga, foto_base641, tipe1, nama_barang} = this.state;
    if(alamat == null || alamat == ''){
      alert('Kolom alamat tidak boleh kosong');
    }else{
      this.props.navigation.navigate('Information',{
        id_barang: id_barang,
        nama_barang: nama_barang,
        harga: harga,
        foto_base641: foto_base641,
        tipe1: tipe1,

        alamat: alamat,
        pesan: pesan,
      })
    }
  }


  //Pake dimensions

  render() {
    var { height, width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, paddingTop: 32 }}>
        <View style={{ height: 70, width: width, flex: 0.07, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <TouchableOpacity style={{ flex: 0.1, paddingLeft: 10 }} onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={{ color: 'black', fontSize: 18 }}>Checkout</Text>
          </View>
        </View>
        <View style={{marginTop:5, paddingBottom:5, marginBottom:5, paddingTop:5}}>
        </View>
        <Card style={{ flex: 0.25, marginLeft: 10, marginRight: 10, paddingLeft:10, paddingRight:10 }} >
          <View style={{paddingTop:5, paddingBottom:5}}>
            <Text style={{fontSize:16}}> Alamat</Text>
            <Textarea onChangeText={alamat => this.setState({ alamat })} rowSpan={3} bordered placeholder="Informasi Alamat" />
          </View>
        </Card>
        <Card style={{ flex: 0.25, marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10 }} >
          <View style={{ paddingTop: 5, paddingBottom: 5 }}>
            <Text style={{ fontSize: 16 }}> Pesan</Text>
            <Textarea onChangeText={pesan => this.setState({ pesan })} rowSpan={3} bordered placeholder="Informasi Pesan" />
          </View>
        </Card>
        <Card style={{ flex: 0.25, paddingTop: 20, marginLeft: 10, marginRight: 10, paddingLeft:10, paddingRight:10 }} >
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:2, paddingLeft:5}}>
              <View style={{height:100, width:100, borderColor:'black', borderWidth: 1}}>
                {
                  this.state.foto_base641 && <Image
                    source={{ uri: 'data:image/' + this.state.tipe1 + ';base64,' + this.state.foto_base641 }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                }
              </View>
            </View>
            <View style={{ flex: 3, justifyContent:'space-between', alignContent:'space-between', height:80 }}>
              <Text style={{fontSize:16}}>{this.state.nama_barang}</Text>
              <Text style={{fontSize:12}}>Rp. {this.state.harga}</Text>
            </View>
          </View>
        </Card>
        <View style={{ padding: 10, marginLeft: 15, marginRight: 15 }}>
          <Button block onPress={() => this._checkInput()}>
            <Text style={{ color: 'white' }}>Buy</Text>
          </Button>
        </View>
      </View>
    );
  }
}
