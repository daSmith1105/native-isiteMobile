import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Dimensions } from 'react-native';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScreenOrientation } from 'expo';

export default class FullScreenTimelapse extends React.Component {

  constructor( props) {
    super(props);

    this.state = {
        isPortrait: false,
      };

    this.orientationChangeHandler = this.orientationChangeHandler.bind(this);
    this.switchToLandscape = this.switchToLandscape.bind(this);
    this.switchToPortrait = this.switchToPortrait.bind(this);
}

  componentWillMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.Portrait);
    Dimensions.addEventListener(
      'change',
      this.orientationChangeHandler
    );
  }
  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    Dimensions.removeEventListener('change', this.orientationChangeHandler);
  }

  orientationChangeHandler(dims) {
    const { width, height } = dims.window;
    const isLandscape = width > height;
    this.setState({ isPortrait: !isLandscape });
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  }

  switchToLandscape() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  switchToPortrait() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
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
                        <Icon name="arrow-left" size={ 30 } color="white" />             
            </TouchableHighlight> 

            <TouchableHighlight onPress={ () => downloadVideoEvent( sTimelapse ) } style={ styles.download }>
                      <Icon name="arrow-circle-down" size={ 50 } color="white" />
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
           
          <VideoPlayer
                style={ styles.videoPlayer }
                videoProps={{
                  shouldPlay: false,
                  resizeMode: Video.RESIZE_MODE_COVER,
                  source: {
                    uri: sTimelapse,
                  },
                  isMuted: false,
                }}
                playIcon={icon('ios-play')}
                pauseIcon={icon('ios-pause')}
                fullscreenEnterIcon={icon('ios-expand-outline', 28)}
                fullscreenExitIcon={icon('ios-contract-outline', 28)}
                trackImage={require('../../assets/images/track.png')}
                thumbImage={require('../../assets/images/thumb.png')}
                textStyle={{
                  color: COLOR,
                  fontSize: 12,
                }}
                showFullscreenButton={ false }
                playFromPositionMillis={ 0 }
                fadeInDuration={ 200 }
                fadeOutDuration={ 600 }
                quickFadeOutDuration={ 200 }
                hideControlsTimerDuration={ 3000 }
                showControlsOnLoad={ true }
                isPortrait={ this.state.isPortrait }
                switchToLandscape={ this.switchToLandscape() }
              
              />

        </View> 
    );
  }
}

    
  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      position: 'relative',
    },
    fullScreenHeader: {
      position: 'absolute',
      top: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      zIndex: 2,
      backgroundColor: 'rgba(0,0,0,0.0)',
      width: '100%',
    },
    videoPlayer: {
      flex: 1,
      zIndex: 1,
    },
    icon: {
      marginTop: 15,
      marginBottom: 15
    },
    download: {
      borderRadius: 50,
      backgroundColor: 'grey',
      paddingLeft: 3,
      paddingRight: 3,
    },
    back: {
      borderRadius: 50,
      backgroundColor: 'grey',
      paddingLeft: 9,
      paddingRight: 11,
      paddingTop: 6,
      paddingBottom: 10,
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
      fontSize: 24,
      color: 'white',
      position: 'absolute',
      top: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
    }
  });