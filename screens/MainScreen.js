import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainNav from '../navigation/MainNav';
import QuickPicker from 'quick-picker';
import MediaContainer from '../components/MediaContainer';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: 'Birch Raquet Club',
      dataUsage: '2GB',
      cams: [1,2,3,4],
      selectedCam: 1,
      toggleNav: false,
      alert: ''
    }

    this.handleCamSelect = this.handleCamSelect.bind(this);
    this.showNav = this.showNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.getCurrentImage = this.getCurrentImage.bind(this);
  }

  handleCamSelect(camNum) {
    this.setState({selectedCam: camNum});
  }

  showNav() {
    this.setState({ toggleNav: true });
  }

  closeNav() {
    this.setState({ toggleNav: false });
  }

  getCurrentImage() {
    this.setState({ alert: 'snapshot being taken'});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Header customer={this.state.customer} data={this.state.dataUsage} />
        <MediaContainer style={styles.mediaContainerComponent} />
        {/* <MediaContainer style={styles.mediaContainerComponent} />
        <MediaContainer style={styles.mediaContainerComponent} /> */}
        {/* Alert text */}
        <Text>{this.state.alert}</Text>

        { this.state.toggleNav ? 
          <MainNav close={this.closeNav}/> : 
          <Footer toggleNav={this.showNav} takeSnapshot={this.getCurrentImage} /> }
        <QuickPicker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  mediaContainerComponent: {
    alignItems: 'flex-start',
  },
});