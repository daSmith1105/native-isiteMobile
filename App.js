//TODO: implement navigation to handle login and redirect to main screen

import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import MainScreen from './src/screens/MainScreen';

class App extends React.Component {

  render() {
      return (
            <View style={ styles.container }>
              {/* Main app view */}
              <MainScreen />
              {/* Hide the top status bar on ios */}
              <StatusBar hidden={ true } style={ styles.statusBar }/>
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


export default App;