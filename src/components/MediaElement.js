//TODO: Element for static image or video images on main screen
//Includes: Media date, Media timestamp, Download Button, Full screen/Enlarge Button, 
//Video overlay image (if video)

import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import MediaElementHeader from './MediaElementHeader';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = '100%';

export default function MediaElement (props) {

    const { date, time, zoom, download, image } = props;

    return (
        <View style={ styles.media }>
        {/* <Text>{ JSON.stringify(props) }</Text>    */}       
            
            <MediaElementHeader style={ styles.mediaHeader }
                                date={ date }
                                time={ time } 
                                download={ download } />

              <Image source={{uri: image }} style={ styles.image } />
              <MediaElementHeader date={ date }
                                time={ time } 
                                download={ download } />

              <TouchableHighlight onPress={ zoom } style={ styles.enlarge }>
                      <Icon name="expand" size={ 20 } color="white" />     
              </TouchableHighlight>  
      
        </View>
    );
  }

const styles = StyleSheet.create({
  media: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    flexGrow: 1,
    // backgroundColor: 'yellow',
    width: '100%',
    height: 200,
    paddingBottom: -100,
  },
  mediaHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  enlarge: {
    marginTop: -36,
    marginLeft: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    marginTop: -30,
    width: '100%',
    height: 200,
  },
});