//TODO: Logic to take a snapshot of current cam image via button
import React from 'react';
import { StyleSheet, View, TouchableHighlight  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function SnapButton (props) {

    return (
        <TouchableHighlight style={styles.snapButton} onPress={props.call} >
                <View style={styles.button}>
                    <Icon name="camera" size={30} color="black" style={styles.icon} />
                </View>
            </TouchableHighlight>
    );
  }


const styles = StyleSheet.create({
    snapButton: {
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        borderWidth: .5,
        borderRadius: 5,
        padding: 8,
        width: 50,
    },
    icon: {
    },
});