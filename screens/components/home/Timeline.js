import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import {
    Card,
    CardItem,
    Thumbnail,
    Right,
    Left,
    Body,
    Button,
    Icon,
    List,
    ListItem
} from 'native-base';
import { getNewDataSource } from "react-native/Libraries/Experimental/SwipeableRow/SwipeableListView";

class Timeline extends Component {
    render() {
        const { timeline } = this.props

        var monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
          ];

        let timepost = new Date((timeline.createAt * 1000) * -1)
        const date  = timepost.getDate();
        const month = timepost.getMonth();
        const year  = timepost.getFullYear();
        const yourPost = date+ ' '+monthNames[month]+' '+year;
        
        

        return (
        <View style={{borderWidth: 0.5, borderColor: '#dddddd', paddingHorizontal: 20, margin:10}} >
            <List>
                <ListItem>
                    <Left>
                        <Thumbnail source={{uri: timeline.userfoto}} size={15} />            
                        <Body>
                            <Text style={{fontWeight: '700'}} >{timeline.email}</Text> 
                            <Text style={{fontWeight: '500', color:'white', fontSize: 10}} >{yourPost} </Text> 
                            <Text style={{fontWeight: '700', color: 'white'}} ><Icon name="ios-musical-notes" size={18} /> {timeline.track_name}</Text>                  
                        </Body>
                        
                    </Left>
                </ListItem>

          
            <View style={{paddingHorizontal: 20, marginBottom: 10, marginTop: 5}} >
                <Text style={{paddingLeft: 30, paddingRight: 30, color:'white'}} >{timeline.comment}</Text>
            </View> 
            </List>
       </View>
        );
    }
}
export default Timeline;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});