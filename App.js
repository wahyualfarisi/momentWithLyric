import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  createSwitchNavigator,createStackNavigator,createBottomTabNavigator
} from 'react-navigation'; 
// import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import SearchScreen from "./screens/SearchScreen";
import {Provider} from 'react-redux';
import store from './src/store/configureStore';
import LyricScreen from './screens/LyricScreen';
import SearchTrack from "./screens/components/home/SearchTrack";
import {Root} from 'native-base';
import { Font, AppLoading } from 'expo'

const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions:{
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarLabel: 'User',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-person" color={tintColor} size={24} />
      )
    }
  },
  SearchScreen:{
    screen: SearchScreen,
    navigationOptions:{
      tabBarLabel: 'Collections',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-albums" color={tintColor} size={24} />
      )
    }
  }
},{
  initialRouteName: 'SettingScreen',
  order: ['HomeScreen','SearchScreen','SettingScreen'],
  tabBarOptions:{
    activeTintColor: 'red',
    inactiveTintColor: 'grey'
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator:{
    screen: AppTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  LyricsShow:{
    screen: LyricScreen
  },
  SearchTrack:{
    screen: SearchTrack,
    navigationOptions:{
      title: 'Search'
    }
  }
})


const AuthStackNavigator = createStackNavigator({
  Welcome: SignInScreen
})

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isloading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render(){
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    
    return(
      <Root>
      <Provider store={store} >
          <RootApp />
      </Provider>
      </Root>
    )
  }
}

const RootApp =  createSwitchNavigator({
  Auth: AuthStackNavigator,
  App: AppStackNavigator
})
