import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    Platform,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import Axios from 'axios';
import bgImage from '../images/434.png';
import bgImage1 from '../images/bg1.jpg';
import TopFiveLyric from "./components/search/TopFiveLyric";
import database from '../src/firebase/fire';
import LyricCollection from "./components/search/LyricCollection";
import {connect} from 'react-redux';
import { loadLyricCollection, handleLoadLyric } from "../src/actions/Lyric";
import LyricDetail from "./components/search/LyricDetail";
import {Icon, Fab } from 'native-base';

const {height, width} = Dimensions.get('window')


class SearchScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            topLyric: {},
            lyricCollection: {},
            isLoadCollection: false,
            isloadingTopLyric: false,
            selectedTrack: null
        }

        this.handlerSelectedTrack = this.handlerSelectedTrack.bind(this);
    }

    componentDidMount(){
        this.props.loadCollect()
       
      
        this.startHeaderHeight = 60
        if(Platform.OS === 'android'){
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }

        //top lyric 
        database.ref('topLyrics').on('value', (snapshot) => {
            const topLyric = [];
            snapshot.forEach( (childSnapshot) => {
                topLyric.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            console.log(topLyric);
            this.setState({
                topLyric: topLyric,
                isloadingTopLyric: true
            })
            console.log('state', this.state.topLyric)
        })

        //lyric collection 
        this.lyricCollection();
        

    }

    lyricCollection = () => {
        database.ref('lyric_collection').on('value', (snapshot) => {
            const lyricCollection = [];
            snapshot.forEach( (childSnapshot) => {
                lyricCollection.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            console.log(lyricCollection);
            this.setState({
                lyricCollection : lyricCollection,
                isLoadCollection: true
            })
            console.log('state lyric collection ', this.state.lyricCollection)
        })
    }

    handlerSelectedTrack = () => {
        this.setState({
            selectedTrack: 'oke'
        })
    }
    handlerOnModalClosed = () => {
        this.setState({
            selectedTrack: null
        })
    }



    handlerLyricDetail = (trackName, artisName, trackid, albumname) => {
        this.props.loadlyric(trackid);

       this.props.navigation.navigate('LyricsShow', {
           trackName: trackName,
           artistName: artisName,
           trackid: trackid,
           albumname: albumname
       })
    }


    render() {
        const {track_list, error} = this.props.store;
        return (
            <ImageBackground source={bgImage} style={{ flex:1, width: null, height: null, justifyContent: 'center'}} >
           
            <SafeAreaView style={{flex:1}} >
                <View style={{flex: 1}} >
                 

                    <ScrollView scrollEventThrottle={16}>
                        <View style={{ flex: 1, paddingTop: 20 }}>
                            <Text style={{fontSize:24, fontWeight:'700', paddingHorizontal: 20, color:'white'}}> Describe Your Moment With Lyric </Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 25 }}>
                            <Text style={{fontSize:15, fontWeight:'700', paddingHorizontal: 20, color:'black'}}>Top 5 Lyric</Text>
                        </View>

                        <View style={{height: 130, marginTop: 20}} >
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >  
                            {this.state.isloadingTopLyric === true ? (
                                this.state.topLyric.map((item, key) => {
                                    
                                    return (
                                        <TopFiveLyric
                                            key={key}
                                            data={item}   
                                            showLyric={this.handlerLyricDetail} 
                                         />  
                                    )
                                })
                            ): (
                                <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 175 }} >
                                   <ActivityIndicator color='black' />
                                </View>
                            )}
                                                        
                            </ScrollView>
                        </View>



                        <View style={{marginTop: 40}} >
                                <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color: 'white'}}>
                                        Lyric Collections
                                </Text>

                               <View>
                                    {this.state.isLoadCollection === false && (
                                        <View style={{marginTop: 22, paddingHorizontal: 160}}> 
                                           <ActivityIndicator />
                                        </View>
                                    )}
                                    {this.state.isLoadCollection && (
                                        <LyricCollection
                                             tracks={this.state.lyricCollection}   
                                             selectedItem ={this.handlerLyricDetail } 
                                        />
                                    )}

                                  


                                    <View style={{marginTop: 22}} >
                                    {this.state.selectedTrack !== null && (
                                        <LyricDetail
                                             selectedTrack={this.state.selectedTrack}
                                             onModalClosed={this.handlerTopLyricDetail}
                                        />
                                    )}
                                    </View>

                                 
                               </View>
                        </View>

                        

                    
                    </ScrollView>

                </View>
            </SafeAreaView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return{
        store: state.lyric
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadCollect: () =>  dispatch(loadLyricCollection()),
        loadlyric: (id) => dispatch(handleLoadLyric(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});