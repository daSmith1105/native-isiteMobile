import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Dimensions, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ScreenOrientation from 'expo-screen-orientation';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class FullScreenTimelapse extends React.Component {

  constructor( props) {
    super(props);

    this.state = {
        isPortrait: false,
        isPlaying: true,
        totalDuration: 0,
        currentTime: 0,
        loadingText: 'Building Timelapse ... ',
        rate: .5,
        rateIndex: 2
      };
  }

  componentDidMount = () => {
    this.switchToLandscape();
    this.setState({ 
        isPortrait: false,
        isPlaying: true,
        totalDuration: 0,
        currentTime: 0,
        loadingText: 'Building Timelapse ... '
    })
    setTimeout(() => this.setState({ loadingText: 'Processing Video ... ' }), 1000)
    setTimeout(() => this.setState({ loadingText: 'Finishing Build ... ' }), 2000)
  }

  componentWillUnmount = () => {
     this.switchToPortrait();
  }

  switchToLandscape = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  switchToPortrait = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  sweepRate = () => {
    const rates = [ .175, .25, .5, 1 ];
    let currentRateIndex = this.state.rateIndex;
    let newRateIndex = currentRateIndex < 3 ? currentRateIndex + 1 : 0;
    this.setState({
      rate: rates[newRateIndex],
      rateIndex: newRateIndex
    })
  }

  render() {
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
            mediaDownloadFailed } = this.props;

    const COLOR = '#92DCE5';
    const icon = (name, size = 36) => () => (
      <Ionicons
        name={name}
        size={size}
        color={COLOR}
        style={{ textAlign: 'center' }}
      />
    );

    return (
        <View style={ styles.container }>
          <View style={ styles.fullScreenHeader }>
              <TouchableHighlight onPress={ () => toggleTimelapseVideo() } style={ styles.back }>
                          <Icon name="arrow-left" size={ moderateScale(30) } color="white" />             
              </TouchableHighlight> 
              <Text style={ styles.time }>Clip time remaining: { this.state.totalDuration > 0 && this.state.totalDuration !== this.state.currentTime ? ( (this.state.totalDuration - this.state.currentTime) + 1 ).toString() : '0' }s</Text>
              <TouchableHighlight onPress={ () => downloadVideoEvent( sTimelapse ) } style={ styles.download }>
                        <Icon name="arrow-circle-down" size={ moderateScale(50) } color="white" />
            </TouchableHighlight>
          </View>

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
              <ScrollView maximumZoomScale={3} 
                          minimumZoomScale={1} 
                          contentContainerStyle={{  flexDirection: 'row', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    height: Dimensions.get('window').height,
                                                    width: Dimensions.get('window').width,
                                                    position: 'relative' }}>
                <VideoPlayer
                
                  width={ Dimensions.get('window').width }
                  style={ styles.videoPlayer }
                  videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                      uri: sTimelapse,
                    },
                    isMuted: false,
                    rate: this.state.rate
                  }}
                  playIcon={icon('ios-play')}
                  pauseIcon={icon('ios-pause')}
                  fullscreenEnterIcon={icon('ios-expand-outline', 28)}
                  fullscreenExitIcon={icon('ios-contract-outline', 28)}
                  trackImage={require('../../assets/images/track.png')}
                  thumbImage={require('../../assets/images/thumb.png')}
                  textStyle={{
                    color: COLOR,
                    fontSize: moderateScale(12),
                  }}
                  showFullscreenButton={ false }
                  playFromPositionMillis={ 0 }
                  inFullScreen={true}
                  fadeInDuration={ 200 }
                  fadeOutDuration={ 600 }
                  quickFadeOutDuration={ 200 }
                  hideControlsTimerDuration={ 3000 }
                  showControlsOnLoad={ true }
                  isPortrait={ false }
                  playbackCallback={ (e) => this.setState({ isPlaying: e.isPlaying, currentTime: Math.floor(e.positionMillis / 1000), totalDuration: Math.floor(e.durationMillis / 1000) }) }
                />
              { this.state.totalDuration < 1 ? 
                <View style={{ zIndex: 60, height: Dimensions.get('window').width, width: Dimensions.get('window').height, position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                  <Text style={{ padding: 40, color: 'white', fontSize: scale(20)}}>{this.state.loadingText}</Text> 
                </View> :
                null
              }
               <Text style={{ position: 'absolute', bottom: scale(10), right: scale(10), fontWeight: 'bold', padding: scale(5), color: 'white', backgroundColor: 'rgba(0,0,0,.5)', fontSize: scale(20), borderColor: 'transparent', borderRadius: 10 }}
                    onPress={ this.sweepRate }>
                {this.state.rate} X
              </Text>
            </ScrollView>      
        </View> 
    );
  }
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  fullScreenHeader: {
    zIndex: 5, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    position: 'absolute', 
    top: 0, 
    right: 0, 
    width: '100%', 
    height: moderateScale(64), 
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  videoPlayer: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
  },
  icon: {
    marginTop: scale(15),
    marginBottom: scale(15),
  },
  time: {
    color: 'white',
    fontSize: moderateScale(16, .2),
  },
  download: {
    borderRadius: moderateScale(50),
    backgroundColor: 'grey',
    paddingLeft: moderateScale(3),
    paddingRight: moderateScale(3),
  },
  back: {
    borderRadius: moderateScale(50),
    backgroundColor: 'grey',
    paddingLeft: moderateScale(9),
    paddingRight: moderateScale(11),
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(10),
    borderWidth: 2,
    borderColor: 'white'
  },
  mediaDownloadStatus: {
    position: 'absolute',
    top: '50%',
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mediaDownloadText: {
    fontSize: moderateScale(24, .2),
    color: 'white',
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  }
});