import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function FullScreenImage (props) {
  
  let URL = props.siteURL + props.sImage;
  let timeStamp = props.sImageDate + props.sImageTime;
  let type = 'IMAGE';

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <TouchableHighlight onPress={ () => props.downloadEvent( type, URL, timeStamp )  } style={ styles.download}>
                    <Icon name="arrow-circle-down" size={ 50 } color="white" />
        </TouchableHighlight>

        <TouchableHighlight onPress={ props.toggleImage } style={ styles.back}>
                    <Icon name="arrow-left" size={ 30 } color="white" />             
        </TouchableHighlight>

        <Text style={ styles.timestamp }>{ props.sImageDate } { props.sImageTime }</Text>

        <View style={ styles.container }>
          <View style={ styles.bumper }></View>
              <Image style={ styles.image }
                    source={{uri: URL }}
                    resizeMode='contain'
                      />
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
  image: {
    flex: 1,
    width: '180%',
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