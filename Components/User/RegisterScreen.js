import React, { Component } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, AsyncStorage, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from 'native-base';
import { async } from 'rsvp';




export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : '',
      confirm : '',
      email : '',
    };
  }

  _CheckRegister=()=>{
    const {username, confirm, password, email} = this.state;
    var benar = 5;
    var pesan = '';

    if(username == ''){
      benar -= 1;
      pesan += "Username belum di isi\n";
    }

    if (email == '') {
      benar -= 1;
      pesan += "Email belum di isi\n";
    }

    if (password  == '') {
      benar -= 1;
      pesan += "Password belum di isi\n";
    }

    if (confirm == '') {
      benar -= 1;
      pesan += "Confirm Password belum di isi\n";
    }

    if(confirm == password){
      benar -= 1
    }else{
      pesan += 'Password tidak sama\n';
    }

    // == 
    if(benar == 4){
      this.props.navigation.navigate('UserRegister',{
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    }else{
      alert(pesan);
    }
  }

  render() {
    return (

      <View style={{ paddingTop: 30, flex: 1, width: '100%' }}>
        <KeyboardAvoidingView style={{ flex: 1, width: '100%', height:'100%'}} behavior="padding" enabled>
          <Content padder>
            <View style={{ flex: 2, paddingTop: '10%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ height: 200, width: 200 }}>
              <Image source={require('../../assets/toko-logo.jpg')} resizeMode={"contain"} style={{height:200, width:200}}/>
            </View>
            </View>
            <View style={{ flex: 1, paddingTop: 50 }}>
              <View style={{ paddingTop: 15 }}>
                <Item floatingLabel >
                  <Label style={{ color: 'black' }}> Email </Label>
                  <Input onChangeText={email => this.setState({ email })} />
                </Item>
              </View>
              <View style={{ paddingTop: 15 }}>
                <Item floatingLabel >
                  <Label style={{ color: 'black' }}> Username </Label>
                  <Input onChangeText={username => this.setState({ username })} />
                </Item>
              </View>
              <View style={{ paddingTop: 15 }}>
                <Item floatingLabel >
                  <Label style={{ color: 'black' }}> Password </Label>
                  <Input secureTextEntry={true} onChangeText={password => this.setState({ password })} />
                </Item>
              </View>
              <View style={{ paddingTop: 15 }}>
                <Item floatingLabel >
                  <Label style={{ color: 'black' }}> Confirm Password </Label>
                  <Input secureTextEntry={true} onChangeText={confirm => this.setState({ confirm })} />
                </Item>
              </View>
              <View style={{ paddingTop: 25 }}>
                <Button block style={{ backgroundColor: '#2f5aa4' }} onPress={this._CheckRegister}>
                  <Text style={{ color: 'white' }}>Register</Text>
                </Button>
              </View>
            </View>
          </Content>
       </KeyboardAvoidingView>
      </View>
    );
  }
}
