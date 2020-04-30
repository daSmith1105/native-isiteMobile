import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ScreenOrientation from 'expo-screen-orientation';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class FullScreenImage extends React.Component {
  constructor( props) {
    super(props);

    this.state = {
        isPortrait: false,
      };
  }

  componentDidMount = () => {
    this.switchToLandscape();
  }

  componentWillUnmount = () => {
     this.switchToPortrait();
  }

  switchToLandscape = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  switchToPortrait = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
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

            <View style={ styles.fullScreenHeader }>
              <TouchableHighlight onPress={ () => { toggleImage() }} style={ styles.back}>
                <Icon name="arrow-left" size={ moderateScale(30) } color="white" />             
              </TouchableHighlight>

              <Text style={ styles.timestamp }>{ timeStamp }</Text>

              <TouchableHighlight onPress={ () => downloadImageEvent( URL )  } style={ styles.download}>
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
                                                  width: Dimensions.get('window').width, }}>
              <Image style={ styles.image }
                      source={{ uri: URL }}
                      width={ Dimensions.get('window').width }
                      height={ Dimensions.get('window').height } />
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
    timestamp: {
      color: 'white',
      fontSize: moderateScale(16, .2)
    },
    image: {
      flex: 1,
      zIndex: 1,
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
      margin: moderateScale(5),
    }
  });