import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
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


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user_id: ''
    };
  }

  _userLogin = () => {
    const {username, password} = this.state;
    fetch('http://192.168.0.7:8080/api_sepatu/Login.php',{
      method: 'POST',
      headers:{
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response)=>response.json())
        .then((responseJson=>{
          if(responseJson == 'Logged In'){
            alert('Login Successfull');
            this._signInAsync();
            this.props.navigation.navigate('Home');
          }else{
            alert('Wrong username or password');
          }
        }))
  }

  _signInAsync = async () =>{
    const {username} = this.state;
    await AsyncStorage.setItem('username', username);
  }

  render() {
    return (
      <SafeAreaView style={{paddingTop:30, flex:1,  width:'100%'}}>
        <Content padder>
          <View style={{ flex: 2, paddingTop:'10%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 200, width: 200, borderColor: 'black', borderWidth: 1 }}>
              <Text>Logo</Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingTop:50 }}>
            <View style={{ paddingTop: 15 }}>
              <Item floatingLabel >
                <Label style={{ color: 'black' }}> Username </Label>
                <Input onChangeText={username => this.setState({username})} />
              </Item>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Item floatingLabel >
                <Label style={{ color: 'black' }}> Password </Label>
                <Input secureTextEntry={true} onChangeText={password => this.setState({ password })} />
              </Item>
            </View>
            <View style={{ paddingTop: 25 }}>
              <Button block style={{ backgroundColor: '#2f5aa4' }} onPress={this._userLogin}>
                <Text style={{color:'white'}}>Login</Text>
              </Button>
            </View>
            <TouchableOpacity style={{ paddingTop: 10, alignSelf: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Register')}>
              <Text>Dont have an account ? <Text style={{color:'#2f5aa4'}}>Here</Text></Text>
            </TouchableOpacity>
          </View>
        </Content>
      </SafeAreaView>
    );
  }
}
