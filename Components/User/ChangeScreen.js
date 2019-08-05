import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, AsyncStorage, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item, Textarea, Label, Card} from 'native-base';
import {Ionicons} from 'react-native-vector-icons';

export default class ChangeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      username : '',
      nama : '',
      telpon : '',
      password: '',
      alamat: '',
      foto: '',
      tipe_foto: '',
      user_id: ''
    };
  }


  //Pake dimensions
  componentDidMount=()=>{
    AsyncStorage.getItem('Profile').then((value)=>{
      let data = JSON.parse(value);
      //console.log(value);
      if(data != null){
        this.setState({
          email : data.email,
          username: data.username,
          nama: data.nama,
          telpon: data.telpon,
          password: data.password,
          alamat: data.alamat,
          foto: data.foto,
          tipe_foto: data.tipe_foto,
          user_id: data.user_id
        })
      }
    })
  }

  _changeInfo=()=>{
    const {email, username, nama, telpon, password, alamat, foto, tipe_foto, user_id} = this.state;

    fetch('http://192.168.0.7:8080/api_sepatu/changeInfo.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        user_id:user_id,

        nama:nama,
        alamat:alamat,
        telepon:telpon,
        foto:foto,
        tipe:tipe_foto
      })
    }).then((response) => response.json())
      .then((responseJson => {
        if (responseJson == 'Data Update') {
          alert('Data telah diubah');
          AsyncStorage.removeItem('Profile');
            let Profile = {
              email:email,
              username:username,
              nama:nama,
              telpon: telpon,
              alamat:alamat,
              foto:foto,
              tipe_foto:tipe_foto,
              user_id:user_id
            }
          AsyncStorage.setItem('Profile', JSON.stringify(Profile));
          this.props.navigation.navigate('Beranda');
        } else {
          alert('Galat terjadi');
        }
      }))
    
  }

  render() {
    var { height, width } = Dimensions.get('window');
    return (
      <View style={{flex:1, paddingTop:30}}>
        <View style={{height:70, width:width, flex:0.10, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'white'}}>
          <TouchableOpacity style={{ flex: 0.1, paddingLeft: 10 }} onPress={() => this.props.navigation.navigate('Beranda')}>
            <Ionicons name="ios-arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={{color:'black'}}>Pengaturan Akun</Text>
          </View>
          <TouchableOpacity onPress={()=>this._changeInfo()} style={{ flex: 0.1, alignContent:'flex-end' }}>
            <Ionicons name="md-checkmark" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.3, backgroundColor: '#2f5aa4', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <View style={{height:100, width:100, backgroundColor:'white', alignContent:'center', alignSelf:'center', justifyContent:'center' }}>
            <Image
              source={{ uri: 'data:image/' + this.state.tipe_foto + ';base64,' + this.state.foto }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </View>
        <Card style={{flex:0.65, paddingLeft:10, paddingRight:10}}>
          <View style={{ paddingTop: 15 }}>
            <Item floatingLabel >
              <Label style={{ color: 'black' }}> Email </Label>
              <Input onChangeText={email => this.setState({email})} value={this.state.email} />
            </Item>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Item floatingLabel disable >
              <Label style={{ color: 'black' }}> Username </Label>
              <Input disable value={this.state.username} />
            </Item>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Item floatingLabel >
              <Label style={{ color: 'black' }}> Nama </Label>
              <Input onChangeText={nama => this.setState({nama})} value={this.state.nama} />
            </Item>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Item floatingLabel >
              <Label style={{ color: 'black' }}> Telpon </Label>
              <Input onChangeText={telpon => this.setState({telpon})} value={this.state.telpon} />
            </Item>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Textarea onChangeText={alamat => this.setState({alamat})} value={this.state.alamat} rowSpan={3} bordered placeholder="Alamat" />
          </View>
        </Card>
      </View>
    );
  }
}
