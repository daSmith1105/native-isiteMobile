//Contains logic to generate media array (elements), holds state of event filter

//TODO: determine how to speed media element load times 

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Linking, Image, FlatList } from 'react-native';
import MediaElement from './MediaElement';
import moment from 'moment';


class MediaContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.currentEventList
    }
 
    this._renderItem = this._renderItem.bind(this);
 
  }

      _renderItem( { item } ) {
          let imageURL;
          const year = item.sTimeStamp.slice(0, 4);
          const month = item.sTimeStamp.slice(4, 6);
          const day = item.sTimeStamp.slice(6, 8);
          let hour = item.sTimeStamp.slice(8, 10);
          const minute = item.sTimeStamp.slice(10, 12);
          const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';
          if( hour > 12 ) { hour = hour - 12 }
          const date = month + '/' + day + '/' + year;
          const time = hour + ':' + minute + ' ' + dayNight;

          if( item.sType == 'STILL' && item.sThumbnailM != null ) {  
            imageURL = 'https://' + this.props.siteTag + '.dividia.net/' + item.sThumbnailM;
          } else {
            imageURL = 'https://' + this.props.siteTag + '.dividia.net/thumbnail.php?&size=m&img=' + item.sImage;
          }

          return (
            <MediaElement 
              sTimeStamp={ item.sTimeStamp }
              date={ date }
              time={ time }
              image={ imageURL }
              siteTag={ this.props.siteTag }
              siteURL={ this.props.siteURL }
              downloadImageEvent={ this.props.downloadImageEvent }
              toggleImage={ this.props.toggleImage } 
              sImage={ item.sImage }
              duration={ item.bDuration }
              sType={ item.sType }
              cached={ item.fCached }
              cachedProgress={ parseInt( item.dCacheProgress ) }
              requestVideo={ this.props.requestVideo }
              videoLoading={ this.props.videoLoading }
              videoReady={ this.props.videoReady }
              playVideo={ this.props.playVideo }
              bID={ item.bID }   />           
          ) 
    }

    keyExtractor (item) {
      return item.bID;
    }


  render() {

    const { currentEventList } = this.props;

      return (

        <View style={ styles.scroll }>
            { this.props.loading && !this.props.fetchError ? 
                <View style={ styles.loader }>
                  <View style={ styles.loaderContainer }>
                    <Text style={ styles.loaderText }>Loading Events</Text>
                    <Image source={ require('../../assets/images/loader-small.gif') }
                          style={ styles.loaderIcon } />
                  </View>
                </View> : 
                null 
            } 

            { this.props.fetchError && !this.props.loading ?
                <View style={ styles.errorModal }>
                  <Text style={ styles.error }>Fetching events failed for { this.props.date }.</Text>
                  { this.props.date < moment(new Date()).format('MM/DD/YY') ?
                    <Text style={ styles.error }>Was this camera system offline?</Text> :
                    <Text style={ styles.error }>Is this camera system offline?</Text>
                  }
                  <Text style={ styles.errorContact }>If the problem persists please contact Dividia.</Text>
                  <Text style={ styles.phone }>817-288-1040</Text> 
                  <TouchableHighlight onPress={() => 
                    Linking.openURL('mailto:support@dividia.net?subject= ' + this.props.site + ' - iSite Support Request' ) }>
                    <Text style={ styles.support }>support@dividia.net</Text>
                  </TouchableHighlight>
                </View> :
                null
            }

            { !this.props.loading && !this.props.fetchError  ? 
                <FlatList style={ styles.eventList }
                  data={ currentEventList }
                  renderItem={ this._renderItem }
                  inverted={ true }
                  keyExtractor={ this.keyExtractor }
                  keyboardShouldPersistTaps='always'
                  />
                :
                null
            }

        </View>
      )
  }
}

export default MediaContainer;


const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  eventList: {
    flex: 1,
    width: '90%',
    paddingTop: 24,
    marginBottom: 5,
  },
  errorModal: {
    marginTop: -50,
    width: '90%',
    justifyContent: 'center',
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
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  loader: {
    width: 260,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // marginLeft: 10,
  },
  loaderContainer: {
    borderWidth: 5,
    borderColor: '#0075A2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    width: '100%',
    paddingBottom: 10,
  },
  loaderText: {
    fontSize: 28,
    color: '#0075A2',
    textAlign: 'center',
    marginTop: 10,
  },
  loaderIcon: {
    width: 200,
    height: 200,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: 'white'
  }
});