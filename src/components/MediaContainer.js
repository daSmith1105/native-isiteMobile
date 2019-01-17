//Contains logic to generate media array (elements), holds state of event filter

//TODO: if video add duration of video to bottom right corner of MediaElement
//      include progress bar for downloading and video spooling
//      add loader icon, etc for initial load and loading between filters and date select
//      handle the chance that there is no media available
//      determine how to speed media element load times 
//      see about moving event filter out of render?

import React from 'react';
import { StyleSheet, FlatList, Text, View, TouchableHighlight, Linking, Image } from 'react-native';
import MediaElement from './MediaElement';

let eventList;

export default class MediaContainer extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        eventType: this.props.currentEventType

      }

      this._renderItem = this._renderItem.bind(this);
    }

    _renderItem({ item }){
      const { siteTag, events } = this.props;
      if ( events.length > 0 ) {

        const year = item.sTimeStamp.slice(0, 4);
        const month = item.sTimeStamp.slice(4, 6);
        const day = item.sTimeStamp.slice(6, 8);
        const hour = item.sTimeStamp.slice(8, 10);
        const minute = item.sTimeStamp.slice(10, 12);
        const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';
        const date = month + '/' + day + '/' + year;
        const time = hour + ':' + minute + ' ' + dayNight;
        const imageURL = 'https://' + siteTag + '.dividia.net/thumbnail.php?img=base/' + siteTag + '/' + item.sTimeStamp + '.jpg&size=m';
          return (

            <MediaElement 
              sTimeStamp={ item.sTimeStamp }
              date={ date }
              time={ time }
              image={ imageURL }
              siteTag={ siteTag }
              downloadEvent={ this.props.downloadEvent }
              toggleImage={ this.props.toggleImage }
              sImage={ item.sImage }
              duration={ item.bDuration }
              sType={ item.sType }
              cached={ item.fCached }
              cachedProgress={ parseInt( item.dCacheProgress ) }
              requestVideo={ this.props.requestVideo }
              progressBar= { this.props.progressBar }
              videoLoading={ this.props.videoLoading }
              videoReady={ this.props.videoReady }
              playVideo={ this.props.playVideo }
              bID={ item.bID } />     
          )
      } else {

          this.props.toggleLoading;
          this.props.toggleError()
      }
    }

    render() {   
       const { events, 
               images, 
               videos, 
               filterEvents, 
               currentEventType,
               triggerFilter,
               toggleLoading } = this.props;

      if( filterEvents ) {

        switch ( currentEventType ) {
          case 'ALL': 
            console.log('displaying ALL events')
            eventList = <FlatList inverted
                                  data={ events } 
                                  renderItem={ this._renderItem }
                                  keyExtractor={ (item) => item.bID }
                                  style={ styles.eventList } />;
            triggerFilter();
            toggleLoading;
          break;
          case 'IMAGES':
            console.log('displaying IMAGE events')
            eventList = <FlatList inverted
                                  data={ images } 
                                  renderItem={ this._renderItem }
                                  keyExtractor={ (item) => item.bID }
                                  style={ styles.eventList } />;
            triggerFilter();   
            toggleLoading;    
          break;
          case 'VIDEOS':
            console.log('displaying Video events')
            eventList = <FlatList inverted
                                  data={ videos } 
                                  renderItem={ this._renderItem }
                                  keyExtractor={ (item) => item.bID }
                                  style={ styles.eventList } />;
            triggerFilter();
            toggleLoading;
          break;
          default:
            console.log('Event type error');
        }
      } 
      return (
        <View style={ styles.scroll }>
            { this.props.loading ? 
                <View style={ styles.loader }>
                  <View style={ styles.loaderContainer }>
                    <Text style={ styles.loaderText }>Loading Events</Text>
                    <Image source={ require('../../assets/images/loader-small.gif') }
                          style={ styles.loaderIcon } />
                  </View>
                </View> : 
                null 
            } 

            { this.props.fetchError ?
                <View style={ styles.errorModal }>
                  <Text style={ styles.error }>Fetching events failed for {this.props.date}.</Text>
                  <Text style={ styles.error }>Is this camera system offline?</Text>
                  <Text style={ styles.errorContact }>If the problem persists please contact Dividia.</Text>
                  <Text style={ styles.phone }>817-288-1040</Text> 
                  <TouchableHighlight onPress={() => 
                    Linking.openURL('mailto:support@dividia.net?subject= ' + this.props.site + ' - iSite Support Request' ) }>
                    <Text style={ styles.support }>support@dividia.net</Text>
                  </TouchableHighlight>
                </View> :
                null
            }

            { !this.props.loading && !this.props.error ? 
              eventList :
              null
            }
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingTop: 10,
    jusifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  eventList: {
    width: '95%',
    paddingTop: 24,
  },
  errorModal: {
    marginTop: 60,
    width: '90%',
    justifyContents: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'yellow',
    backgroundColor: 'yellow',
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