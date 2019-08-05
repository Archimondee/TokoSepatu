import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item, Textarea, Label, Card } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_barang: this.props.navigation.getParam('id_barang'),
      nama_barang: this.props.navigation.getParam('nama_barang'),
      harga: this.props.navigation.getParam('harga'),
      foto_base641: this.props.navigation.getParam('foto_base641'),
      tipe1: this.props.navigation.getParam('tipe1'),
    };
  }


  //Pake dimensions

  render() {
    var { height, width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <View style={{ height: 70, width: width, flex: 0.07, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <TouchableOpacity style={{ flex: 0.1, paddingLeft: 10 }} onPress={() => this.props.navigation.navigate('Product')}>
            <Ionicons name="ios-arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={{ color: 'black', fontSize:18 }}>Confirmation</Text>
          </View>
        </View>

        <Card style={{ flex: 0.2, paddingTop:20, paddingLeft:10, paddingRight:10 }}>
          <View style={{flex:1, flexDirection:'row', height:150, width:width, paddingBottom:10}}>
            <View style={{flex:1.5, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
              <View style={{ height: 100, width: 100, borderColor: 'black', borderWidth: 1}}>
                {
                  this.state.foto_base641 && <Image
                    source={{ uri: 'data:image/' + this.state.tipe1 + ';base64,' + this.state.foto_base641 }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                }
              </View>
            </View>
            <View style={{ flex: 3, flexDirection:'column'}}>
              <View style={{paddingLeft:5, paddingTop:5}}>
                <Text>{this.state.nama_barang}</Text>
              </View>
              <View style={{paddingLeft:5, paddingTop:5}}>
                <Text>Rp. {this.state.harga}</Text>
              </View>
            </View>
          </View>
        </Card>
        <View style={{padding:10, marginLeft:15, marginRight:15}}>
          <Button block onPress={() => this.props.navigation.navigate('Checkout',{
            id_barang: this.state.id_barang,
            nama_barang: this.state.nama_barang,
            harga: this.state.harga,
            foto_base641: this.state.foto_base641,
            tipe1: this.state.tipe1
          })}>
            <Text style={{color:'white'}}>Checkout</Text>
          </Button>
        </View>
        <View style={{padding:10, marginLeft:15, marginRight:15}}>
          <Button block>
            <Text style={{color:'white'}}>Cancel</Text>
          </Button>
        </View>
      </View>
    );
  }
}
