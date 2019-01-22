import React from 'react';
import { StyleSheet, View, TouchableHighlight, ImageBackground, Text } from 'react-native';
import { Video } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import ControlBar from '../components/PlaybackInterface';

export default function FullScreenTimelapse ( props ) {
    const { videoPaused, 
            videoReload, 
            toggleVideoPaused, 
            toggleVideoReload,
            toggleTimelapseVideo,
            sVideoDuration,
            downloadVideoEvent,
            sTimelapse,
            mediaDownloadLoading,
            mediaDownloadSuccess,
            mediaDownloadFailed } = props;

  return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

          <View style={ styles.mediaDownloadStatus }>
              { mediaDownloadLoading && ( !mediaDownloadSuccess || !mediaDownloadFailed ) ? 
              <Text style={ styles.mediaDownloadText }>Download in progress...</Text> :
              null
              }
              { mediaDownloadSuccess ? 
              <Text style={ styles.mediaDownloadText }>Media successfully saved to your camera roll.</Text> :
              null
              }
              { mediaDownloadFailed ? 
              <Text style={ styles.mediaDownloadText }>Media failed to save to device.</Text> :
              null
              }
          </View>
          
          <TouchableHighlight onPress={ () => downloadVideoEvent( sTimelapse ) } style={ styles.download }>
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
            <View style={ styles.videoContainer }>
              <ImageBackground source={ require('../../assets/images/imageLoading.gif') } style={ styles.videoLoading } >
                <Video
                  source={{ uri: sTimelapse }} //props.sTimelapse
                  rate={ 1.0 }
                  volume={ 0.0 }
                  isMuted={ true }
                  useNativeControls={ true }
                  resizeMode="contain"
                  shouldPlay
                  style={ styles.video }
                />
              </ImageBackground>
            </View>
          </View>
          <TouchableHighlight onPress={ () => toggleTimelapseVideo() } style={ styles.back }>
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
    videoContainer: {
      flex: 1,
      width: '180%',
    },
    video: {
        flex: 1,
      height: '100%',
      width: '100%',
      zIndex: 1
    },
    videoLoading: {
        flex: 1,
      height: '100%',
      width: '100%',
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
    mediaDownloadStatus: {
      transform: [{ rotate: '90deg'}],
      position: 'absolute',
      top: '50%',
      zIndex: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    mediaDownloadText: {
      // fontsize: 40,
      color: 'white',
      position: 'absolute',
      top: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      backgroundColor:'rgba:(0,0,0,0.5)',
    }
});