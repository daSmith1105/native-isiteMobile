//Contains logic to generate media array (elements), holds state of event filter

//TODO: if video add duration of video to bottom right corner of MediaElement
//      include progress bar for downloading and video spooling
//      add loader icon, etc for initial load and loading between filters and date select
//      handle the chance that there is no media available
//      determine how to speed media element load times 

import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import MediaElement from './MediaElement';
let eventList;

export default class MediaContainer extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        loading: false,
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
    
    // Map all events for the given date
    mapEvents(){
      const { siteURL, events } = this.props;

      eventList = Object.values(events).map( (event)  => {
      const year = event.sTimeStamp.slice(0, 4);
      const month = event.sTimeStamp.slice(4, 6);
      const day = event.sTimeStamp.slice(6, 8);
      const hour = event.sTimeStamp.slice(8, 10);
      const minute = event.sTimeStamp.slice(10, 12);
      const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';

      const date = month + '/' + day + '/' + year;
      const time = hour + ':' + minute + ' ' + dayNight;

      const videoEventImage = 'https://ak1.picdn.net/shutterstock/videos/16692211/thumb/11.jpg';
      const stillEventImage = siteURL + event.sImage;

      return (
        <MediaElement 
          key={ event.bID }
          date={ date }
          time={ time }
          image={ event.sImage ? stillEventImage : videoEventImage }
          download={ this.downloadCurrentMedia }
          zoom={ this.zoomCurrentMedia }
          value={ event.bID } />        
       )
      });
    }

  // Map only image events for the given date
    mapImages() {
      const { siteURL, images } = this.props;

      eventList = Object.values(images).map( (event)  => {
      const year = event.sTimeStamp.slice(0, 4);
      const month = event.sTimeStamp.slice(4, 6);
      const day = event.sTimeStamp.slice(6, 8);
      const hour = event.sTimeStamp.slice(8, 10);
      const minute = event.sTimeStamp.slice(10, 12);
      const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';

      const date = month + '/' + day + '/' + year;
      const time = hour + ':' + minute + ' ' + dayNight;

      const stillEventImage = siteURL + event.sImage;

      return (
        <MediaElement 
          key={ event.bID }
          date={ date }
          time={ time }
          image={ stillEventImage }
          download={ this.downloadCurrentMedia }
          zoom={ this.zoomCurrentMedia }
          value={ event.bID } />        
        )
      });
    }

  // Map only video events for the given date
    mapVideos() {
      const { siteURL, videos } = this.props;

      eventList = Object.values(videos).map( (event)  => {
      const year = event.sTimeStamp.slice(0, 4);
      const month = event.sTimeStamp.slice(4, 6);
      const day = event.sTimeStamp.slice(6, 8);
      const hour = event.sTimeStamp.slice(8, 10);
      const minute = event.sTimeStamp.slice(10, 12);
      const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';

      const date = month + '/' + day + '/' + year;
      const time = hour + ':' + minute + ' ' + dayNight;

      const videoEventImage = 'https://ak1.picdn.net/shutterstock/videos/16692211/thumb/11.jpg';

      return (
        <MediaElement 
          key={ event.bID }
          date={ date }
          time={ time }
          image={ videoEventImage }
          download={ this.downloadCurrentMedia }
          zoom={ this.zoomCurrentMedia }
          value={ event.bID } />        
        )
      });
    }

    render() {

    // Evaluate event type and filter results
      switch ( this.props.currentEventType ) {
        case ( 'ALL' ):
          console.log( 'FILTERING ALL events' )
          this.mapEvents();
          break;
        case ( 'IMAGES' ):
          console.log( 'Filtering IMAGE events' )
          this.mapImages();
          break;
        case ( 'VIDEOS' ):
          this.mapVideos();
          break;
        default:
          console.log( 'FILTERING ALL events' )
      }

      return (
        <ScrollView contentContainerStyle={ styles.scroll }>
           { eventList }
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
  },
});