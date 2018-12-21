import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuickPicker from 'quick-picker';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cams: [1,2,3,4],
      selectedCam: 1,
    }
    this.handleCamSelect = this.handleCamSelect.bind(this);
  }

  handleCamSelect(camNum) {
    this.setState({selectedCam: camNum})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Header customer={"Birch Raquet Club"} data={"2GB"} />
        <Text style={styles.titleText}>Home/Landing Page</Text>
        <Footer />
        <QuickPicker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    marginTop: 40,
  },
});