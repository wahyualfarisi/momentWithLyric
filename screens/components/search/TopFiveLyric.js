import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

class TopFiveLyric extends Component {

    render() {
        
        return (
         <TouchableOpacity onPress={() => this.props.showLyric(this.props.data.track_name, this.props.data.artist, this.props.data.track_id, this.props.data.track_name)} >
            <View style={{height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor:'#dddddd'}} >
                <View style={{flex: 2}} >
                    <Image
                        source={{uri: this.props.data.album_photo}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}}
                    />
                </View>
                
                <View style={{flex: 1, paddingLeft: 10, paddingTop: 5}}>
                    <Text style={{fontSize: 10, paddingHorizontal: 5}} >{this.props.data.track_name}</Text>
                </View>

                <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                    <Text style={{fontSize: 10,fontWeight: '700',paddingHorizontal: 5}} >{this.props.data.track_name}</Text>
                </View>
                

            </View>
         </TouchableOpacity>
        );
    }
}
export default TopFiveLyric;

