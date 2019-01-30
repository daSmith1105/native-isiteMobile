import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

   const TimelapseButton = ( props => {
        return (
            <TouchableHighlight onPress={ props.call } style={ styles.timelapseButton }>
                <Text style={ styles.timelapseButtonText }>{ props.title }</Text>
            </TouchableHighlight>
        )
    });


    export default TimelapseButton;

const styles = StyleSheet.create({
    timelapseButton: {
        backgroundColor: 'lightgrey',
        height: verticalScale(40),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(16),
        width: moderateScale(120),
        padding: moderateScale(4),
        margin: moderateScale(5),
        borderRadius: 10,
    },
    timelapseButtonText: {
        fontSize: moderateScale(18, .4),
    }
});