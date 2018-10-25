import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class LoggedInPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>LoggedInPage</Text>
                <Text>{this.props.name}</Text>
                <Image
                style={{width: 50, height: 50}}
                source={{uri: this.props.photoURL}}
                 />
            </View>
        );
    }
}
export default LoggedInPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});