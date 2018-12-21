//TODO: Switch between multiple cameras if availableimport React from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Touchable from '@appandflow/touchable';
import QuickPicker from 'quick-picker';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            availableCams: ['1', '2', '3'],
            selectedCam: '1'
        }

    }
    

    _onPress = () => {
        QuickPicker.open({ 
            items: this.state.availableCams, 
            selectedValue: this.state.selectedCam,
            onValueChange: (selectedValueFromPicker) => this.setState({ selectedCam: selectedValueFromPicker }),
        });
    }

  render() {

    return (
        <View style={styles.camSelect}>
            <Touchable feedback="opacity" 
                       native={false} 
                       onPress={this._onPress} 
                       style={styles.camSelectTouch}>
                <View style={styles.innerContent }>
                <Text style={styles.camSelectText}>Camera: {this.state.selectedCam}</Text>
                    {this.state.availableCams.length > 1 ? 
                        <Icon name="angle-down" size={12} color="black" style={styles.icon} /> : null
                    }
                </View>
            </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    camSelect: {
    },
    camSelectTouch: {
        borderWidth: .5,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        height: 46,
        width: 96,
    },
    innerContent: {
        flexDirection: 'row'
    },
    camSelectText: {
        paddingLeft: 5,
        paddingTop: 12,
    },
    icon: {
        marginLeft: 8,
        marginTop: 14,
    },
});