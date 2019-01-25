//TODO: Includes - Play, Pause, Reload, Full Screen/Enlarge, Download for videos in Main View and Timelapse View
import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ControlBar = ( props ) => {

    const { reload,
            shouldPlay,
            toggleReload,
            togglePlayPause,
            duration } = props;

    return (
        <View style={ styles.controlBar }>
          
              { reload ? 
                <TouchableHighlight onPress={ () => toggleReload() }
                                    style={ styles.controlButton }>
                  <Icon name="undo" 
                          size={ 28 } 
                          color="white" 
                          style={ styles.icon } /> 
                  </TouchableHighlight> :
                  null
              }

              <TouchableHighlight onPress={ () => togglePlayPause() }
                                  style={ styles.controlButton }>
                <Icon name={ shouldPlay ? "pause" : "play" }
                      size={ 28 } 
                      color="white" 
                      style={ styles.icon } /> 
              </TouchableHighlight>
              {/* <View style={ styles.durationContainer }>
                  <Text style={ styles.duration }>{ Math.floor( duration / 60) + 'm ' }</Text>
                  <Text style={ styles.duration }>{ duration % 60 + 's' }</Text>
                </View> */}
          </View>
    )
}

const styles = StyleSheet.create({
    timestamp: {
        color: 'white',
        fontSize: 18,
        transform: [{ rotate: '90deg'}],
        position: 'absolute',
        top: 150,
        right: -65,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 2,
        borderRadius: 5,
    },
    icon: {
        transform: [{ rotate: '90deg'}],
        marginTop: 15,
        marginBottom: 15
    },
    controlBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 50, 
        height: '100%',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
    },
    durationContainer:{
        transform: [{ rotate: '90deg'}],
        flexDirection: 'row',
        marginTop: 60,
    },
    duration: {
        fontSize: 20,
        color: 'white',
    }
});

export default ControlBar;