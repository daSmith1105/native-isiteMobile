import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class QuickTimeSearch extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        time: ''
      }

    }

    render() {

      return (
        <View style={ styles.quickTimeSearch }>
            <Text style={ styles.time }>12 AM</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>6 AM</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>12 PM</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>6 PM</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
            <Text style={ styles.time }>.</Text>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  quickTimeSearch: {
      width: '15%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 120,
  },
  time: {
      fontSize: 11,
      fontWeight: 'bold'
  }
});