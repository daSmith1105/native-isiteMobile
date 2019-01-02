
import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function MediaElementHeader (props) {

    const { date, time, download } = props;

    return (
        <View style={ styles.mediaHeader }>
            
            <View style={ styles.dateTime }>
                <Text style={ styles.date }>{ date }</Text>
                <Text style={ styles.time }>{ time }</Text>
            </View>
            <TouchableHighlight onPress={ download } style={ styles.download}>
                <Icon name="arrow-circle-down" size={ 20 } color="white" />
            </TouchableHighlight>

        </View>
    );
  }


const styles = StyleSheet.create({
  mediaHeader: {
    height: 30,
    backgroundColor: 'rgba(0,0,0,.6)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    position: 'absolute',
    top: -30,
    left: 0,
    width: '100%',
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
    paddingLeft: 5,
    paddingRight: 5,
  },
});