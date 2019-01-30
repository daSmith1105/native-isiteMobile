import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
        paddingRight: moderateScale(15),
        paddingLeft: moderateScale(15),  
        paddingTop: verticalScale(10),  
      
    },
    pickerClose: {

    },
    closeText: {
        fontSize: moderateScale(20, .2),
        color: 'red',    
    },
    pickerTitle: {
        fontSize: moderateScale(18, .2),
     
    },
    confirmSelection: {

    },
    confirmText: {
        fontSize: moderateScale(20, .2), 
        color: 'blue',   
    },
});

export default PickerTopRow;