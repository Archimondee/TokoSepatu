import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item, Textarea, Label, Card } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';

export default class InformationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  //Pake dimensions

  render() {
    var { height, width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, paddingTop: 32 }}>
        <View style={{ height: 70, width: width, flex: 0.07, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <TouchableOpacity style={{ flex: 0.1, paddingLeft: 10 }} onPress={() => this.props.navigation.navigate('Checkout')}>
            <Ionicons name="ios-arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={{ color: 'black', fontSize: 18 }}>Informasi Barang</Text>
          </View>
        </View>
        <View style={{ marginTop: 5, paddingBottom: 5, marginBottom: 5, paddingTop: 5 }}>
        </View>
        <Card style={{ flex: 0.25, paddingTop: 20, marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10 }} >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2, paddingLeft: 5 }}>
              <View style={{ height: 100, width: 100, borderColor: 'black', borderWidth: 1 }}>
                <Text>Photo</Text>
              </View>
            </View>
            <View style={{ flex: 3, justifyContent: 'space-between', alignContent: 'space-between', height: 80 }}>
              <Text style={{ fontSize: 16 }}>Merk Sepatu</Text>
              <Text style={{ fontSize: 12 }}>Harga</Text>
              <Text style={{ fontSize: 14 }}>Nama Toko</Text>
            </View>
          </View>
        </Card>
        <Card style={{ flex: 0.15, marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10 }} >
          <View style={{ paddingTop: 5, paddingBottom: 5 }}>
            <Text style={{ fontSize: 16 }}>Dikirim Ke</Text>
            <View style={{ paddingTop: 5 }}>
              <Text>Nama : Gilang Aditya R</Text>
              <View style={{ flexWrap: 'wrap' }}>
                <Text>Alamat : Informasi Alamat</Text>
              </View>
            </View>
          </View>
        </Card>
        <Card style={{ flex: 0.2, marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10 }} >
          <View style={{ paddingTop: 5, paddingBottom: 5 }}>
            <Text style={{ fontSize: 16 }}>Transfer Ke</Text>
            <View style={{paddingTop:5}}>
              <Text>Bank : 08121021021 An Gilang</Text>
              <Text>Sejumlah : Harga</Text>
              <Text>Konfirmasi : 0813111111 </Text>
            </View>
          </View>
        </Card>
        
        <View style={{ padding: 10, marginLeft: 15, marginRight: 15 }}>
          <Button block onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={{ color: 'white' }}>Selesai</Text>
          </Button>
        </View>
      </View>
    );
  }
}
