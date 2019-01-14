import React from 'react';
import { StyleSheet, View, Image} from 'react-native';


export default function FullScreenImage (props) {
  

    return (
      <View style={ styles.container }>
        <Image style={ styles.image }
               source={{uri: 'https://static.gbtimes.com/uploads/old/2017/07/02/launch-longmarch5-wenchang-july2-2017-full-cns-2_cropped.png'}} />

      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    transform: [{ rotate: '90deg'}],
  },
  image: {
      flex: 1,  
  }
});