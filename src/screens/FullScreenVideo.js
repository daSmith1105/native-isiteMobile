import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';
import { Video } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

export default function FullScreenVideo ( props ) {
  
  let URL = props.siteURL + props.sVideo;
  let timeStamp = props.sVideoDate + props.sVideoTime;
  let today = moment().format('YYYY/MM/DD');

  const { videoPaused, 
          videoReload, 
          videoLength, 
          toggleVideoPaused, 
          toggleVideoReload,
          sVideoDuration } = props;

  // console.log(URL)

  return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
     
              <TouchableHighlight onPress={ () => props.downloadEvent( 'VIDEO', URL, timeStamp ) } style={ styles.download}>
                          <Icon name="arrow-circle-down" size={ 50 } color="white" />
              </TouchableHighlight> 

          <View style={ styles.controlBar }>
              { videoReload ? 
                <TouchableHighlight onPress={ () => toggleVideoReload() }
                                    style={ styles.controlButton }>
                  <Icon name="undo" 
                          size={ 28 } 
                          color="white" 
                          style={ styles.icon } /> 
                  </TouchableHighlight> :
                  null
              }

              <TouchableHighlight onPress={ () => toggleVideoPaused() }
                                  style={ styles.controlButton }>
                <Icon name={ videoPaused ? "pause" : "play" }
                      size={ 28 } 
                      color="white" 
                      style={ styles.icon } /> 
              </TouchableHighlight>
              <View style={ styles.durationContainer }>
                  <Text style={ styles.duration }>{ Math.floor(sVideoDuration / 60) + 'm ' }</Text>
                  <Text style={ styles.duration }>{sVideoDuration % 60 + 's' }</Text>
                </View>
          </View>

          <Text style={ styles.timestamp }>{ props.sVideoDate } { props.sVideoTime }</Text>

          <View style={ styles.container }>
            <View style={ styles.bumper }></View>
              <Video
                source={{ uri: props.siteURL + props.sVideo }} 
                rate={ 1.0 }
                volume={ 0.0 }
                isMuted={ true }
                useNativeControls={ true }
                resizeMode="contain"
                shouldPlay
                style={ styles.video }
                
              />
          </View>
          <TouchableHighlight onPress={ props.toggleVideo } style={ styles.back}>
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
icon: {
  transform: [{ rotate: '90deg'}],
  marginTop: 15,
  marginBottom: 15
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