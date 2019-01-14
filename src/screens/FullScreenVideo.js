import React from 'react';
import { StyleSheet, View, Video } from 'react-native';


function FullScreenVideo ( props ) {
  

    return (
      <View style={ styles.container }>
        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 300 }}
      />
      </View>
    );
  }

  export default FullScreenVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    transform: [{ rotate: '90deg'}],
  },
  video: {
      flex: 1,  
  }
});