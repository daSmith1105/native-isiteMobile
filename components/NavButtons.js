//TODO: Setup basic parameters for all nav buttons

import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = '90%';

   const NavButton = ( props => {
        return (
            <TouchableHighlight onPress={ props.call } style={styles.navButton}>
                <Text style={styles.navButtonText}>{props.title}</Text>
            </TouchableHighlight>
        )
    });

    const NavCloseButton = ( props => {
        return (
            <TouchableHighlight onPress={ props.call } style={styles.navClose}>
                <Text style={styles.navCloseText}>{props.title}</Text>
            </TouchableHighlight>
        )
    });

   

    export { NavButton, NavCloseButton};

const styles = StyleSheet.create({
    navButton: {
        backgroundColor: 'lightgrey',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width
    },
    navButtonText: {
        fontSize: 24,
        color: 'black'
    },
    navClose: {
        backgroundColor: 'red',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        zIndex: 10,
    },
    navCloseText: {
        fontSize: 32,
        color: 'white',
    },
});