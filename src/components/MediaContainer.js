//Contains logic to generate media array (elements), holds state of event filter

//TODO: determine how to speed media element load times 

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Linking, Image, FlatList, Button } from 'react-native';
import MediaElement from './MediaElement';
import moment from 'moment';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class MediaContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.currentEventList
    }
  }

      _renderItem = ({ item }) => {
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
              bID={ item.bID }
              tags={ item.oTags || [] } />           
          ) 
    }

  keyExtractor (item) {
    return item.bID;
  }
  
  _listEmptyComponent = () => {
    return (
        <View>
            <Text style={{ fontSize: scale(30), textAlign: 'center', marginTop: 40 }}>Nothing to display</Text>
            <View style={{  padding: 5, 
                            borderColor: 'grey', 
                            borderWidth: 2, 
                            borderRadius: 5, 
                            fontSize: scale(20), 
                            color: 'grey', 
                            width: '60%', 
                            maxWidth: 400,
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            marginTop: verticalScale(30) }}>
            <Button
              title="Refresh"
              color="grey"
              onPress={() => this.props.fetchNewByDate() }
            />
            </View>
        </View>
    )
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
                  inverted={ currentEventList.length > 0 ? true : false }
                  keyExtractor={ this.keyExtractor }
                  keyboardShouldPersistTaps='always'
                  ListEmptyComponent={this._listEmptyComponent}
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
    paddingTop: verticalScale(40),
    marginTop: verticalScale(-30),
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  eventList: {
    flex: 1,
    width: '90%',
  },
  errorModal: {
    marginTop: moderateScale(-50),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'yellow',
    padding: moderateScale(10),
    marginLeft: moderateScale(10),
  },
  error: {
    fontSize: moderateScale(24, .2),
    textAlign: 'center',
    marginBottom: moderateScale(14),
  },
  errorContact: {
    fontSize: moderateScale(20, .2),
    textAlign: 'center',
    marginBottom: moderateScale(14),
  },
  phone: {
    fontSize: moderateScale(20, .2),
    textAlign: 'center',
    marginBottom: moderateScale(14),
  },
  support: {
    fontSize: moderateScale(20, .2),
    color: 'blue',
    textAlign: 'center',
    marginTop: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  loader: {
    width: moderateScale(260),
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  loaderContainer: {
    borderWidth: 5,
    borderColor: '#0075A2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: moderateScale(20),
    width: '100%',
    paddingBottom: moderateScale(10),
  },
  loaderText: {
    fontSize: moderateScale(28, .2),
    color: '#0075A2',
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  loaderIcon: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: 10,
    backgroundColor: 'white'
  }
});