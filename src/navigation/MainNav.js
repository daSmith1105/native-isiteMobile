import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebBrowser } from 'expo';
import { NavButton, NavCloseButton } from '../components/NavButtons';
import QuickPicker from 'quick-picker';
import PickerTopRow from '../components/PickerTopRow';

const width = '100%';

class MainNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCam: 1
        }

        this.timelapse = this.timelapse.bind(this);
        this.logout = this.logout.bind(this);
        this.openDividiaURL = this.openDividiaURL.bind(this);
        this.confirmCamSelect = this.confirmCamSelect.bind(this);
        this.closeCamSelect = this.closeCamSelect.bind(this);
        this._onPress = this._onPress.bind(this);
    }

    timelapse() {
        this.props.toggleTimelapse;
        this.props.toggleMainNav();
    }

    logout() {
        console.log('Logout clicked!');
        this.props.toggleMainNav();
        this.props.doLogout();
    }

    openDividiaURL() {
        console.log('Dividia web link clicked!');
        this.props.toggleMainNav();
        WebBrowser.openBrowserAsync('http://www.dividia.net');
    }

    confirmCamSelect() {
        QuickPicker.close()
        this.props.toggleMainNav();
        this.props.updateCam(this.state.currentCam.slice(4, 6));
    }

    closeCamSelect() {
        QuickPicker.close()
    }

    _onPress() {
        console.log('Cam Select clicked!');
        this.props.toggleMainNav;
        QuickPicker.open({ 
            items: this.props.camArray, 
            topRow: <PickerTopRow   pickerTitle={'Select Camera'} 
                                    pickerConfirm={'SELECT'}
                                    close={ this.closeCamSelect }
                                    confirm={ this.confirmCamSelect }
                                    confirmText={'CONFIRM'} />,
            selectedValue: this.state.currentCam,
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

  export default MainNav;