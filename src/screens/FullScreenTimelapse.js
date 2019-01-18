import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';
import { Video } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import ControlBar from '../components/PlaybackInterface';

export default function FullScreenTimelapse ( props ) {
    const { videoPaused, 
        videoReload, 
        toggleVideoPaused, 
        toggleVideoReload,
        sVideoDuration } = props;

  return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TouchableHighlight onPress={ () => props.downloadEvent( 'VIDEO', URL, timeStamp ) } style={ styles.download}>
                      <Icon name="arrow-circle-down" size={ 50 } color="white" />
          </TouchableHighlight>

          <ControlBar videoReload={ videoReload }
                      videoPaused={ videoPaused }
                      duration={ sVideoDuration }
                      toggleVideoPaused={ toggleVideoPaused }
                      toggleVideoReload={ toggleVideoReload } />

          <Text style={ styles.timestamp }>Timelapse</Text>

          <View style={ styles.container }>
            <View style={ styles.bumper }></View>
              <Video
                source={{ uri: props.sTimelapse }} //props.sTimelapse
                rate={ 1.0 }
                volume={ 0.0 }
                isMuted={ true }
                useNativeControls={ true }
                resizeMode="contain"
                shouldPlay
                style={ styles.video }
              />
          </View>
          <TouchableHighlight onPress={ props.toggleTimelapseVideo } style={ styles.back}>
                      <Icon name="arrow-left" size={ 30 } color="white" />             
          </TouchableHighlight> 
        </View> 
  );
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    transform: [{ rotate: '90deg'}],
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center'
    },
    video: {
    flex: 1,
    width: '180%',
    },
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
    bumper: {
    width: '20%',
    },
    download: {
    position: 'absolute',
    bottom: 10,
    right: 30,
    transform: [{ rotate: '90deg'}],
    zIndex: 1,
    borderRadius: 50,
    backgroundColor: 'grey',
    paddingLeft: 5,
    paddingRight: 5,
    },
    back: {
    position: 'absolute',
    top: 20,
    left: 5,
    transform: [{ rotate: '90deg'}],
    zIndex: 2,
    borderRadius: 100,
    padding: 10
    },
});