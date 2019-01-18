
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function MediaElementHeader (props) {

    const { date, time } = props;

    return (
        <View style={ styles.mediaHeader }>
            
            <View style={ styles.dateTime }>
                <Text style={ styles.date }>{ date }</Text>
                <Text style={ styles.time }>{ time }</Text>
            </View>

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
});