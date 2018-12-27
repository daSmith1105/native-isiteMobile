
import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = '100%';

export default function MediaElementHeader (props) {

    return (
        <View style={styles.mediaHeader}>
            <View style={styles.dateTime}>
                <Text style={styles.date}>{props.date}</Text>
                <Text style={styles.time}>{props.time}</Text>
            </View>
            <TouchableHighlight onPress={props.download} style={styles.download}>
                <Icon name="arrow-circle-down" size={ 20 } color="white" />
            </TouchableHighlight>
        </View>
    );
  }


const styles = StyleSheet.create({
  mediaHeader: {
    height: 30,
    width: 280,
    backgroundColor: 'rgba(0,0,0,.6)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  download: {
    justifyContent: 'center',
  },
  image: {
    width: 280,
    height: 170,
    
  },
});