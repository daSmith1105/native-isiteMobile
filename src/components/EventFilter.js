//TODO: add custom header with 'select' and cancel buttons to set state values on select (curently selection is firing onchange)
//      figure out how to move switch statement for eventTypes out of render function ( keeps rerendering selection )

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuickPicker from 'quick-picker';
import PickerTopRow from './PickerTopRow';


 function EventFilter (props) {
 
    const { currentEventType, eventTypes, updateEventType } = props;

    confirmFilter = () => {
        console.log('filter confirmed')
        QuickPicker.close()
    }

    closeFilter = () => {
        QuickPicker.close()
    }

    _onPress = () => {
        QuickPicker.open({ 
            items: eventTypes, 
            topRow: <PickerTopRow   pickerTitle={'Select Filter'} 
                                    pickerConfirm={'SELECT'}
                                    close={ closeFilter }
                                    confirm={ confirmFilter }
                                    confirmText={'CONFIRM'} />,
            selectedValue: currentEventType,
            onValueChange: (selectedValueFromPicker) => updateEventType( selectedValueFromPicker ),
        });
    }

    return (
        <View style={ styles.eventFilterSelect }>
            <Touchable feedback="opacity" 
                       native={ false } 
                       onPress={ this._onPress } 
                       style={ styles.eventFilterTouch }>
                <View style={ styles.innerContent }>
                        <Icon name="filter" size={ 28 } color="black" style={ styles.icon } /> 
                </View>
            </Touchable>
      </View>
    );
  }

const styles = StyleSheet.create({
    eventFilterSelect: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventFilterTouch: {
        height: 46,
    },
    innerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
    },
});

export default EventFilter;