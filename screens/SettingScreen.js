import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Animated,
    AsyncStorage,
    Alert,
    ActivityIndicator
} from "react-native";
import {bgImage} from '../images/434.png';
import { Button } from 'native-base'
import { connect } from 'react-redux';
import { listenuser } from "../src/actions/Auth";
import { Container, Content, Right, Left, List, ListItem, Thumbnail, Body, Icon} from 'native-base';
import MyMoment from "./components/profile/MyMoment";
import { listenMomentUser, loadingSuccess } from "../src/actions/Timeline";
import database from '../src/firebase/fire';
import { Permissions, Notifications } from 'expo'

HEADER_MAX_HEIGHT = 100
HEADER_MIN_HEIGHT = 70
PROFILE_IMAGE_MAX_HEIGHT = 80
PROFILE_IMAGE_MIN_HEIGHT = 40



class SettingScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            photoUrl: null,
            name: '',
            moment: [],
            momentloading: true
        }    
    }



    componentDidMount(){
      this.registerForPushNotifications();
       this._retrieveData()
       
    }   

    async registerForPushNotifications (){
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = status;

        if(status !== 'granted'){
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if(finalStatus !== 'granted') { return; }
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
    }
     
    _retrieveData = async () => {
        try{
            const value = await AsyncStorage.getItem('userToken');
            if(value !== null){
                // console.log('ini usertoken', value)
                const user = JSON.parse(value);
               this.setState({
                   name: user.name,
                   photoUrl: user.photoUrl,
                   email: user.email
               })

               database.ref('lyric_users_share').orderByChild('email').equalTo(this.state.email).on('value', (snapshot) => {
                const momentfire = [];
                snapshot.forEach( (childSnapshot) => {
                    momentfire.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                    this.setState({
                        ...this.state,
                        moment: momentfire,
                        momentloading: false
                    })
                })
               })

            }
        }catch(e){
                console.log(e);
        }
    }

    signOut = () => {
           
            Alert.alert(
                'Logout',
                'Are you sure ?',
                [
                  {text: 'Yes', onPress: () => this.signOutProses()},
                  {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ],
                { cancelable: false }
              )
    }

    signOutProses = async () => {
         await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
    }



    render() {
        return (
          <View style={{flex: 1, backgroundColor: 'white'}} >
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: '#a476b7',
                height: HEADER_MAX_HEIGHT,
                alignItems: 'center'             
            }} >
            </View>
                   
                <View style={{
                    height: PROFILE_IMAGE_MAX_HEIGHT,
                    width: PROFILE_IMAGE_MAX_HEIGHT,
                    borderRadius: PROFILE_IMAGE_MAX_HEIGHT/2,
                    borderColor: 'white',
                    backgroundColor: 'white',
                    borderWidth: 3,
                    overflow: 'hidden',
                    marginTop: HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2) ,
                    marginLeft: 10
                }} >
                    <Image
                        source={{uri: `${this.state.photoUrl}`}}
                        style={{flex: 1, width: null, height: null}}
                    />
                </View>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 26, paddingLeft: 10}} >{this.state.name.toUpperCase()}</Text>
                </View>
                <View  style={{paddingHorizontal: 10}}>
                    <Button bordered dark  onPress={this.signOut} >
                    <Text> Logout </Text></Button>
                </View>

                <Container>
                    <Content>

                        {this.state.momentloading && (
                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}} >
                                 <ActivityIndicator /> 
                            </View>
                        )}
                        {!this.state.momentloading && (
                            this.state.moment.map( (item, key) => {
                                return (
                                    <MyMoment 
                                        key={key} 
                                        data={item}
                                        
                                    />
                                )
                            })
                        ) }
                                
                        
                    </Content>
                </Container>
                
           


          </View>
        );
    }
}

const mapStateToProps = state => {
    return{
        storeauth: state.auth,
        storemoment: state.timeline
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getusersBytoken: (value) => dispatch(listenuser(value)),
        getMoment: (emailToken) => dispatch(listenMomentUser(emailToken)),
        getloadsuccess: () => dispatch(loadingSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SettingScreen);
