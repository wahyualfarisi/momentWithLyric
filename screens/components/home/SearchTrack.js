import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Text,
    ImageBackground,
    SafeAreaView,
    Platform,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Button,
    ScrollView,
    ActivityIndicator
} from "react-native";
import bgImage from '../../../images/434.png';
import {connect} from 'react-redux';
import { handleSearchLyric, handleKeywordEmpty, handleLoadLyric } from "../../../src/actions/Lyric";
import ResultSearch from "./ResultSearch";
import { Icon,Container,Content,Header,Left,Right,Body,Title,Fab,List, ListItem,Thumbnail } from 'native-base'
import Timeline from "./Timeline";


class SearchTrack extends Component {
    constructor(props){
        super(props);
        if(Platform.OS === 'android'){
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
        this.state = {
            keyword: '',
            loadingpage: false
        }

        
    }

    onChangeKeyword = (val) => {
        this.setState({
            keyword: val
        })      
    }

    clearTextinput = () => {
        this.setState({
            keyword: ''
        })
        
    }

    getResult = async () => {
        this.setState({
            loadingpage: true
        })
        await this.props.resultSearchDispatch(this.state.keyword)
        this.setState({
            loadingpage: false
        })

        // alert(this.state.keyword)
    }

    handleSelectedTrack = (trackName, artisName, trackid, albumname) => {
        console.log(albumname)
        this.props.loadlyric(trackid);

       this.props.navigation.navigate('LyricsShow', {
           trackName: trackName,
           artistName: artisName,
           trackid: trackid,
           albumname: albumname
       })
    }

 


    render() {
        const { isLoadingSearch, search_list, isEmptyKeyword } = this.props.storeLyric;
        
        console.log('is empty => ',isEmptyKeyword)
        return (
          <ImageBackground source={bgImage} style={{ flex:1, width: null, height: null, justifyContent: 'center'}}   >
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}} > 
                     <View style={{ height: this.startHeaderHeight, borderBottomColor: '#dddddd'  }} >
                        <View style={{flexDirection: 'row', padding:10, backgroundColor:'white', marginHorizontal: 20, shadowOffset: { width: 0, height: 0 }, shadowColor: 'black',shadowOpacity: 0.2, elevation:1, marginTop: Platform.OS === 'android' ? 30 : null  }} >
                        
                            <TextInput
                                autoFocus={true}
                                underlineColorAndroid="transparent"
                                placeholder="Search Lyric"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700' }}
                                onChangeText={this.onChangeKeyword}
                                value={this.state.value}

                            />
                            <TouchableOpacity onPress={this.clearTextinput} >
                               <Icon name="md-search" onPress={this.getResult} />
                            </TouchableOpacity>    
                            
                            
                        </View>
                    </View>

                   
                            {this.state.keyword === '' && (
                                
                                    <View style={styles.container} >
                                    
                                        <Text style={{fontWeight: '700', color: 'white', fontSize: 24}}>Find the lyric you love </Text>
                                        <Text style={{fontWeight: 'bold', color: 'white'}} >Search for songs and make your moment</Text>
                                    
                                    </View>
                                
                            )}
                     <ScrollView>     
                            <View style={{marginTop: 22}} >
                            {!isLoadingSearch && (
                                search_list.map( (item,key) => {
                                    return (
                                    <ResultSearch
                                         key={key} 
                                         data={item} 
                                         selectedTrack={this.handleSelectedTrack}
                                    />
                                    )
                                })
                            ) }
                            </View>

                            <View style={{marginTop: 22}} >
                                {this.state.loadingpage && (
                                    <ActivityIndicator />
                                )}
                            </View>
                           
                    </ScrollView>
                </View>
            </SafeAreaView>
          </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        resultSearchDispatch: (keyword) => dispatch(handleSearchLyric(keyword)),
        handleEmptyKeywordDispatch: () => dispatch(handleKeywordEmpty()),
        loadlyric: (id) => dispatch(handleLoadLyric(id))
    }
}

const mapStateToProps = state => {
    return{
        storeLyric: state.lyric
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchTrack);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});