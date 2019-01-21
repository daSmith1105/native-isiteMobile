import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function FullScreenImage (props) {

  const { siteURL, 
          sImage, 
          sImageDate, 
          sImageTime, 
          downloadImageEvent, 
          toggleImage } = props;
  
  let URL= siteURL + sImage;
  console.log( 'this is the image uri: ' + URL )
  let timeStamp = sImageDate + sImageTime;

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <TouchableHighlight onPress={ () => downloadImageEvent( URL )  } style={ styles.download}>
                    <Icon name="arrow-circle-down" size={ 50 } color="white" />
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => toggleImage() } style={ styles.back}>
                    <Icon name="arrow-left" size={ 30 } color="white" />             
        </TouchableHighlight>

        <Text style={ styles.timestamp }>{ sImageDate } { sImageTime }</Text>

        <View style={ styles.container }>
          <View style={ styles.bumper }></View>
          <View style={ styles.imageContainer }>
            <ImageBackground source={ require('../../assets/images/imageLoading.gif') } style={ styles.imageLoading } >
                <Image style={ styles.image }
                        source={{ uri: URL }}
                        resizeMode='contain'
                        />
            </ImageBackground>
        </View>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ rotate: '90deg'}],
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '180%',
  },
  image: {
      flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  imageLoading: {
      flex: 1,
    height: '100%',
    width: '100%',
  },
  timestamp: {
    color: 'white',
    fontSize: 18,
    transform: [{ rotate: '90deg'}],
    position: 'absolute',
    top: 150,
    right: -65,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 2,
    borderRadius: 5,
  },
  bumper: {
    width: '20%',
  },
  download: {
    position: 'absolute',
    bottom: 10,
    right: 30,
    transform: [{ rotate: '90deg'}],
    zIndex: 1,
    borderRadius: 50,
    backgroundColor: 'grey',
    paddingLeft: 5,
    paddingRight: 5,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 5,
    transform: [{ rotate: '90deg'}],
    zIndex: 1,
    borderRadius: 100,
    padding: 10
  },
});