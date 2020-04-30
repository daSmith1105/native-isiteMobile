//TODO: Element for static image or video images on main screen
//Includes: Media date, Media timestamp, Download Button, Full screen/Enlarge Button, 
//Video overlay image (if video)

import React from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Image, ImageBackground, Text, ActivityIndicator } from 'react-native';
import MediaElementHeader from './MediaElementHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import AnimatedBar from './AnimatedBar';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class MediaElement extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        progressBar: 0,
        downloadError: false,
        downloadingVideo: false
      }
    }

    setCached() {
      this.setState({ progressBar: 100, downloadingVideo: false })
    }

    requestVideo = (siteURL, bID) => {
      this.setState({ downloadingVideo: true })
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
            sType, 
            sImage,
            cachedProgress,
            bID,
            playVideo,
            sTimeStamp,
            siteURL } = this.props;
 

          let timeStamp = sTimeStamp;
          let URL= siteURL + sImage;
          const duration = Math.floor(this.props.duration / 60) + 'm ' + this.props.duration % 60 + 's';

                return (

                    <View style={ styles.media }>  

                      { sType == 'VIDEO' ?
                            <View style={ styles.containerStyle }>

                              { this.state.downloadingVideo ?
                              // video downloading state = true
                                <TouchableOpacity style={ styles.mediaContainerStyle }>
                                    <View style={ styles.mediaButtonStyle }>
                                      <ActivityIndicator size={moderateScale(20, .2)} color="white" />
                                      <Text style={ styles.buttonTextStyle }>Downloading Video</Text>
                                    </View>
                                  </TouchableOpacity> :
                              // progress bar is = 0
                                  parseInt( cachedProgress ) === 0 && this.state.progressBar !== 100 ? 
                                    <TouchableOpacity onPress={ () => !this.state.downloadingVideo && this.requestVideo('https://' + siteTag + '.dividia.net/', bID) }
                                                      style={ styles.mediaContainerStyle }>
                                      <View style={ styles.mediaButtonStyle }>
                                        <Icon name="cloud-download" size={ moderateScale(20, .2) } color="white" /> 
                                        <Text style={ styles.buttonTextStyle }>Load Video</Text>
                                      </View>
                                    </TouchableOpacity> :
                              // progress bar = 100
                                  <TouchableOpacity onPress={ () => playVideo( sTimeStamp, date, time, duration )} 
                                                    style={ styles.mediaPlayContainerStyle }>
                                    <View style={ styles.mediaButtonStyle }>
                                      <Icon name="play" size={ moderateScale(20, .2) } color="white" /> 
                                      <Text style={ styles.buttonTextStyle }>Play Video</Text>
                                    </View>
                                  </TouchableOpacity>
                              }

                              {/* Show progress bar for type 'VIDEO' */}
                              { this.state.downloadingVideo ? 
                                <AnimatedBar
                                        style={ styles.progress }
                                        progress={ cachedProgress == 100 || this.state.progressBar / 100  ? 1 : this.state.progressBar / 100} 
                                        height={moderateScale(12, .25)}
                                        barColor="green"
                                        borderRadius={5} /> :
                                <View style={{ height: moderateScale(12, .25), width: '95%' }}></View>
                              }

                            {/* Show video duration for type 'VIDEO' */}
                              <Text style={ styles.duration }>
                                { duration }
                              </Text>

                              { this.state.downloadError ?
                                  <Text style={ styles.downloadError }>Error Retrieving Video</Text> :
                                  null
                              } 
                            </View> :
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

                    {/* Header for VIDEO and STILL media types */}
                        <MediaElementHeader style={ styles.mediaHeader }
                                            date={ date }
                                            time={ time }
                                            type={ sType }
                                            tags={ this.props.tags } /> 

                    </View>
                )
              }
            }

const styles = StyleSheet.create({
  containerStyle: {
    height: verticalScale(50), 
    width: '100%', 
    borderBottomRightRadius: 5, 
    borderBottomLeftRadius: 5, 
    backgroundColor: 'dodgerblue',
    padding: scale(5),
    position: 'relative'
  },
  mediaContainerStyle: {
    height: '70%', 
    width: '70%', 
    marginTop: scale(8), 
    flexDirection: "row", 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: scale(2), 
    paddingLeft: scale(5), 
    paddingRight: scale(5), 
    borderWidth: 2, 
    borderColor: 'white', 
    borderRadius: 5
  },
  mediaPlayContainerStyle: {
    backgroundColor: 'rgba(0,0,0,.3)', 
    height: '70%', 
    width: '70%', 
    marginTop: scale(8), 
    flexDirection: "row", 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: scale(2), 
    paddingLeft: scale(5), 
    paddingRight: scale(5), 
    borderWidth: 2, 
    borderColor: 'rgba(0,0,0,.3)', 
    borderRadius: 5
  },
  mediaButtonStyle: {
    height: '100%', 
    width: '100%', 
    flexDirection: "row", 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 0,
    height: 40
  },
  buttonTextStyle: {
    marginLeft: 8, 
    fontWeight: 'bold', 
    fontSize: moderateScale(18, .2), 
    color: 'white'
  },
  media: {
    borderRadius: 5,
    marginTop: scale(10),
    paddingTop: moderateScale(1, 10),
    marginBottom: 30,
    width: '100%',
    maxWidth: 900,
    height: 'auto',
    position: 'relative',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  mediaHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
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
    marginTop: verticalScale(-22),
    // paddingTop: moderateScale(30),
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
    fontSize: moderateScale(16, .2),
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: verticalScale(14),
    right: scale(10)
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
    width: '98%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0, 
    marginLeft: '1%'
  },
  downloadError: {
    fontSize: moderateScale(20, .4),
    color: 'red',
    position: 'absolute',
    bottom: moderateScale(52, .1),
    left: '10%'
  },
});