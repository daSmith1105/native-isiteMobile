//TODO: Element for static image or video images on main screen
//Includes: Media date, Media timestamp, Download Button, Full screen/Enlarge Button, 
//Video overlay image (if video)

import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, ImageBackground, Text } from 'react-native';
import MediaElementHeader from './MediaElementHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedBar from 'react-native-animated-bar';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class MediaElement extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        progressBar: 0,
        downloadError: false
      }
      this.requestVideo = this.requestVideo.bind(this);
    }

    setCached() {
      this.setState({ progressBar: 100 })
    }

    requestVideo( siteURL, bID ) {
      console.log('Downloading video ... ');
        fetch( siteURL + 'ajax.php?action=requestVideo&id=' + bID )
          .then( response => {
            if (response.status !== 200) {
              console.log('Error. Status Code: ' + response.status);
              return;
            }
            response.json().then( data => {
  
              if (data.status == 0 ) {
  
                  var pollProgress = 
                    setTimeout(function() {
                      if( this.state.progressBar === 0 ) {
                        this.setState({ downloadError: true })
                        clearInterval(pollProgress); 
                      }
                    }.bind(this), 10000)

                    setInterval(function() {
                      fetch( siteURL + 'ajax.php?action=getEventCacheProgress&id=' + bID)
                        .then( response => {
                          response.json().then( data => {
  
                            if (parseInt(data.dCacheProgress) == 100){  
                              this.setCached();
                              clearInterval(pollProgress) 
                            } 
  
                            this.setState({ progressBar:  parseInt( data.dCacheProgress ) })
                          })
                        })
                        }.bind(this), 1000 )
                }
              })
          })
    }

      render() {
          const { 
            date, 
            time, 
            toggleImage, 
            siteTag,
            image, 
            duration, 
            sType, 
            sImage,
            cachedProgress,
            bID,
            playVideo,
            sTimeStamp,
            siteURL } = this.props;
 

          let timeStamp = sTimeStamp;
          let URL= siteURL + sImage;

                return (

                    <View style={ styles.media }>  

                      {/* Overlayed video event icon tied to status */}



                          {/* Video pre-loading ( default initial view) */}
                          { sType == 'VIDEO' && ( parseInt( cachedProgress ) == 0 ) && this.state.progressBar != 100 ?  // || this.state.progressBar == 0 
                              <TouchableHighlight onPress={ () => this.requestVideo('https://' + siteTag + '.dividia.net/', bID) } 
                                                  style={ styles.videoBackground }>
                                <Icon name="cloud-download" size={ moderateScale(100, .3) } color="white" style={ styles.cloudButton }/> 
                              </TouchableHighlight> :
                              null
                          }

                          {/* Video is ready to play */}
                          { sType == 'VIDEO' &&  ( parseInt( cachedProgress ) == 100  || this.state.progressBar == 100 ) ? // || this.state.progressBar == 100 
                              <TouchableHighlight onPress={ () => playVideo( sTimeStamp, date, time, duration )} 
                                                  style={ styles.videoBackground }>
                                <Icon name="play-circle" size={ moderateScale(100, .3) } color="white" style={ styles.playButton }/> 
                              </TouchableHighlight> :
                              null
                          }
                          
                          {/* Show image background if type is 'STILL' */}
                          { sType == 'STILL' ?
                            <TouchableHighlight onPress={ () => toggleImage( sImage, date, time ) } 
                              style={ styles.imageBackground }>
                              <ImageBackground source={ require('../../assets/images/imageLoading.gif') } style={ styles.imageLoading } >
                              <Image source={{ uri: image }} style={ styles.image } />
                              </ImageBackground>
                            </TouchableHighlight> :
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
                                      progress={ cachedProgress == 100 || this.state.progressBar / 100  ? 1 : this.state.progressBar / 100} 
                                      height={moderateScale(12, .25)}
                                      barColor="green"
                                      borderRadius={5} /> : 
                                      null }
                            { this.state.downloadError ?
                                <Text style={ styles.downloadError }>Error Retrieving Video</Text> :
                                null
                            }


                          <MediaElementHeader style={ styles.mediaHeader }
                                              date={ date }
                                              time={ time } />
                        
                    </View>
                )
              }
            }

const styles = StyleSheet.create({
  media: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: verticalScale(200),
    paddingBottom: -100,
  },
  mediaHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
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
    width: '100%',
    height: verticalScale(200),
    zIndex: 1,
  },
  imageBackground: {
    borderRadius: 5,
    marginTop: -30,
    width: '100%',
    height: verticalScale(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLoading: {
    width: '100%',
    height: verticalScale(200),
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  videoBackground: {
    borderRadius: 5,
    marginTop: -30,
    width: '100%',
    height: verticalScale(200),
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
    textAlign: 'right',
    marginTop: moderateScale(-40, .2),
    marginRight: moderateScale(20, .2),
    fontSize: moderateScale(16, .2),
    fontWeight: 'bold',
    color: 'white',
  },
  download: {
    position: 'absolute',
    top: -34,
    right: 10,
    backgroundColor: 'green',
    borderRadius: 50,
    zIndex: 5,
  },
  downloadIcon: {
    padding: 10,
    zIndex: 6,
  },
  progress: {
    marginTop: 2 ,
    width: '98%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    marginLeft: '1%',
    zIndex: 1,
  },
  downloadError: {
    fontSize: moderateScale(20, .4),
    color: 'red',
    position: 'absolute',
    bottom: moderateScale(52, .1),
    left: '10%'
  },
});