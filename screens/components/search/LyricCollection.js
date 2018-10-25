import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';

class LyricCollection extends Component {
    constructor(props){
        super(props);
    }

    render(props) {

        return (
            <ScrollView>
            <View>
                {
                    this.props.tracks.map(( l, i) => (
                    
                        <ListItem 
                            key={i}
                            roundAvatar
                            avatar={ { uri: 'https://cdn3.iconfinder.com/data/icons/ultimate-social/150/41_itunes-512.png' }}
                            title={l.artist_name}
                            subtitle={l.track_name}
                            style={{marginBottom: 10}}
                            subtitleStyle={{color: 'white', fontSize: 12}}
                            titleStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
                            onPress={ () => {this.props.selectedItem(l.track_name, l.artist_name, l.track_id, l.album_name )}}
                        />
                        
                    ))
                }
            </View>
            </ScrollView>
        );
    }
}
export default LyricCollection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});