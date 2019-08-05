import React, { Component } from 'react';
import { Text, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Title, ScrollableTab  } from 'native-base';
import { Ionicons} from 'react-native-vector-icons';

import DoneScreen from './DoneScreen';
import PayScreen from './PayScreen';
import PacketScreen from './PacketScreen';
import SendScreen from './SendScreen';

export default class PesananScreen extends Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{paddingTop:30}}>
        <Header hasTabs style={{ backgroundColor:'#2f5aa4'}}>
          <Body>
            <Text style={{color:'white', fontSize:18}}>Pesanan Saya</Text>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading="Pembelian" tabStyle={{ backgroundColor: '#2f5aa4' }} activeTabStyle={{ backgroundColor: '#2f5aa4' }}>
            <PacketScreen navigation={navigation}/>
          </Tab>
          <Tab heading="Selesai" tabStyle={{ backgroundColor: '#2f5aa4' }} activeTabStyle={{ backgroundColor: '#2f5aa4' }}>
            <SendScreen navigation={navigation}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}