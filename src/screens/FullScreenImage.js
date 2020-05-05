import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import MediaHeader from '../components/MediaHeader';
import { scale, moderateScale } from 'react-native-size-matters';


export default class FullScreenImage extends React.Component {
  constructor( props) {
    super(props);

    this.state = {
      loaded: false
      };
  }

  componentDidMount = () => {
    setTimeout( () => this.setState({ loaded: true }), 1000)
  }

  componentWillUnMount = () => {
    this.setState({ loaded: false })
  }

    render() {
      const { siteURL, 
              sImage, 
              sImageDate, 
              sImageTime, 
              downloadImageEvent, 
              toggleImage,
              mediaDownloadLoading,
              mediaDownloadSuccess,
              mediaDownloadFailed } = this.props;
      
      let URL= siteURL + sImage;
      let timeStamp = sImageDate + sImageTime;

        return (
          <View style={ styles.container }>

            <MediaHeader  timeStamp={ timeStamp }
                          onPressBack={ toggleImage } 
                          onPressDownload={ () => downloadImageEvent( URL ) } />
           
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
                                                  height: '100%',
                                                  width: '100%' }}>
              <Image style={ styles.image }
                      source={{ uri: URL }}
                      width={ Dimensions.get('window').width }
                      height={ Dimensions.get('window').height } />

              { !this.state.loaded ? 
                <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                  <ActivityIndicator size="large" color="goldenrod" />
                  <Text style={{ padding: 40, color: 'white', fontSize: scale(20), textAlign: 'left' }}>Loading Image ... </Text> 
                </View> :
                null
              }
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
    image: {
      flex: 1,
      zIndex: 1,
      resizeMode: 'contain'
    },
    icon: {
      marginTop: moderateScale(15),
      marginBottom: moderateScale(15),
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