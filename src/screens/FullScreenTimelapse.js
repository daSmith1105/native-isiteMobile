import React from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import MediaHeader from '../components/MediaHeader';
import { Video } from 'expo-av';
import { scale, moderateScale } from 'react-native-size-matters';

export default class FullScreenTimelapse extends React.Component {

  constructor( props) {
    super(props);

    this.state = {
        isPlaying: true,
        totalDuration: 0,
        currentTime: 0,
        loadingText: 'Building Timelapse ... ',
        rate: .5,
        loaded: false
      };

      this.videoPlayer = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ 
        isPortrait: false,
        isPlaying: true,
        totalDuration: 0,
        currentTime: 0,
        loadingText: 'Building Timelapse ... ',
        loaded: false
    })
    setTimeout(() => this.setState({ loadingText: 'Processing Video ... ' }), 4000)
    setTimeout(() => this.setState({ loadingText: 'Finishing Build ... ' }), 10000)
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

    return (
        <View style={ styles.container }>
          <MediaHeader    onPressBack={ toggleTimelapseVideo } 
                          onPressDownload={ () => downloadVideoEvent( sTimelapse ) }
                          video >
          </MediaHeader>

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
                 <Video ref={ ref => this.videoPlayer = ref }
                     shouldPlay={false}
                     resizeMode="contain"
                     source={{ uri: sTimelapse }}
                     isMuted={true}
                     rate={ 0.5 }
                     useNativeControls={ true }
                     onLoad={ () => this.setState({ loaded: true }) }
                     style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - scale(20) }}
                />

              { !this.state.loaded ? 
                <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                  <Text style={{ padding: 40, color: 'white', fontSize: moderateScale(20, .5), textAlign: 'center' }}>This may take a minute depending on length of timelapse and your connection speed.</Text>
                  <ActivityIndicator size="large" color="dodgerblue" />
                  <Text style={{ padding: 40, color: 'white', fontSize: moderateScale(20, .5), textAlign: 'left' }}>{this.state.loadingText}</Text> 
                </View> :
                null
              }

            </ScrollView> 

            {/* <Text style={{ position: 'absolute', bottom: scale(40), right: scale(130), fontWeight: 'bold', padding: scale(5), color: this.state.rate == 0.1 ? 'goldenrod' : 'white', backgroundColor: 'rgba(0,0,0,.5)', fontSize: moderateScale(20, .2 ), borderColor: 'transparent', borderRadius: 10 }}
                    onPress={ () => { this.videoPlayer.setRateAsync(0.1); this.setState({ rate: 0.1 }) } }>
                0.175x
              </Text>
              <Text style={{ position: 'absolute', bottom: scale(40), right: scale(90), fontWeight: 'bold', padding: scale(5), color: this.state.rate == 0.2? 'goldenrod' : 'white', backgroundColor: 'rgba(0,0,0,.5)', fontSize: moderateScale(20, .2 ), borderColor: 'transparent', borderRadius: 10 }}
                    onPress={ () => { this.videoPlayer.setRateAsync(0.2); this.setState({ rate: 0.2 }) } }>
                0.25x
              </Text>
              <Text style={{ position: 'absolute', bottom: scale(40), right: scale(50), fontWeight: 'bold', padding: scale(5), color: this.state.rate == 0.5 ? 'goldenrod' : 'white', backgroundColor: 'rgba(0,0,0,.5)', fontSize: moderateScale(20, .2 ), borderColor: 'transparent', borderRadius: 10 }}
                    onPress={ () => { this.videoPlayer.setRateAsync(0.5); this.setState({ rate: 0.5 }) } }>
                0.5x
              </Text>
              <Text style={{ position: 'absolute', bottom: scale(40), right: scale(20), fontWeight: 'bold', padding: scale(5), color: this.state.rate == 1.0 ? 'goldenrod' : 'white', backgroundColor: 'rgba(0,0,0,.5)', fontSize: moderateScale(20, .2 ), borderColor: 'transparent', borderRadius: 10 }}
                    onPress={ () => { this.videoPlayer.setRateAsync(1.0); this.setState({ rate: 1.0 }) } }>
                1x
              </Text>      */}
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
  time: {
    color: 'white',
    fontSize: moderateScale(16, .2)
  },
  icon: {
    marginTop: scale(15),
    marginBottom: scale(15),
  },
  videoPlayer: {
    resizeMode: 'contain'
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
    alignItems: 'center',
    justifyContent: 'center'
  }
});