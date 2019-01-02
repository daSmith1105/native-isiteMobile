//TODO: add custom header with 'select' and cancel buttons to set state values on select (curently selection is firing onchange)
//      figure out how to save the last pressed date and use that for the next selection

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Touchable from '@appandflow/touchable';
import QuickPicker from 'quick-picker';
import PickerTopRow from './PickerTopRow';

function DateSelect (props) {

    confirmDate = () => {
        console.log('date confirmed')
        QuickPicker.close()
    }

    closeDate = () => {
        QuickPicker.close()
    }
   
    const { date, setDate } = props;

    _onPress = () => {
        const today = new Date;

        QuickPicker.open({ 
            pickerType: "date",
            mode: 'date',
            topRow: <PickerTopRow   pickerTitle={'Select Date'} 
                                    pickerConfirm={'SELECT'}
                                    close={ closeDate }
                                    confirm={ confirmDate }
                                    confirmText={'CONFIRM'} />,
            selectedValue: today,
            maximumDate: today,
            onValueChange: (selectedValueFromPicker) => setDate( selectedValueFromPicker.toString().slice(0,15) ),
        });
    }

    _onClose = () => {
        QuickPicker.close()
    }

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