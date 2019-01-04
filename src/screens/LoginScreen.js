//TODO: implement navigation for timelapse selection passed to the footer element
//      implement quickSearch feature on the right hand side of screen

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '',
      siteList: [ 'birch', 'gte' ]
    }

  }


    render() {

        return (
        <View>

        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mediaContent: {
  
  },
  quickTimeSearch: {
  },
});