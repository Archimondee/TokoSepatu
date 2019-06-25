import React, { Component } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Textarea,
  Card,
  CardItem,
  Left, Right
} from 'native-base';
import {Ionicons} from 'react-native-vector-icons';


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama:''
    };
  }
 
  componentDidMount = () => {
    AsyncStorage.getItem('Profile').then((value) => {
      let data = JSON.parse(value);
      //console.log(value);
      if (data != null) {
        this.setState({
          nama: data.nama,
        })
      }
    })
  }

  componentDidUpdate() {
    AsyncStorage.getItem('Profile').then((value) => {
      let data = JSON.parse(value);
      //console.log(value);
      if (data != null) {
        this.setState({
          nama: data.nama,
        })
      }
    })
  }

    _signOutAsync = async ()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, height:'100%', width: '100%', paddingTop: 30 }} behavior="padding">
        <View style={{ flex: 0.3, backgroundColor:'#2f5aa4' }}>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:0.5, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
              <View style={{ height: 50, width: 50, borderColor: 'white', borderWidth: 1 }}>
                <Text style={{ color: 'white' }}> Photo </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignContent:'center', alignSelf:'center'}}>
              <Text style={{color:'white'}}>{this.state.nama}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1.5, paddingTop: 10 }}>
          <Card style={{ paddingTop: 10, paddingBottom:10, flex:0.25}}>
            <View style={{flex:0.4}}>
              <View style={{ flex: 1, flexDirection: 'column', alignContent: 'space-between', justifyContent:'center', alignItems:'center', borderBottomColor:'black', borderBottomWidth:0.2, marginLeft:10, marginRight:10 }}>
                <Left style={{ flex: 0.5, paddingLeft:10, paddingTop:10, alignSelf:'flex-start' }}>
                  <Text>Pesanan Saya</Text>
                </Left>
                <TouchableOpacity style={{ flex: 0.5, paddingRight: 10, paddingBottom:30, alignSelf:'flex-end' }}>
                  <Text>Lihat riwayat > </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:0.5, flexDirection:'row', justifyContent:'space-between', paddingTop:10}}>
              <View style={{ flex: 0.4, alignItems: 'center', flexDirection: 'column', height: 100}}>
                <Ionicons name="ios-wallet" size={32} color="black" />
                <Text>Belum Bayar</Text>
              </View>
              <View style={{ flex: 0.4, alignItems: 'center', flexDirection: 'column', height: 100 }}>
                <Ionicons name="ios-wallet" size={32} color="black" />
                <Text>Belum Bayar</Text>
              </View>
              <View style={{ flex: 0.4, alignItems: 'center', flexDirection: 'column', height: 100 }}>
                <Ionicons name="ios-wallet" size={32} color="black" />
                <Text>Belum Bayar</Text>
              </View>
            </View>
          </Card>
          <Card>
            <CardItem bordered button onPress={() => this.props.navigation.navigate('ChangeScreen')}>
              <Text>Pengaturan Akun</Text>
            </CardItem>
            <CardItem bordered button >
              <Text>Bantuan</Text>
            </CardItem>
            <CardItem button onPress={()=>this._signOutAsync()}>
              <Text>Logout</Text>
            </CardItem>
          </Card>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
