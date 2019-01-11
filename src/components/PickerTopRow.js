import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const PickerTopRow = (props) => {
    return (
        <View style={ styles.pickerTopRow }>
        
        {/* Close picker button */}
            <TouchableHighlight onPress={ props.close } style={ styles.pickerClose }>
                <Text style={ styles.closeText }>CANCEL</Text>
            </TouchableHighlight>

        {/* Title of picker (centered) */}
            <Text style={ styles.pickerTitle }>{ props.pickerTitle }</Text> 

        {/* Confirm picker selection button */}
            <TouchableHighlight onPress={ props.confirm } style={ styles.pickerConfirm }>
                <Text style={ styles.confirmText }>{ props.confirmText }</Text>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    pickerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,  
        paddingTop: 10,  
    },
    pickerClose: {

    },
    closeText: {
        fontSize: 20,
        color: 'red',    
    },
    pickerTitle: {
        fontSize: 18,
     
    },
    confirmSelection: {

    },
    confirmText: {
        fontSize: 20, 
        color: 'blue',   
    },
});

export default PickerTopRow;