import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MainNav from './navigation/MainNav';
import MainScreen from './screens/MainScreen';

export default class App extends React.Component {
  state = {
    loading: false
  };

  render() {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} style={styles.statusBar}/>
          <MainScreen />
          {/* <MainNav /> */}
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
