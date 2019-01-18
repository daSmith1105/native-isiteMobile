//TODO: add custom header with 'select' and cancel buttons to set state values on select (curently selection is firing onchange)

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuickPicker from 'quick-picker';
import PickerTopRow from './PickerTopRow';


class EventFilter extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedFilter: ''
        }

        this.confirmFilter = this.confirmFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
    }

    confirmFilter() {
        // this.props.toggleLoading
        QuickPicker.close()
        this.props.updateEventType( this.state.selectedFilter );
    }

    closeFilter() {
        QuickPicker.close()
    }

    _onPress = () => {
        QuickPicker.open({ 
            items: this.props.eventTypes, 
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
                            <Icon name="filter" size={ 28 } color="black" style={ styles.icon } /> 
                    </View>
                </Touchable>
        </View>
        );
  }}

const styles = StyleSheet.create({
    eventFilterSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
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