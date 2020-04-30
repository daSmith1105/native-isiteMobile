import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavButton, NavCloseButton } from '../components/NavButtons';
import QuickPicker from 'quick-picker';
import PickerTopRow from '../components/PickerTopRow';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const width = '100%';

class MainNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCam: this.props.camArray[0]
        }
    }

    timelapse = () => {
        this.props.toggleTimelapse;
        this.props.toggleMainNav();
    }

    logout = async() => {
        await this.props.doLogout();
        this.props.toggleMainNav();
    }

    openDividiaURL = () => {
        this.props.toggleMainNav();
        WebBrowser.openBrowserAsync('http://www.dividia.net');
    }

    confirmCamSelect = () => {
        QuickPicker.close()
        this.props.toggleMainNav();
        this.props.handleCamSelect(parseInt( this.state.currentCam.slice(4,6) ) )
    }

    closeCamSelect = () => {
        QuickPicker.close()
    }

    _onPress = () => {
        this.props.toggleMainNav;
        let camValue = 'Cam ' + (this.props.selectedCam + 1).toString();
        console.log( 'camValue > ' + camValue )
        QuickPicker.open({ 
            items: this.props.camArray, 
            textStyle: { fontSize: moderateScale(26, .3) },
            topRow: <PickerTopRow   pickerTitle={'Select Camera'} 
                                    pickerConfirm={'SELECT'}
                                    close={ this.closeCamSelect }
                                    confirm={ this.confirmCamSelect }
                                    confirmText={'CONFIRM'} />,
            selectedValue: camValue,
            onValueChange: ( selectedValueFromPicker ) => this.setState({ currentCam: selectedValueFromPicker.toString() }),
        });
    }
        render() {

            return (

                <View style={ styles.container }>

                    {/* Overlay the top portion of screen to disable touch events in that region */}
                    <View style={ styles.overlay }>
                    
                    </View>

                    {/* Nav options / buttons */}
                    <View style={ styles.nav }>
                        <View style={ styles.touchContainer } >

                        {/* Navigate to timelapse screen */}
                            <NavButton call={ this.props.toggleTimelapse } title={ 'Create Timelapse' } />

                        {/* Request a current image from camera */}
                            <NavButton call={ this.props.getSnapshot } title={ 'Get Current Image' } />

                        {/* Select additional cameras if available */}
                            { this.props.projects.length > 1 ?
                                <NavButton call={ this._onPress } title={ 'View Additional Cameras' } /> :
                                null }

                        {/* Logout of app */}
                            <NavButton call={ this.logout } title={ 'Logout' } />

                        {/* Dividia Website link */}
                            <Text style={ styles.dividiaLink }
                                onPress={ this.openDividiaURL }>
                                www.dividia.net
                            </Text>

                        </View>

                        {/* Nav close button */}
                        <NavCloseButton call={ this.props.toggleMainNav } title={ 'X' } />

                    </View>
            </View>
            )
        }
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
        fontSize: moderateScale(30, .2),
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nav: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderTopWidth: 0.8,
        borderColor: 'lightgrey',
        height: verticalScale(430),
    },
    alert: {
        color: 'white',
        fontSize: moderateScale(26, .2),
    },
    touchContainer: {
        marginTop: verticalScale(20),
        alignItems: 'center',
        height: verticalScale(340),
    },  
    dividiaLink: {
        color: 'white',
        fontSize: moderateScale(24, .2),
        textDecorationLine: 'underline',
    },
   
  });

  export default MainNav;