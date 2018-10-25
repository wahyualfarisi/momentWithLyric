import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
} from "react-native";
import {connect} from 'react-redux';
import bgImage from '../images/434.png';
import Timeline from "./components/home/Timeline";
import { loadTimeline } from '../src/actions/Timeline';
import { Icon,Container,Content,Header,Left,Right,Button,Body,Title,Fab } from 'native-base'


class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        }
        
    }

    componentDidMount = () => {
      this.props.getTimeline();
      
   
      
    }
    
    render() {
        const { timeline } = this.props.storetimeline;
        return (        
               
            <ImageBackground source={bgImage} style={{ flex:1, width: null, height: null, justifyContent: 'center'}} >
                 <View style={{marginTop: 70}} >
                    <Text style={{fontWeight: 'bold', fontSize: 25, paddingHorizontal: 20, color: 'white'}} >HOME</Text>
                 </View>
                <Container style={{ backgroundColor: 'transparent', paddingTop: 10}} >
                  
                       
                         <Content>
                            {
                                timeline !== null && (
                                  timeline.map( (item, key) => {
                                      return(
                                          <Timeline  
                                            key={key}
                                            timeline={item}
                                          />
                                      )
                                  })
                                )
                            }                          
                        </Content>


                        <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{ }}
                            style={{ backgroundColor: '#dd2020' }}
                            position="bottomRight"
                            onPress={() => this.props.navigation.navigate('SearchTrack')}>
                            <Icon name="ios-musical-notes" />
                        </Fab>
                </Container>
                </ImageBackground>

            
        );
    }
}

const mapStateToProps = state => {
  return{
    storeauth: state.auth,
    storetimeline: state.timeline
  }
}

const mapDispatchToProps = dispatch => {
    return{
        getTimeline: () => dispatch(loadTimeline())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});