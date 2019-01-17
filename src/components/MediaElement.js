//TODO: Element for static image or video images on main screen
//Includes: Media date, Media timestamp, Download Button, Full screen/Enlarge Button, 
//Video overlay image (if video)

import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, ImageBackground, Text } from 'react-native';
import MediaElementHeader from './MediaElementHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedBar from 'react-native-animated-bar';

export default function MediaElement (props) {

    const { date, 
            time, 
            toggleImage, 
            downloadEvent, 
            siteTag,
            image, 
            duration, 
            sType, 
            sImage,
            requestVideo,
            cached,
            cachedProgress,
            bID,
            videoLoading,
            playVideo,
            sTimeStamp,
            videoReady,
            progressBar,
              } = props;

      let timeStamp = sTimeStamp;
      let type = sType;

    return (
        <View style={ styles.media }>  

          {/* Overlayed video event icon tied to status */}



              {/* Video pre-loading ( default initial view) */}
              { sType == 'VIDEO' && parseInt( cachedProgress ) == 0 ?
                  <TouchableHighlight onPress={ () => requestVideo('https://' + siteTag + '.dividia.net/', bID) } 
                                      style={ styles.videoBackground }>
                     <Icon name="cloud-download" size={ 100 } color="white" style={ styles.cloudButton }/> 
                  </TouchableHighlight> :
                  null
              }

              {/* Video is loading */}
              { sType == 'VIDEO' && videoLoading ?
                  <TouchableHighlight onPress={ () => null } 
                                    style={ styles.videoBackground }>
                     <Icon name="spinner" size={ 100 } color="white" style={ styles.spinner }/>
                  </TouchableHighlight> :
                  null
              }

              {/* Video is ready to play */}
              { sType == 'VIDEO' && parseInt( cachedProgress ) == 100  ?
                  <TouchableHighlight onPress={ () => playVideo( sTimeStamp, date, time, duration )} 
                                      style={ styles.videoBackground }>
                     <Icon name="play-circle" size={ 100 } color="white" style={ styles.playButton }/> 
                  </TouchableHighlight> :
                  null
              }
              
              {/* Show image background if type is 'STILL' */}
              { sType == 'STILL' ?
                <TouchableHighlight onPress={ () => null } 
                  style={ styles.imageBackground }>
                  <ImageBackground source={ require('../../assets/images/imageLoading.gif') } style={ styles.imageLoading } >
                  <Image source={{ uri: image }} style={ styles.image } />
                  </ImageBackground>
                </TouchableHighlight> :
                null
              }
  
              {/* Expand button for type 'STILL' */}
              { sType == 'STILL' ?
                <TouchableHighlight onPress={ () => toggleImage( sImage, date, time ) } style={ styles.enlarge }>
                        <Icon name="expand" size={ 20 } color="white" />     
                </TouchableHighlight>  :
                null
              }

              {/* Show video duration for type 'VIDEO' */}
              { sType == 'VIDEO' ?
                <Text style={ styles.duration }>
                  { Math.floor(duration / 60) + 'm ' + duration % 60 + 's' }
                </Text> :
                null 
              }

              {/* Show progress bar for type 'VIDEO' */}
                  { sType == 'VIDEO' ?
                        <AnimatedBar
                          style={ styles.progress }
                          progress={ cached == 1 ? 100 : 0 }
                          height={16}
                          barColor="green"
                          borderRadius={5} />
                      : null
                  }


              <MediaElementHeader style={ styles.mediaHeader }
                                  date={ date }
                                  time={ time } />

            {/* Show download button if type is 'STILL' */}                
            { sType == 'STILL' ?
              <TouchableHighlight onPress={ () => downloadEvent( type, URL, timeStamp ) } style={ styles.download }>
                  <Icon name="arrow-circle-down" size={ 20 } color="white" />
              </TouchableHighlight> :
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
    width: '100%',
    height: 200,
    paddingBottom: -100,
  },
  mediaHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  enlarge: {
    marginTop: -40,
    marginLeft: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    // marginTop: -10,
    width: '100%',
    height: 200,
    zIndex: 1,
  },
  imageBackground: {
    borderRadius: 5,
    marginTop: -30,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  imageLoading: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
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
  spinner: {
    marginTop: 16,
  },
  cloudButton: {
    marginTop: 16,
  },
  duration: {
    marginTop: -40,
    marginLeft: '75%',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  download: {
    position: 'absolute',
    top: -24,
    right: 10,
  },
  progress: {
    marginTop: 2,
    width: '98%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    marginLeft: '1%',
  },
});