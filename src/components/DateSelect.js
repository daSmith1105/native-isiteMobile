//TODO: add custom header with 'select' and cancel buttons to set state values on select (curently selection is firing onchange)
//      figure out how to save the last pressed date and use that for the next selection

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Touchable from '@appandflow/touchable';
import QuickPicker from 'quick-picker';

function DateSelect (props) {
   
    const { date, setDate } = props;
    _onPress = () => {
        const today = new Date;

        QuickPicker.open({ 
            pickerType: "date",
            mode: 'date',
            doneButtonText: 'SELECT DATE',
            selectedValue: new Date,
            maximumDate: new Date,
            onValueChange: (selectedValueFromPicker) => setDate( selectedValueFromPicker.toString().slice(0,15) ),
        });
    }

    _onClose = () => {
        QuickPicker.close()
    }

    const today = (new Date).toString().slice(6);

    return (
        <View style={ styles.dateSelect }>
            <Touchable feedback="opacity" 
                       native={ false } 
                       onPress={ this._onPress } 
                       style={ styles.dateSelectTouch }>
                <View style={ styles.innerContent }>
                        <Icon name="calendar" size={ 28 } color="black" style={ styles.icon } /> 
                </View>
            </Touchable>
      </View>
    );
  }

const styles = StyleSheet.create({
    dateSelect: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateSelectTouch: {
        height: 46,
    },
    innerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
    },
});

export default DateSelect;