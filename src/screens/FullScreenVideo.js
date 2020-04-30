import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Dimensions, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ScreenOrientation from 'expo-screen-orientation';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT } from 'expo-av/build/Audio';


export default class FullScreenVideo extends React.Component {
    constructor( props) {
      super(props);

      this.state = {
          isPortrait: false,
          isPlaying: true,
          totalDuration: 0,
          currentTime: 0,
          rate: 1,
          rateIndex: 1
        };
    }

  componentDidMount = () => {
    this.switchToLandscape();
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
    const rates = [ .5, 1, 2, 3, 4, 5 ];
    let currentRateIndex = this.state.rateIndex;
    let newRateIndex = currentRateIndex < 5 ? currentRateIndex + 1 : 0;
    this.setState({
      rate: rates[newRateIndex],
      rateIndex: newRateIndex
    })
  }

    render() {

        const { 
            toggleVideo,
            sVideoDate,
            sVideoTime,
            downloadVideoEvent,
            mediaDownloadLoading,
            mediaDownloadSuccess,
            mediaDownloadFailed } = this.props;

        let URL = this.props.siteURL + this.props.sVideo;

        let timeStamp = sVideoDate + ' ' + sVideoTime;

        const COLOR = '#92DCE5';
        const icon = (name) => () => (
          <Ionicons
            name={name}
            size={36}
            color={COLOR}
            style={{ textAlign: 'center' }}
          />
        );
        return (
          <View style={ styles.container }>
            <View style={ styles.fullScreenHeader }>
              <TouchableHighlight onPress={ () => toggleVideo() } style={ styles.back }>
                <Icon name="arrow-left" size={ moderateScale(30) } color="white" />             
              </TouchableHighlight> 

              <View style={{ flexDirection: 'column' }}>
                <Text style={ styles.timestamp }>{ timeStamp }</Text>
                <Text style={ styles.time }>Clip time remaining: { this.state.totalDuration > 0 && this.state.totalDuration !== this.state.currentTime ? ( (this.state.totalDuration - this.state.currentTime) + 1 ).toString() : '0' }s</Text>
              </View>
      
              <TouchableHighlight onPress={ () => downloadVideoEvent( URL ) } style={ styles.download }>
                <Icon name="arrow-circle-down" size={ moderateScale(45) } color="white" />
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
                                                  width: Dimensions.get('window').width }}>
              <VideoPlayer
                width={ Dimensions.get('window').width }
                style={ styles.videoPlayer }
                videoProps={{
                  shouldPlay: true,
                  resizeMode: Video.RESIZE_MODE_CONTAIN,
                  source: {
                    uri: URL,
                  },
                  isMuted: true,
                  rate: this.state.rate
                }}
                inFullscreen={true}
                playIcon={icon('ios-play')}
                pauseIcon={icon('ios-pause')}
                fullscreenEnterIcon={icon('ios-expand-outline', moderateScale(28))}
                fullscreenExitIcon={icon('ios-contract-outline', moderateScale(28))}
                trackImage={require('../../assets/images/track.png')}
                thumbImage={require('../../assets/images/thumb.png')}
                textStyle={{
                  color: COLOR,
                  fontSize: moderateScale(12),
                }}
                showFullscreenButton={ false }
                playFromPositionMillis={ 0 }
                fadeInDuration={ 200 }
                fadeOutDuration={ 600 }
                quickFadeOutDuration={ 240 }
                hideControlsTimerDuration={ 2200 }
                // showControlsOnLoad={ true }
                isPortrait={ this.state.isPortrait }
                switchToLandscape={ this.switchToLandscape() }
                playbackCallback={ (e) => this.setState({ isPlaying: e.isPlaying, currentTime: Math.floor(e.positionMillis / 1000), totalDuration: Math.floor(e.durationMillis / 1000) }) }
              />
              <Text style={{ position: 'absolute', bottom: scale(10), right: scale(10), fontWeight: 'bold', padding: scale(5), color: 'white', backgroundColor: 'rgba(0,0,0,.5)', fontSize: scale(20), borderColor: 'transparent', borderRadius: 10 }}
                    onPress={ this.sweepRate }>
                {this.state.rate} X
              </Text>
            </ScrollView>
          </View>
        )
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
  timestamp: {
    color: 'white',
    fontSize: moderateScale(16, .2),
  },
  time: {
    color: 'white',
    fontSize: moderateScale(16, .2)
  },
  icon: {
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
  },
  download: {
    borderRadius: 50,
    backgroundColor: 'grey',
    paddingLeft: moderateScale(3),
    paddingRight: moderateScale(3),
  },
  back: {
    borderRadius: 50,
    backgroundColor: 'grey',
    paddingLeft: moderateScale(7),
    paddingRight: moderateScale(7),
    paddingTop: moderateScale(4),
    paddingBottom: moderateScale(6),
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
    margin: moderateScale(5),
  }
});