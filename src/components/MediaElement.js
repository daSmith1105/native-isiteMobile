//TODO: Element for static image or video images on main screen
//Includes: Media date, Media timestamp, Download Button, Full screen/Enlarge Button, 
//Video overlay image (if video)

import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';
import MediaElementHeader from './MediaElementHeader';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MediaElement (props) {

    const { date, time, zoom, download, image, duration, sType } = props;

    return (
        <View style={ styles.media }>  
            
            <MediaElementHeader style={ styles.mediaHeader }
                                date={ date }
                                time={ time } 
                                download={ download } />
              {sType == 'VIDEO' ?
                  <TouchableHighlight onPress={ () => console.log('pressed') }
                                      style={ styles.videoBackground }>
                    <Icon name="play-circle" size={ 100 } color="white" style={ styles.playButton }/>    
                  </TouchableHighlight> :
                <Image source={{uri: image }} style={ styles.image } />
              }
              <MediaElementHeader date={ date }
                                time={ time } 
                                download={ download } />

              <TouchableHighlight onPress={ zoom } style={ styles.enlarge }>
                      <Icon name="expand" size={ 20 } color="white" />     
              </TouchableHighlight>  

              {sType == 'VIDEO' ?
                <Text style={ styles.duration }>
                  { Math.floor(duration / 60) + 'm ' + duration % 60 + 's' }
                </Text> :
                null 
              }
      
        </View>
    );
  }

const styles = StyleSheet.create({
  media: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    flexGrow: 1,
    // backgroundColor: 'yellow',
    width: '100%',
    height: 200,
    paddingBottom: -100,
  },
  mediaHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  enlarge: {
    marginTop: -36,
    marginLeft: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    marginTop: -30,
    width: '100%',
    height: 200,
  },
  videoBackground: {
    borderRadius: 5,
    marginTop: -30,
    width: '100%',
    height: 200,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    marginTop: 16,
  },
  duration: {
    marginTop: -20,
    marginLeft: '75%',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});