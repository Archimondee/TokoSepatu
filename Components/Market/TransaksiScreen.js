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
  Form
} from 'native-base';
import {Ionicons} from 'react-native-vector-icons';
import {ImagePicker} from 'expo';


export default class TransaksiScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      id_pembelian: this.props.navigation.getParam('id_pembelian'),
      id_barang: this.props.navigation.getParam('id_barang'),
      nama_barang: this.props.navigation.getParam('nama_barang'),
      user_id: this.props.navigation.getParam('user_id'),
      nama_pembeli: this.props.navigation.getParam('nama_pembeli'),
      harga: this.props.navigation.getParam('harga'),
      foto_barang:this.props.navigation.getParam('foto_barang'),
      tipe_foto: this.props.navigation.getParam('tipe_foto'),
      alamat: this.props.navigation.getParam('alamat'),
      pesan: this.props.navigation.getParam('pesan'),
      status_pembelian: this.props.navigation.getParam('status_pembelian'),

      foto_base64: null,
      tipe: 'jpg',
      isPic: false,

      no_rek: '',
      nama_rek: '',
      bank_rek: ''
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    })

    if (!result.cancelled) {
      let test = result.uri;
      let hasil = test.substring(test.lastIndexOf('.') + 1);

      let test_base64 = 'data:image/' + hasil + ';base64,' + result.base64;
      this.setState({ foto_base64: result.base64, tipe: hasil, isPic:true });
    } else if (result == null) {
      this.setState({ foto_base64: null, tipe: 'jpeg', isPic:false })
    } else {
      this.setState({ foto_base64: null, tipe: 'jpeg', isPic:false })
    }
  }

  _submit=()=>{
    const {id_pembelian, id_barang, nama_barang, user_id, nama_pembeli, harga, foto_barang, tipe_foto, alamat, pesan, status_pembelian, foto_base64, tipe, isPic, no_rek, nama_rek, bank_rek} = this.state;

    if(isPic==false){
      alert('Silahkan upload bukti transaksi');
    }else{
      fetch('http://simlabtiug.com/api_sepatu/PostPembayaran.php',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_pembelian: id_pembelian,
          id_barang: id_barang,
          nama_barang:nama_barang,
          harga: harga,
          user_id: user_id,
          nama_pembeli:nama_pembeli,
          nama_rekening: nama_rek,
          bank_penerima: bank_rek,
          no_rekening: no_rek,
          foto_bukti: foto_base64,
          tipe_foto: tipe,
          status_foto: 1
        })
      }).then((response) => response.json())
      .then((responseJson => {
        if (responseJson == 'Terkirim') {
          alert('Informasi Terkirim');
          this.props.navigation.navigate('Pembelian');
        }
      }))
    }
  }

  pindah=()=>{
    console.log('Pindah pindahhh');
    this.props.navigation.navigate('Pembelian')
  }

  render() {
    var {height, width} = Dimensions.get ('window');
    return (
      <View style={{flex:1, paddingTop:30}}>
        <Header>
          <Left>
            <TouchableOpacity onPress={this.pindah}>
              <Ionicons name="ios-arrow-back" size={32} color="white" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>Upload Bukti Transaksi</Text>
          </Body>
          <Right />
        </Header>
        <View style={{ paddingBottom:5, marginBottom:5, paddingTop:10, padding:10}}>
          <Card style={{height:300}}>
            <View style={{padding:10}}>
              <Text>Informasi Barang</Text>
            </View>
            <View style={{height:200, flexDirection:'row', paddingTop:10 }}>
              <View style={{flex:1.3, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:'70%',height:'90%', borderWidth:1, borderColor:'blue'}}>
                {
                  this.state.foto_barang && <Image
                    source={{ uri: 'data:image/' + this.state.tipe_foto + ';base64,' + this.state.foto_barang }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                }
                </View>
              </View>
              <View style={{flex:1,justifyContent:'space-around', alignContent:'center'}}>
                <Text>Transaksi : {this.state.id_pembelian}</Text>
                <Text>Nama Barang : {this.state.nama_barang}</Text>
                <Text>Harga : {this.state.harga}</Text>
                <Text>Nama : {this.state.nama_pembeli}</Text>
              </View>
            </View>
          </Card>
          <Card style={{height:300, paddingTop:10}}>
            <View style={{padding:10}}>
              <Text>Informasi Rekening</Text>
            </View>
            <View style={{height:200, flexDirection:'row', paddingTop:10 }}>
              <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:'85%',height:'85%', borderWidth:1, borderColor:'blue', alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                  {
                  this.state.foto_base64 && <Image
                    source={{ uri: 'data:image/' + this.state.tipe + ';base64,' + this.state.foto_base64 }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  /> 
                }
                </View>
                <View style={{paddingTop:10, width:'85%', justifyContent:'center', alignItems:'center'}}>
                  <Button onPress={()=>this._pickImage()} style={{width:'100%', justifyContent:'center', alignContent:'center'}}>
                    <Text style={{color:'white'}}>Upload</Text>
                  </Button>
                </View>
                
                
              </View>
              <View style={{flex:1,justifyContent:'space-around', alignContent:'center',}}>
                <Form>
                  <Item>
                    <Input onChangeText={no_rek => this.setState({ no_rek })} placeholder="No Rekening" />
                  </Item>
                  <Item>
                    <Input onChangeText={nama_rek => this.setState({ nama_rek })} placeholder="Nama Rekening" />
                  </Item>
                  <Item>
                    <Input onChangeText={bank_rek => this.setState({ bank_rek })} placeholder="Nama Bank" />
                  </Item>
                  <View style={{paddingTop:15, width:'100%', justifyContent:'center', alignItems:'center', alignContent:'center',alignSelf:'center'}}>
                    <Button onPress={()=>this._submit()} style={{width:'90%', justifyContent:'center', alignContent:'center'}}>
                      <Text style={{color:'white'}}>Submit</Text>
                    </Button>
                  </View>
                </Form>
              </View>
            </View>
          </Card>
        </View>
      </View>
    )
  }
}
