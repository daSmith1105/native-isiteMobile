//Contains logic to generate media array (elements), holds state of event filter

//TODO: if video add duration of video to bottom right corner of MediaElement
//      include progress bar for downloading and video spooling
//      add loader icon, etc for initial load and loading between filters and date select
//      handle the chance that there is no media available
//      determine how to speed media element load times 
//      see about moving event filter out of render?

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Linking, Image, SectionList, PixelRatio } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import MediaElement from './MediaElement';
import moment from 'moment';

let data;

class MediaContainer extends React.Component {

  constructor(props) {
    super(props);
 
    this._renderItem = this._renderItem.bind(this);
    this.scrollTo = this.scrollTo.bind(this);

    // this.getItemLayout = sectionListGetItemLayout({
    //     // The height of the row with rowData at the given sectionIndex and rowIndex
    //     getItemHeight: (rowData, sectionIndex, rowIndex) => sectionIndex === 0 ? 100 : 50,

    //     // These three properties are optional
    //     getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
    //     getSectionHeaderHeight: () => 20, // The height of your section headers
    //     getSectionFooterHeight: () => 10, // The height of your section footers
    // })

  }

  componentDidMount() {
    // this.sectionList.scrollToBottom();
  }

      _renderItem( { item } ) {
          let imageURL;
          const year = item.sTimeStamp.slice(0, 4);
          const month = item.sTimeStamp.slice(4, 6);
          const day = item.sTimeStamp.slice(6, 8);
          const hour = item.sTimeStamp.slice(8, 10);
          const minute = item.sTimeStamp.slice(10, 12);
          const dayNight = parseInt(hour) > 11 ? 'PM' : 'AM';
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
              progressBar= { this.props.progressBar }
              videoLoading={ this.props.videoLoading }
              videoReady={ this.props.videoReady }
              playVideo={ this.props.playVideo }
              bID={ item.bID }  
              currentComponent={ 'pb' + item.bID }  />           
          )
        
    }

    keyExtractor (item) {
      return item.bID;
    }

    scrollTo(sectionIndex,itemIndex = 1 ) {
    this.sectionList.scrollToLocation({
        sectionIndex: sectionIndex,
        itemIndex: itemIndex
        });
    }
    //     let sectionIndex = ( data.length - 1);
    //     let itemIndex = data[sectionIndex].data.length - 1;
    //     this.sectionList.scrollToLocation(
    //         {  
    //             itemIndex,
    //             sectionIndex: index,
    //             animated: true
    //         })
    // }


  render() {

    const { currentEventList } = this.props;

    data= [
        {title: '12AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '00').reverse() },
        {title: '1AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '01').reverse() },
        {title: '2AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '02').reverse() },
        {title: '3AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '03').reverse() },
        {title: '4AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '04').reverse() },
        {title: '5AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '05').reverse() },
        {title: '6AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '06').reverse() },
        {title: '7AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '07').reverse() },
        {title: '8AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '08').reverse() },
        {title: '9AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '09').reverse() },
        {title: '10AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '10').reverse() },
        {title: '11AM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '11').reverse() },
        {title: '12PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '12').reverse() },
        {title: '1PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '13').reverse() },
        {title: '2PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '14').reverse() },
        {title: '3PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '15').reverse() },
        {title: '4PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '16').reverse() },
        {title: '5PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '17').reverse() },
        {title: '6PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '18').reverse() },
        {title: '7PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '19').reverse() },
        {title: '8PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '20').reverse() },
        {title: '9PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '21').reverse() },
        {title: '10PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '22').reverse() },
        {title: '11PM', data: currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '23').reverse() }
        ]

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
 
            <SectionList
                style={ styles.eventList }
                ref={(sectionList) => { this.sectionList = sectionList }}
                renderItem={ this._renderItem }
                renderSectionHeader={({section: {title}}) => (
                    <Text style={{fontWeight: 'bold'}}>{title}</Text>
                    )}
                sections={ data }
                keyExtractor={ this.keyExtractor }
                getItemLayout={this.getItemLayout}
                /> :
                null
            }

            <View style={ styles.sectionSelector }>
                <TouchableHighlight onPress={ () => this.scrollTo(0) }>
                    <Text style={ styles.selector }>1AM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => this.scrollTo(1) }>
                    <Text style={ styles.selector }>2PM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => this.scrollTo(2) }>
                    <Text style={ styles.selector }>3PM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => this.scrollTo(3) }>
                    <Text style={ styles.selector }>4PM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => this.scrollTo(4) }>
                    <Text style={ styles.selector }>5PM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => this.scrollTo(5) }>
                    <Text style={ styles.selector }>6PM</Text>
                </TouchableHighlight>
            </View>

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
  sectionSelector: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 5,
  },
  eventList: {
    width: '95%',
    paddingTop: 24,
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
    marginLeft: 10,
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