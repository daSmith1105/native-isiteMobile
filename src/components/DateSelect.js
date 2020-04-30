//TODO: add custom header with 'select' and cancel buttons to set state values on select (curently selection is firing onchange)
//      figure out how to save the last pressed date and use that for the next selection

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Touchable from '@appandflow/touchable';
import QuickPicker from 'quick-picker';
import PickerTopRow from './PickerTopRow';
import moment from 'moment';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class DateSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date
        }
    }

    confirmDate = () => {
        if (moment(this.state.selectedDate).format('MM/DD/YY') != this.props.date) {
            this.props.setDate(this.state.selectedDate);
            QuickPicker.close()
        } else {
            console.log('Same date selected!');
            QuickPicker.close()
        }
    }

    closeDate = () => {
        QuickPicker.close()
    }

    _onPress = () => {
        const today = new Date;

        QuickPicker.open({ 
            pickerType: "date",
            mode: 'date',
            topRow: <PickerTopRow   pickerTitle={'Select Date'} 
                                    pickerConfirm={'SELECT'}
                                    close={ this.closeDate }
                                    confirm={ this.confirmDate }
                                    confirmText={'CONFIRM'} />,
            selectedValue: this.state.selectedDate,
            maximumDate: today,
            onValueChange: (selectedValueFromPicker) =>  this.setState( { selectedDate: selectedValueFromPicker } ),
        });
    }

    _onClose = () => {
        QuickPicker.close()
    }

    render() {
        return (
            <View style={ styles.dateSelect }>
                <Touchable feedback="opacity" 
                        native={ false } 
                        onPress={ this._onPress } 
                        style={ styles.dateSelectTouch }>
                    <View style={ styles.innerContent }>
                            <Icon name="calendar" size={ moderateScale(28) } color="black" style={ styles.icon } /> 
                    </View>
                </Touchable>
        </View>
        )
      }
    }


const styles = StyleSheet.create({
    dateSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(5),
    },
    dateSelectTouch: {
        height: verticalScale(46),
    },
    innerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
    },
});

export default DateSelect;