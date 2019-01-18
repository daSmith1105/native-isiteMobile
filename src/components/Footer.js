// Contains MainNav Button, DateSelect, EventFilter

import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Hamburger } from './NavButtons';
import DateSelect from './DateSelect';
import EventFilter from './EventFilter';

const width = '100%';

function Footer (props) {

    const { toggleMainNav, 
            currentEventType, 
            eventTypes, 
            updateEventType, 
            date, 
            setDate, 
            loading, 
            toggleLoading, 
            toggleFetchError } = props;

    return (
      <View style={ styles.footer }>

        {/* Overlay on top portion of screen */}
        <View style={ styles.upperWindow }></View>

        {/* Footer content */}
        <View style={ styles.footerContainer }>
            <ImageBackground source={ require('../../assets/images/steel.jpg') }
                             style={styles.background}/>
                <DateSelect style={ styles.dateSelect }
                            date={ date }
                            setDate={ setDate }
                            toggleFetchError= { toggleFetchError } />
                <Hamburger call={ toggleMainNav } />
                <EventFilter style={ styles.eventFilter}
                            currentEventType={ currentEventType }
                            eventTypes={ eventTypes }
                            updateEventType={ updateEventType } 
                            loading={ loading }
                            toggleLoading={ toggleLoading } />       
        </View>

      </View>
    );
  }

const styles = StyleSheet.create({
    footer: {
        width,
        height: width,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    footerContainer: {
        width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'grey',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 70,
        width,
    },
});

export default Footer;