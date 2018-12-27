// TODO: Include - CameraSelect, MainStackNav, Snapshot

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CameraSelect from './CameraSelect';
import SnapButton from './Snapshot';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = '100%';

export default function Footer (props) {

    return (
      <View style={styles.footer}>
        <View style={styles.upperWindow}></View>
        <View style={styles.footerContainer}>
            <CameraSelect style={styles.cameraSelectComponent} />
            <TouchableOpacity onPress={ props.toggleNav } style={styles.hamburger}>
                <Icon name="bars" size={ 34 } color="black" style={styles.hambergerIcon} />
            </TouchableOpacity>
            <SnapButton style={styles.snapButtonComponent} call={props.takeSnapshot} />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    footer: {
        // backgroundColor: 'rgba(0,0,0,0.5)',
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
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 15,
        paddingRight: 50,
        borderTopWidth: 3,
        borderColor: 'white',
    },
    cameraSelectComponent: {
        flex: 1,
    },
    hamburger: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 20,
        marginTop: 6,
    },
    snapButtonComponent: {
        flex: 1,
    },
});