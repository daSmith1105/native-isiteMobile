import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScreenOrientation } from 'expo';


export default class FullScreenImage extends React.Component {
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
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
      Dimensions.addEventListener(
        'change',
        this.orientationChangeHandler
      );
      this.switchToLandscape();
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
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
              <TouchableHighlight onPress={ () => toggleImage() } style={ styles.back}>
                          <Icon name="arrow-left" size={ 30 } color="white" />             
              </TouchableHighlight>

              <TouchableHighlight onPress={ () => downloadImageEvent( URL )  } style={ styles.download}>
                <Icon name="arrow-circle-down" size={ 50 } color="white" />
              </TouchableHighlight>

            </View>

            <Text style={ styles.timestamp }>{ timeStamp }</Text>

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
    
              <Image style={ styles.image }
                      source={{ uri: URL }}
                      resizeMode='contain'
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
    timestamp: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      color: 'white',
      fontSize: 16,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 5,
      zIndex: 2,
      textAlign: 'center'
    },
    image: {
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