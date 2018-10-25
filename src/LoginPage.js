import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import { SocialIcon } from 'react-native-elements';

class LoginPage extends Component {
    render(props) {
        return (
            <View style={styles.container}>
                <Text>Login with Google</Text>
                 
                <SocialIcon
                    button
                    light
                    type='google'
                    onPress={this.props.signIn}
                    iconSize={40}
                    iconColor='red'
                 />
            </View>
        );
    }
}
export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});