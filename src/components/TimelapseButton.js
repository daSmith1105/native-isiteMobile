import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

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
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width: 120,
        padding: 4,
        margin: 5,
        borderRadius: 10,
    },
    timelapseButtonText: {
        fontSize: 18,
    }
});