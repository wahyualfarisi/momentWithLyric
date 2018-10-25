import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {Left, List, ListItem, Thumbnail, Body, Icon} from 'native-base';

class MyMoment extends Component {
    render() {
        const {data} = this.props;

        var monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
          ];

        let timepost = new Date((data.createAt * 1000) * -1)
        const date  = timepost.getDate();
        const month = timepost.getMonth();
        const year  = timepost.getFullYear();
        const yourPost = date+ ' '+monthNames[month]+' '+year;


         return (         
            <View style={{borderWidth: 2.5, borderColor: '#dddddd', paddingHorizontal: 20, margin:10, backgroundColor: 'white'}} >
            <List>
                <ListItem>
                    <Left>
                        <Thumbnail source={{uri: data.userfoto}} size={15} />            
                        <Body>
                            <Text style={{fontWeight: '700'}} >{data.email}</Text> 
                            <Text style={{fontWeight: '700'}} >{yourPost}</Text> 
                            <Text style={{fontWeight: '700', color: 'black'}} ><Icon name="ios-musical-notes" size={18} /> {data.track_name}</Text>                  
                        </Body>
                        
                    </Left>
                </ListItem>

        
            <View style={{paddingHorizontal: 20, marginBottom: 10, marginTop: 5}} >
                <Text style={{paddingLeft: 30, paddingRight: 30}} >{data.comment}</Text>
            </View> 
            </List>
    </View>
        );
    }
}
export default MyMoment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});