//Contains logic to generate media array (elements), holds state of event filter

//TODO: if video add duration of video to bottom right corner of MediaElement
//      include progress bar for downloading and video spooling
//      add loader icon, etc for initial load and loading between filters and date select
//      handle the chance that there is no media available
//      determine how to speed media element load times 
//      see about moving event filter out of render?

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Linking, Image, FlatList, ScrollView } from 'react-native';
import MediaElement from './MediaElement';
import moment from 'moment';


class MediaContainer extends React.Component {

  constructor(props) {
    super(props);
 
    this._renderItem = this._renderItem.bind(this);
 
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

    let data0 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '00').reverse();
    let data1 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '01').reverse();
    let data2 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '02').reverse();
    let data3 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '03').reverse();
    let data4 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '04').reverse();
    let data5 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '05').reverse();
    let data6 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '06').reverse();
    let data7 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '07').reverse();
    let data8 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '08').reverse();
    let data9 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '09').reverse();
    let data10 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '10').reverse();
    let data11 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '11').reverse();
    let data12 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '12').reverse();
    let data13 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '13').reverse();
    let data14 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '14').reverse();
    let data15 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '15').reverse();
    let data16 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '16').reverse();
    let data17 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '17').reverse();
    let data18 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '18').reverse();
    let data19 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '19').reverse();
    let data20 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '20').reverse();
    let data21 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '21').reverse();
    let data22 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '22').reverse();
    let data23 = currentEventList.filter(s => s.sTimeStamp.slice(8,10) === '23').reverse();
     

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
  <ScrollView style={ styles.eventList }
              ref={ ref => this.scrollView = ref }
              onContentSizeChange={( contentWidth, contentHeight ) => {        
                  this.scrollView.scrollToEnd({ animated: false });
              }}
              inverted={true}>
            <FlatList
                data={data0}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={ data0.length }
                scrollEnabled={ false }
                /> 
                <FlatList
                data={data1}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data1.length}
                scrollEnabled={false}
                />
                <FlatList
                data={data2}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data2.length}
                scrollEnabled={false}
                />
                <FlatList
                data={data3}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data3.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data4}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data4.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data5}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data5.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data6}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data6.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data7}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data7.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data8}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data8.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data9}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data9.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data10}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data10.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data11}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data11.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data12}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data12.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data13}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data13.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data14}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data14.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data15}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data15.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data16}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data16.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data17}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data17.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data18}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data18.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data19}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data19.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data20}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data20.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data21}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data21.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data22}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data22.length}
                scrollEnabled={false}
                />
                 <FlatList
                data={data23}
                renderItem={ this._renderItem }
                // getItemLayout={(data, index) => (
                //   { length: 210, offset: 210 * index, index }
                // )}
                keyExtractor={ this.keyExtractor }
                initialNumToRender={data23.length}
                scrollEnabled={false}
                />
                </ScrollView>
                :
                null
            }

            {/* <View style={ styles.sectionSelector }>
                <TouchableHighlight onPress={ () => console.log('12am pressed') }>
                    <Text style={ styles.selector }>12AM</Text>
                </TouchableHighlight> */}
                {/* <TouchableHighlight onPress={ () => console.log('1am pressed') }>
                    <Text style={ styles.selector }>1AM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => console.log('2am pressed') }>
                    <Text style={ styles.selector }>2AM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => console.log('3am pressed') }>
                    <Text style={ styles.selector }>3AM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => console.log('4am pressed') }>
                    <Text style={ styles.selector }>4AM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => console.log('5am pressed') }>
                    <Text style={ styles.selector }>5AM</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => console.log('6am pressed') }>
                    <Text style={ styles.selector }>6AM</Text>
                </TouchableHighlight> */}
            {/* </View> */}

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
    flexGrow: 1,
    width: '95%',
    paddingTop: 24,
    marginBottom: 36,
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