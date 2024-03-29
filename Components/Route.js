import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import { Ionicons, SimpleLineIcons } from 'react-native-vector-icons';

import HomeScreen from './Home/HomeScreen';
import ProductScreen from './Home/ProductScreen';

import LoginScreen from './User/LoginScreen';
import RegisterScreen from './User/RegisterScreen';
import UserScreen from './User/UserScreen';
import ProfileScreen from './User/ProfileScreen';
import ChangeScreen from './User/ChangeScreen';
import Auth from './User/Auth';

import PesananScreen from './/Market/PesananScreen';
import CartScreen from './Market/CartScreen';
import CheckoutScreen from './Market/CheckoutScreen';
import InformationScreen from './Market/InformationScreen';
import DoneScreen from './Market/DoneScreen';
import PayScreen from './Market/PayScreen';
import SendScreen from './Market/SendScreen';
import PacketScreen from './Market/PacketScreen';

import TransaksiScreen from './Market/TransaksiScreen';
import Transaksi1Screen from './Market/Transaksi1Screen';
import PenerimaScreen from './Market/PenerimaScreen';
import WishScreen from './Market/WishScreen';


const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = 'ios-home';
  } else if (routeName === 'Wishlist') {
    iconName = 'md-paper';
  } else if (routeName === 'Pembelian') {
    iconName = 'ios-cart';
  } else if (routeName === 'Account') {
    //iconComponent = SimpleLineIcons
    iconName = 'ios-person';
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeStack = createStackNavigator({
  Beranda: HomeScreen,
  Product: ProductScreen,
  ChangeScreen: ChangeScreen,
},{
  initialRouteName:'Beranda',
  headerMode: 'none'
})

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 0) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Product') {
        tabBarVisible = false;
      }else if(route.routeName === 'ChangeScreen'){
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible,
  };
};

const MainNavigation = createBottomTabNavigator({
  Home: HomeStack,
  Pembelian: PesananScreen,
  Wishlist : WishScreen, //Wishlist
  Account: ProfileScreen
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => 
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#2f5aa4',
      }
    },
  });

  const User = createStackNavigator({
    Auth:Auth,
    Login: LoginScreen,
    Register: RegisterScreen,
    UserRegister : UserScreen,
  },{
    initialRouteName:'Auth',
    headerMode:'none'
  })

  const Market = createStackNavigator({
    Cart : CartScreen,
    Packet: PacketScreen,
    Pesanan: PesananScreen,
    Penerima: PenerimaScreen,
    Checkout: CheckoutScreen,
    Done: DoneScreen,
    Information: InformationScreen,
    Transaksi:TransaksiScreen,
    Transaksi1:Transaksi1Screen,
    Pay: PayScreen,
    Send:SendScreen,
  },{
    headerMode:'none',
    initialRouteName:'Cart'
  })

export default Main = createAppContainer(createSwitchNavigator({
  Navigasi: MainNavigation,
  User : User,
  Market: Market
}, {
    initialRouteName: 'User',
  })
);
