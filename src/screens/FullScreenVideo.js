import React from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import MediaHeader from '../components/MediaHeader';
import { Video } from 'expo-av';
import { scale, moderateScale } from 'react-native-size-matters';


export default class FullScreenVideo extends React.Component {
    constructor( props) {
      super(props);

      this.state = {
          isPlaying: true,
          totalDuration: 0,
          currentTime: 0,
          loaded: false
        };

        this.videoPlayer = React.createRef();
    }

    componentDidMount = () => {
      this.setState({ loaded: false })
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

        return (
          <View style={ styles.container }>

            <MediaHeader onPressBack={ toggleVideo } 
                         onPressDownload={ () => downloadVideoEvent( URL ) }
                         video >
              <View style={{ flexDirection: 'column' }}>
                <Text style={ styles.timestamp }>{ timeStamp }</Text>
              </View>
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
                                                  width: Dimensions.get('window').width }}>
              <Video ref={ ref => this.videoPlayer = ref }
                     shouldPlay
                     resizeMode="contain"
                     source={{ uri: URL }}
                     isMuted={true}
                     rate={ this.state.rate }
                     useNativeControls={ true }
                     onLoad={ () => { this.videoPlayer.presentFullscreenPlayer(), this.setState({ loaded: true }) }}
                     style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - scale(20) }}
                />
            </ScrollView>

            { !this.state.loaded ? 
                <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                  <ActivityIndicator size="large" color="goldenrod" />
                  <Text style={{ padding: 40, color: 'white', fontSize: scale(20), textAlign: 'left' }}>Loading Video ... </Text> 
                </View> :
                null
              }

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
  timestamp: {
    color: 'white',
    fontSize: moderateScale(14, .3),
  },
  time: {
    color: 'white',
    fontSize: moderateScale(14, .3)
  },
  icon: {
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
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
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(5),
  }
});