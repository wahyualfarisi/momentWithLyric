import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { List, ListItem, Left, Right, Thumbnail,Body, Icon, Button, Content, Container } from 'native-base'
import logo from '../../../images/logo.png'

class ResultSearch extends Component {
    render() {
        const { track } = this.props.data
        return (
        <ScrollView>
            <Content>
            <List>
                <ListItem avatar onPress={() => {this.props.selectedTrack(track.track_name, track.artist_name, track.track_id, track.album_name)} } >
                    <Left>
                        <Thumbnail source={logo} small />
                    </Left>    
                    <Body>
                        <Text style={{color: 'white', fontWeight: '700'}} >{track.track_name}</Text>
                        <Text style={{color: 'black', fontWeight: '700'}} >{track.artist_name}</Text>
                    
                    </Body>  
                    <Right>
                        <Icon 
                            name="ios-arrow-forward" size={24} 
                           
                            
                        />
                    </Right>                         
                </ListItem>           
            </List>
            </Content>
        </ScrollView>
        );
    }
}
export default ResultSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});