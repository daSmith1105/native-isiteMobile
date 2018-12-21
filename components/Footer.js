// TODO: Include - CameraSelect, MainStackNav, Snapshot

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CameraSelect from './CameraSelect';
import SnapButton from './Snapshot';
import MainNav from '../navigation/MainNav';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = '100%';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            togggleNav: false,
        }
        this.showNav = this.showNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    showNav() {
        this.setState({ toggleNav: true })
    }

    closeNav() {
        this.setState({ toggleNav: false })
    }

  
  render() {

    return (
      <View style={styles.footer}>
        <View style={styles.upperWindow}></View>
        { this.state.toggleNav ? <MainNav /> : null }
        <Text>{this.state.toggleNav}</Text>
        <View style={styles.footerContainer}>
        <Text>{this.state.toggleNav}</Text>
            <CameraSelect />
            <TouchableOpacity onPress={ this.showNav }>
                <Icon name="bars" size={ 30 } color="black" />
            </TouchableOpacity>
            <SnapButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'rgba(0,0,0.5)',
        width,
        height: width,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    upperWindow: {
        flex: 1,
    },
    footerContainer: {
        width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'grey',
        paddingTop: 10,
        height: 100,
        flexDirection: 'row',
    },
});