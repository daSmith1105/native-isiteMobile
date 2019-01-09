//Contains logic to generate media array (elements), holds state of event filter

//TODO: if video add duration of video to bottom right corner of MediaElement
//      include progress bar for downloading and video spooling
//      add loader icon, etc for initial load and loading between filters and date select
//      handle the chance that there is no media available
//      determine how to speed media element load times 
//      see about moving event filter out of render?

import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableHighlight, Linking, Image } from 'react-native';
import MediaElement from './MediaElement';

let eventList;

export default class MediaContainer extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        zoom: false,
        alert: '',
      }

      this.downloadCurrentMedia = this.downloadCurrentMedia.bind(this);
      this.zoomCurrentMedia = this.zoomCurrentMedia.bind(this);
      this.mapEvents = this.mapEvents.bind(this);
    }

    downloadCurrentMedia(e) {
      console.log(e.target)
    }

    zoomCurrentMedia(e) {
      console.log(e.target)
    }

    displayError() {
      eventlist =  
              <View style={styles.errorModal}>
                <Text style={styles.error}>No events found for { this.props.date }.</Text>
                <Text style={styles.errorContact}>If the problem persists please contact Dividia.</Text>
                <Text style={styles.phone}>817-288-1040</Text>
                <TouchableHighlight onPress={() => 
                  Linking.openURL('mailto:support@dividia.net?subject= ' + this.props.site + ' - iSite Support Request' )}>
                  <Text style={styles.support}>support@dividia.net</Text>
                </TouchableHighlight>
              </View>
    }
    
    // Map all events for the given date
    mapEvents(){
      const { siteURL, events } = this.props;

      if ( events.length > 0 ) {
        console.log(events.length)
        eventList = Object.values(events).map( (event)  => {
        const year = event.sTimeStamp.slice(0, 4);
        const month = event.sTimeStamp.slice(4, 6);
        const day = event.sTimeStamp.slice(6, 8);
        const hour = event.sTimeStamp.slice(8, 10);
        const minute = event.sTimeStamp.slice(10, 12);
        const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';

        const date = month + '/' + day + '/' + year;
        const time = hour + ':' + minute + ' ' + dayNight;

        const stillEventImage = siteURL + event.sThumbnail     //event.sImage;

        return (
          <MediaElement 
            key={ event.bID }
            date={ date }
            time={ time }
            image={ stillEventImage }
            download={ this.downloadCurrentMedia }
            zoom={ this.zoomCurrentMedia }
            value={ event.bID }
            duration={ event.bDuration }
            sType={ event.sType } />        
        )
        });

        this.props.toggleLoading
      } else {
          this.props.toggleLoading
          this.displayError;  
      }
    }

  // Map only image events for the given date
    mapImages() {
      const { siteURL, images } = this.props;

      if ( images.length > 0 ) {
        console.log(images.length)
        eventList = Object.values(images).map( (event)  => {
        const year = event.sTimeStamp.slice(0, 4);
        const month = event.sTimeStamp.slice(4, 6);
        const day = event.sTimeStamp.slice(6, 8);
        const hour = event.sTimeStamp.slice(8, 10);
        const minute = event.sTimeStamp.slice(10, 12);
        const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';

        const date = month + '/' + day + '/' + year;
        const time = hour + ':' + minute + ' ' + dayNight;

        const stillEventImage = siteURL +  event.sThumbnail          // event.sImage;

        return (
          <MediaElement 
            key={ event.bID }
            date={ date }
            time={ time }
            image={ stillEventImage }
            download={ this.downloadCurrentMedia }
            zoom={ this.zoomCurrentMedia }
            value={ event.bID }
            sType={ event.sType }
              />        
          )
        });
        this.props.toggleLoading
      } else {
          this.props.toggleLoading
          this.displayError;  
      }
    }

  // Map only video events for the given date
    mapVideos() {
      const { videos } = this.props;

      if ( videos.length > 0 ) {
        console.log(videos.length)
        eventList = Object.values(videos).map( (event)  => {
        const year = event.sTimeStamp.slice(0, 4);
        const month = event.sTimeStamp.slice(4, 6);
        const day = event.sTimeStamp.slice(6, 8);
        const hour = event.sTimeStamp.slice(8, 10);
        const minute = event.sTimeStamp.slice(10, 12);
        const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';

        const date = month + '/' + day + '/' + year;
        const time = hour + ':' + minute + ' ' + dayNight;

        return (
          <MediaElement 
            key={ event.bID }
            date={ date }
            time={ time }
            download={ this.downloadCurrentMedia }
            zoom={ this.zoomCurrentMedia }
            value={ event.bID }   
            duration={ event.bDuration }
            sType={ event.sType }  />  
          )
        });
        this.props.toggleLoading
      } else {
          this.props.toggleLoading
          this.displayError;  
      }
    }

    render() {   
      if( this.props.filterEvents ) {
        switch ( this.props.currentEventType ) {
          case 'ALL': 
            this.mapEvents();
            this.props.triggerFilter();
          
          break;
          case 'IMAGES':
            this.mapImages();
            this.props.triggerFilter();
            
          break;
          case 'VIDEOS':
            this.mapVideos();
            this.props.triggerFilter();
            
          break;
          default:
            this.mapEvents()
            this.props.triggerFilter();
            
        }
      } 

      return (
        <ScrollView contentContainerStyle={ styles.scroll }>
          { this.props.loading ? 
            <View style={ styles.loader }>
              <View style={ styles.loaderContainer }>
                <Text style={ styles.loaderText }>Loading Events</Text>
                <Image source={ require('../../assets/images/loader-small.gif') }
                      style={ styles.loaderIcon } />
              </View>
            </View> : 
            eventList 
          }
        </ScrollView>
      );
    }
  }


const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingBottom: 60,
    paddingTop: 26,
    // backgroundColor: 'red',
    paddingLeft: 10,
    jusifyContent: 'center',
    alignItems: 'center',
  },
  errorModal: {
    marginTop: 60,
    width: '90%',
    // backgroundColor: 'lightgrey',
    justifyContents: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'yellow',
    padding: 10,
    marginLeft: 10,
  },
  error: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 14,
  },
  errorContact: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 14,
  },
  phone: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 14,
  },
  support: {
    fontSize: 20,
    color: 'blue',
    textDecoration: 'underline',
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  loader: {
    width: 260,
    height: 600,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    backgroundColor: 'white',
  },
  loaderContainer: {
    borderWidth: 5,
    borderColor: '#0075A2',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 20,
    marginTop: 20,
    width: '100%',
  },
  loaderText: {
    fontSize: 28,
    color: '#0075A2',
    marginBottom: -26,
    zIndex: 1,
    marginLeft: 10,
  },
  loaderIcon: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    marginTop: -10,
    backgroundColor: 'white'
  }
});