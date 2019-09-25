import React, { Component } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Image } from 'react-native';
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
      nama:'',
      foto: '',
      tipe_foto:''
    };
  }
 
  componentDidMount = () => {
    AsyncStorage.getItem('Profile').then((value) => {
      let data = JSON.parse(value);
      //console.log(value);
      if (data != null) {
        this.setState({
          nama: data.nama,
          foto: data.foto,
          tipe_foto: data.tipe_foto
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
                <Image
                  source={{ uri: 'data:image/' + this.state.tipe_foto + ';base64,' + this.state.foto }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={{ flex: 1, alignContent:'center', alignSelf:'center'}}>
              <Text style={{color:'white'}}>{this.state.nama}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1.5, paddingTop: 10 }}>
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
