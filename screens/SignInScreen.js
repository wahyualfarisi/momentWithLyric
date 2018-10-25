import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ImageBackground,Image } from 'react-native';
import Expo from 'expo';
import bgImage from '../images/434.png';
import logo from '../images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Container, Content } from 'native-base'
import {connect} from 'react-redux';
import { listenuser } from '../src/actions/Auth';
import { listenMomentUser } from '../src/actions/Timeline';

class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.loadApp()
  }

  loadApp = async() => {
    const usertoken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate( usertoken ? 'App' : 'Auth' );
 }

  static navigationOptions = {
      header: null
  }

  signIn = async () => {
      try {
        const result = await Expo.Google.logInAsync({
          androidClientId: '902843646099-hhqcsc0qv5qpurjli37bcnhpb42ld7vf.apps.googleusercontent.com',
          iosClientId: '902843646099-kllrj12020565n6bg36dekgm14ldv36q.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
          AsyncStorage.setItem('userToken',JSON.stringify(result.user) );
          console.log(result.user);
          
          

          this.props.navigation.navigate('App');
        } else {
          console.log('cancelled')
        }
      } catch(e) {
        console.log('error', e)
      }
  }

 


  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer} >
        <View style={styles.logoContainer} >
          <Image
            source={logo} style={styles.logo}
          />
          <Text style={styles.logoText}>MOMENT WITH LYRIC</Text>
         
          
            <Button full bordered info onPress={this.signIn} >
            <Text style={{fontWeight: 'bold', color: 'white'}} >Sign in With Google</Text>
          </Button>
          
       
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    listenuser: (user) => dispatch(listenuser(user)),
    getMoment: (email) => dispatch(listenMomentUser(email))
  }
}

export  default connect(null, mapDispatchToProps) (SignInScreen);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120
  },
  logoContainer:{
    alignItems: 'center'
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5
  }
});
