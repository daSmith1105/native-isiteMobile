import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebBrowser } from 'expo';
import { NavButton, NavCloseButton } from '../components/NavButtons';
import QuickPicker from 'quick-picker';
import PickerTopRow from '../components/PickerTopRow';

const width = '100%';

export default function MainNav (props) {

    const { toggleNav, 
            availableCams, 
            selectedCam, 
            updateCam,
            getSnapshot } = props;

    const timelapse = () => {
        console.log('Create timelapse clicked!');
        toggleNav();
    }

    const logout = () => {
        console.log('Logout clicked!');
        toggleNav();
    }

    const openDividiaURL = () => {
        console.log('Dividia web link clicked!');
        toggleNav();
        WebBrowser.openBrowserAsync('http://www.dividia.net');
    }

    confirmCamSelect = () => {
        console.log('camera selection confirmed')
        QuickPicker.close()
    }

    closeCamSelect = () => {
        QuickPicker.close()
    }

    const _onPress = () => {
        console.log('Cam Select clicked!');
        toggleNav();
        QuickPicker.open({ 
            items: availableCams, 
            topRow: <PickerTopRow   pickerTitle={'Select Camera'} 
                                    pickerConfirm={'SELECT'}
                                    close={ closeCamSelect }
                                    confirm={ confirmCamSelect }
                                    confirmText={'CONFIRM'} />,
            selectedValue: selectedCam,
            onValueChange: ( selectedValueFromPicker ) => updateCam( selectedValueFromPicker ),
        });
    }

        return (

            <View style={ styles.container }>

                {/* Overlay the top portion of screen to disable touch events in that region */}
                <View style={ styles.overlay }>
                
                </View>

                {/* Nav options / buttons */}
                <View style={ styles.nav }>
                    <View style={ styles.touchContainer } >

                    {/* Navigate to timelapse screen */}
                        <NavButton call={ timelapse } title={ 'Create Timelapse' } />

                    {/* Request a current image from camera */}
                        <NavButton call={ getSnapshot } title={ 'Get Current Image' } />

                    {/* Select additional cameras if available */}
                        { availableCams.length > 1 ?
                            <NavButton call={ _onPress } title={ 'View Additional Cameras' } /> :
                            null }

                    {/* Logout of app */}
                        <NavButton call={ logout } title={ 'Logout' } />

                    {/* Dividia Website link */}
                        <Text style={ styles.dividiaLink }
                            onPress={ openDividiaURL }>
                            www.dividia.net
                        </Text>

                    </View>

                    {/* Nav close button */}
                    <NavCloseButton call={ toggleNav } title={ 'X' } />

                </View>
          </View>
        )
    }


const styles = StyleSheet.create({
    container: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     width: width,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 1000,
    },
    camSelected: {
        fontSize: 30,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nav: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderTopWidth: 0.8,
        borderColor: 'lightgrey',
        height: 430,
    },
    alert: {
        color: 'white',
        fontSize: 26,
    },
    touchContainer: {
        marginTop: 20,
        alignItems: 'center',
        height: 340,
    },  
    dividiaLink: {
        color: 'white',
        fontSize: 24,
        textDecorationLine: 'underline',
    },
   
  });