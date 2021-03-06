//TODO: Setup basic parameters for all nav buttons

import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const width = '90%';

   const NavButton = ( props => {
        return (
            <TouchableHighlight onPress={ props.call } style={ styles.navButton }>
                <Text style={ styles.navButtonText }>{ props.title }</Text>
            </TouchableHighlight>
        )
    });

    const NavCloseButton = ( props => {
        return (
            <TouchableHighlight onPress={ props.call } style={ styles.navClose }>
                <Text style={ styles.navCloseText }>{ props.title }</Text>
            </TouchableHighlight>
        )
    });

    const Hamburger = ( props => {
        return (
            <TouchableOpacity onPress={ props.call } style={ styles.hamburger }>
                <Icon name="bars" size={ moderateScale(34) } color="black" style={ styles.hambergerIcon } />
            </TouchableOpacity>
        )
    });

    export { NavButton, NavCloseButton, Hamburger };

const styles = StyleSheet.create({
    navButton: {
        backgroundColor: 'lightgrey',
        height: verticalScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(20),
        borderRadius: 5,
        width: width
    },
    navButtonText: {
        fontSize: moderateScale(24, .2),
        color: 'black'
    },
    navClose: {
        backgroundColor: 'red',
        height: verticalScale(60),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scale(20),
        zIndex: 10,
    },
    navCloseText: {
        fontSize: moderateScale(32, .2),
        color: 'white',
    },
    hamburger: {
        marginTop: verticalScale(-10),
    },
});