import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Image, AsyncStorage, Dimensions } from 'react-native';
import {Container, Header, Content, Card, CardItem} from 'native-base';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama : '',
      username: '',
      data:[]
    };
  }

  _getItems = () => {
    fetch('http://192.168.0.7:8080/api_sepatu/getItem.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    }).then((response) => response.json())
      .then((responseJson => {
        this.setState({
          data: responseJson
        })
      }))
  }

  componentDidMount(){
    this._getItems();
    AsyncStorage.getItem('username').then((value)=>{
      if(value!=''){
        this.setState({
          username: value
        })

        fetch('http://192.168.0.7:8080/api_sepatu/getInfo.php',{
          method: 'POST',
          header: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            username: value
          })
        }).then((response)=>response.json())
          .then((responseJson)=>{
            this.setState({
              nama: responseJson[0].nama || ''
            })
            
            let Profile = {
              nama : responseJson[0].nama || '',
              username : responseJson[0].username || '',
              email : responseJson[0].email || '',
              foto : responseJson[0].foto || '',
              tipe_foto : responseJson[0].tipe_foto || '',
              user_id : responseJson[0].user_id,
              alamat : responseJson[0].alamat,
              telpon : responseJson[0].telepon
            }
            AsyncStorage.setItem('Profile', JSON.stringify(Profile));
          })
      }
    })
  }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <ImageBackground source={require('../../assets/bg.png')} style={{width:'100%', height:'100%'}}>
        <SafeAreaView style={{ flex: 1 }}>
          <Container style={{ marginTop: 20 }}>
            <Content padder>
              <View style={{ height: 100, width: '95%', paddingLeft: 10, margin: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'black' }}>
                <Text>Banner</Text>
              </View>
              <Card style={{}}>
                <CardItem header bordered style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', backgroundColor:'#2f5aa4' }}>
                  <Text style={{fontWeight:'bold', color:'white'}}>Produsen Sepatu</Text>
                </CardItem>
                <CardItem cardBody style={{ flexDirection: 'column' }}>
                  <View style={{ flex: 1, height: 100, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', margin: 10 }}>
                      <Image source={require('../../assets/pic/Logo/adidasl.jpg')} resizeMode='stretch' style={{height:'100%', width:'100%'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', margin: 10 }}>
                      <Image source={require('../../assets/pic/Logo/Diadoral.png')} resizeMode='stretch' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', margin: 10 }}>
                      <Image source={require('../../assets/pic/Logo/guccil.png')} resizeMode='stretch' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, height: 100, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', margin: 10 }}>
                      <Image source={require('../../assets/pic/Logo/nikel.jpg')} resizeMode='stretch' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', margin: 10 }}>
                      <Image source={require('../../assets/pic/Logo/pierol.gif')} resizeMode='stretch' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', margin: 10 }}>
                      <Image source={require('../../assets/pic/Logo/vansl.png')} resizeMode='stretch' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                  </View>
                </CardItem>
              </Card>
              <Card>
                <CardItem header bordered style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', backgroundColor: '#2f5aa4' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>Rekomendasi</Text>
                </CardItem>
                <CardItem cardBody style={{ flex: 1, flexDirection: 'row', width:'100%', flexWrap:'wrap'}}>

                {
                  this.state.data.map((items, i)=>{
                    return (
                      <View style={{ width: 140, borderWidth: 1, borderColor: 'black', margin: 10, height: 250 }} key={i}>
                        <View style={{ flex: 1, borderWidth: 1, borderColor: 'black', margin: 10 }}>
                          {
                            items.foto1 ? <Image
                              source={{ uri: 'data:image/' + items.tipe1 + ';base64,' + items.foto1 }}
                              style={{ width: '100%', height: '100%' }}
                              resizeMode="contain"
                            /> : null  
                          }
                        </View>
                        <View style={{ flex: 1, margin: 10 }}>
                          <View style={{ flex: 0.7 }}>
                            <Text style={{}}>{items.nama_barang}</Text>
                            <Text style={{}}>Rp. {items.harga}</Text>
                          </View>
                          <View style={{ flex: 0.3 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Product',{
                              id_barang: items.id_barang,
                              nama_barang: items.nama_barang,
                              foto1: items.foto1,
                              tipe1: items.tipe1,
                              foto2: items.foto2,
                              tipe2: items.tipe2,
                              foto3: items.foto3,
                              tipe3: items.tipe3,
                              harga: items.harga,
                              kota_penjual: items.kota_penjual,
                              kategori: items.kategori,
                              stock: items.stock,
                              sizeMin: items.sizeMin,
                              sizeMax: items.sizeMax,
                              keterangan: items.keterangan
                            })} style={{ height: 30, width: '100%', borderWidth: 1, borderColor: 'white', padding: 2, backgroundColor: '#2f5aa4' }}>
                              <Text style={{ textAlign: 'center', color: 'white' }}>View</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )
                  })
                }
                </CardItem>
              </Card>
            </Content>
          </Container>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
