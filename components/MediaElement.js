//TODO: Element for static image or video images on main screen
//Includes: Media date, Media timestamp, Download Button, Full screen/Enlarge Button, 
//Video overlay image (if video)

import React from 'react';
import { StyleSheet, View } from 'react-native';
import MediaElementHeader from './MediaElementHeader'

const width = '100%';

export default function MediaElement (props) {



    return (
        <View style={styles.media}>
            <MediaElementHeader style={styles.header}
                                date="10-18-18" 
                                time="10:00 AM" />
        </View>
    );
  }


const styles = StyleSheet.create({
  media: {
    height: 200,
    width: 280,
    backgroundColor: 'grey',
    borderRadius: 5,
    flexDirection: 'row',
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    margin: 20,
  }
});