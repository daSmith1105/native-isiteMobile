//TODO: Container for static images and video images on main screen
//Includes: Media date, Media timestamp, Download Button, Full screen/Enlarge Button, 
//Video overlay image (if video)

import React from 'react';
import { StyleSheet, Text, View , ScrollView } from 'react-native';
import MediaElement from './MediaElement';

export default function MediaContainer (props) {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <MediaElement />
      </ScrollView>
    );
  }


const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'red',
    width: 320,
    flex: 1,
  },
});