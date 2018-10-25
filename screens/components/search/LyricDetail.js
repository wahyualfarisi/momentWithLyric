import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    Button
} from "react-native";

class LyricDetail extends Component {
   

    render() {
        let modalContent = null

        if(this.props.selectedTrack){
            modalContent = (
                <View>
                    <Text>Lyric</Text>
                </View>
            )
        }

        return (
            <Modal>
                 <View style={styles.modalContainer} visible={this.props.selectedTrack !== null} animationType="fade" >
                    {modalContent}
                    <View>
                        <Text>Good</Text>
                        <Button title="back" onPress={this.props.onModalClosed} >back</Button>
                    </View>
                </View>
            </Modal>
        );
    }
}
export default LyricDetail;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    placeImage: {
        width: '100%',
        height: 200
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    }
});