import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Modal,
    Button,
    AsyncStorage
} from "react-native";
import {connect} from 'react-redux';
import bgImage from '../images/434.png';
import logo from '../images/logo.png';
import {
    Card,
    CardItem,
    Thumbnail,
    Right,
    Left,
    Body,
    Icon,
    List,
    ListItem,
    Container,
    Content,
    Textarea,
    Form,
    Toast
} from 'native-base';
import database from '../src/firebase/fire';


class LyricScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTrack : null,
            isloadinglirik: true,
            email: '',
            userfoto: '',
            moment: '',
            track_name: this.props.navigation.getParam('trackName') ? this.props.navigation.getParam('trackName') : '',
            artist_name: this.props.navigation.getParam('artistName') ? this.props.navigation.getParam('artistName') : ''
        }

        this.selectedTrackHandler = this.selectedTrackHandler.bind(this);
    }
    
    static navigationOptions = ({navigation}) => {
        return{
            title: navigation.getParam('artistName'),
            headerTitltStyle:{
                fontWeight: 'bold'
            },
            headerRight: (
                <View style={{paddingHorizontal: 10}} >
                   <Icon name="ios-send-outline" size={24} onPress={navigation.getParam('handlerPostMoment') } />
                </View>
            )      
        }
    }

    _retriveData = async() => {
        try{
            const value = await AsyncStorage.getItem('userToken');
            if(value !== null){
                const user = JSON.parse(value);
                this.setState({
                    email: user.email,
                    userfoto: user.photoUrl
                })
            }
        }catch(e){

        }
    }

    componentDidMount = () => {
      this._retriveData();
      this.props.navigation.setParams({
          handlerPostMoment: this._handlerPostMoment
      })
    
    }
    

    selectedTrackHandler = () => {
      this.setState({
          selectedTrack: 'form'
      })
    }

    _showLyric = () => {
        this.setState({
            selectedTrack: null
        })
    }

  
    _handlerPostMoment = () => {
       if(this.state.moment === ''){
        Toast.show({
            text: 'Moment cannot be empty !',
            buttonText: 'Okay',
            duration: 5000
          })
       }else{
            database.ref('lyric_users_share').push({
                    email: this.state.email,
                    userfoto: this.state.userfoto,
                    track_name: this.state.track_name,
                    artist: this.state.artist_name,
                    lyricid: '10101010',
                    comment: this.state.moment,
                    createAt: Math.floor(Date.now() / 1000) * -1
           })
            this.props.navigation.navigate('HomeScreen');
            Toast.show({
                text: 'Moment successfully posted',
                duration: 5000
            })
       } 
    }

    onChangeTextMoment = (val) => {
        this.setState({
            moment: val
        })
    }



    render() {
        const { navigation } = this.props;
        const trackName  = navigation.getParam('trackName');
        const artistName = navigation.getParam('artistName');
        const trackid    = navigation.getParam('trackid');
        const albumname  = navigation.getParam('albumname');
        const {datalyric = ''} = this.props.storelyric
        return (
           <ImageBackground source={bgImage} style={{ flex:1, width: null, height: null, justifyContent: 'center'}} >
            <Container style={{ backgroundColor: 'transparent', paddingTop: 10}}>
                    <Content>
                        <View style={{paddingHorizontal: 10, margin:10}} >
                        <List>
                            <ListItem>
                                <Left>
                                     <Thumbnail square large source={logo} />      
                                    <Body>
                                        <Text style={{fontWeight: '700', color: 'white'}} >{trackName}</Text> 
                                        <Text style={{fontWeight: '700', color: 'white'}} >{artistName}</Text> 
                                        <Text style={{fontWeight: '700', color: 'white'}} ><Icon name="md-albums" size={18} /> {albumname} </Text>          
                                    </Body>                                                                   
                                </Left>
                               
                            </ListItem>  
                            <View>

                            {this.state.selectedTrack === null && (
                                <Button onPress={this.selectedTrackHandler} title="ADD MOMENT" /> 
                               
                            )}
                            {this.state.selectedTrack !== null && (
                                <Button onPress={this._showLyric} title="SHOW LYRIC" /> 
                            )}
                           


                           </View>                 
                        </List>

                        
                        {this.state.selectedTrack === null && (
                         <View style={{paddingHorizontal: 30,marginTop: 10}} >
                          <Text 
                            style={styles.lyricbody} >
                                {datalyric.lyrics_body ? datalyric.lyrics_body : ''  }
                          </Text>                         
                        </View>

                        )}
                        

                        {this.state.selectedTrack !== null && (
                            <View>
                                <Form>
                                    <Textarea 
                                        rowSpan={10}
                                         placeholder="Create moment ... " 
                                        onChangeText={this.onChangeTextMoment}

                                    />
                                </Form>
                            </View>
                        )}
                    
                       
                    </View>
                    </Content>
            </Container>

           </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return{
        storelyric: state.lyric
    }
}


export default connect(mapStateToProps, null)(LyricScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lyricbody:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        alignItems: 'center',
        color: 'white',
        fontSize: 22
    }
});