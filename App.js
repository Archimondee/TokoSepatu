import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import LoginScreen from './Components/User/LoginScreen';
import RegisterScreen from './Components/User/RegisterScreen';
import UserScreen from './Components/User/UserScreen';
import ProfileScreen from './Components/User/ProfileScreen';

import PesananScreen from './Components/Market/PesananScreen';
import CartScreen from './Components/Market/CartScreen';
import CheckoutScreen from './Components/Market/CheckoutScreen';
import InformationScreen from './Components/Market/InformationScreen';

import Main from './Components/Route';

export default class App extends React.Component {
  render() {
    return (
        <Main />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
