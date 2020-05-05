//TODO: add custom header with 'select' and cancel buttons to set state values on select (curently selection is firing onchange)

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuickPicker from 'quick-picker';
import PickerTopRow from './PickerTopRow';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


class EventFilter extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedFilter: ''
        }
    }

    confirmFilter = () => {
        QuickPicker.close()
        if ( this.state.selectedFilter !== this.props.currentEventType ) {
            this.props.updateEventType( this.state.selectedFilter.toString() )
        } else {
            console.log( 'same filter selected. choose a different filter.' )
        }
    }

    closeFilter = () => {
        QuickPicker.close()
    }

    _onPress = () => {
        QuickPicker.open({ 
            items: this.props.objectDetectionEnabled ? this.props.eventTypesWithObj : this.props.eventTypes, 
            textStyle: { fontSize: moderateScale(26, .3) },
            topRow: <PickerTopRow   pickerTitle={'Select Filter'} 
                                    pickerConfirm={'SELECT'}
                                    close={ this.closeFilter }
                                    confirm={ this.confirmFilter }
                                    confirmText={'CONFIRM'} />,
            selectedValue: this.props.currentEventType,
            onValueChange: (selectedValueFromPicker) => this.setState( { selectedFilter: selectedValueFromPicker.toString() } ),
        });
    }
    render() {
        return (
            <View style={ styles.eventFilterSelect }>
                <Touchable feedback="opacity" 
                        native={ false } 
                        onPress={ this._onPress } 
                        style={ styles.eventFilterTouch }>
                    <View style={ styles.innerContent }>
                            <Icon name="filter" size={ moderateScale(28) } color="black" style={ styles.icon } /> 
                    </View>
                </Touchable>
        </View>
        );
  }}

const styles = StyleSheet.create({
    eventFilterSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(5),
    },
    eventFilterTouch: {
        height: verticalScale(46),
    },
    innerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
    },
});

export default EventFilter;