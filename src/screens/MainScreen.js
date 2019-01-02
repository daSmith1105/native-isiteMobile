//TODO: implement navigation for timelapse selection passed to the footer element
//       implement quickSearch feature on the right hand side of screen

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainNav from '../navigation/MainNav';
import QuickPicker from 'quick-picker';
import MediaContainer from '../components/MediaContainer';
import QuickTimeSearch from '../components/QuickTimeSearch';
import moment from 'moment';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: 'Birch Raquet Club',
      dataUsage: '2GB',
      siteURL: 'https://birch.dividia.net/',

  // Number of customer cams 
      cams: ['1', '2', '3', '4'],
      selectedCam: '1',

  // Events arrays
      date: '' || moment(new Date()).format('MM/DD/YY'),
      events: [],
      images: [],
      videos: [],

  // Event filter state
      eventTypes: [ 'ALL', 'IMAGES', 'VIDEOS' ],
      currentEventType: 'ALL',

  //  Toggle state of Main Nav
      toggleNav: false,
      alert: ''
    }

    this.handleCamSelect = this.handleCamSelect.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.getCurrentImage = this.getCurrentImage.bind(this);
    this.updateEventType = this.updateEventType.bind(this);
    this.setDate = this.setDate.bind(this);
  }

// Fetch all events for today's date onLoad
  componentDidMount() {
    this.fetchNewByDate()
  }

// Fetch all events by date and save filtered results to state
  fetchNewByDate() {
    this.setState({
        loading: true,
        error: false
    });
              // May need this proxy:
              // let proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch( this.state.siteURL + `ajax.php?action=getEvents&date=` + this.state.date)
    .then( response => {
          if (response.status !== 200) {
            console.log('Error. Status Code: ' + response.status);
            return;
          }
          response.json().then(data => {
              let images = data.filter(d => d.sType==="STILL");
              let videos = data.filter(d => d.sType==="VIDEO");
              this.setState({
                 events: data,
                 images,
                 videos,
                 loading: false
                });
            })
      .catch(err => {
        console.log('Fetch Error: ', err);
            });
        })
  }


// Set new date and fetch events for new date
  setDate( selectedDate ) {
    console.log( 'THis is the date we recieved from Selection: ' + selectedDate )
    this.setState({ date: moment(selectedDate).format('MM/DD/YY') }, 
    function(){ 
      console.log('New state of date is: ' + this.state.date)
      this.fetchNewByDate() 
    })
  }

// Handle the selection of other cams if customer site has more than one
  handleCamSelect(cam) {
    this.setState({ selectedCam: cam });
  }

// Toggle the main navigation menu from footer bar
  toggleNav() {
    if(!this.state.toggleNav) {
      console.log('Nav opened!')
    } else {
      console.log('Nav closed!')
    }

    this.setState({ toggleNav: !(this.state.toggleNav) });
    // add easing in
  }

// Get a current image from the snapshot button in footer bar
  getCurrentImage() {
    // this.setState({ alert: 'snapshot being taken'});
    console.log('snapshot requested');
    this.toggleNav();
  }

// Set the current event filter based on picker input from footer bar
  updateEventType( eventType ) {
    this.setState({ currentEventType: eventType })
  }
  
  render() {

    return (
      <View style={ styles.container }>

{/* ************************************************** */}
      {/* Header component containing logos and customer / data usage information */}
{/* ************************************************** */}
          <Header  site={ this.state.site } 
                    dataUsage={ this.state.dataUsage } />

{/* ************************************************** */}
      {/* Images, Video thumbnail display and quick search by hour */}
{/* ************************************************** */}
          <View style={ styles.mediaContainer } >
            <Text>{ this.state.selectedCam.toString() }</Text>
            <MediaContainer style={ styles.mediaContent } 
                            events={ this.state.events }
                            images={ this.state.images }
                            videos={ this.state.videos }
                            siteURL={ this.state.siteURL }
                            currentEventType={ this.state.currentEventType } /> 

            <QuickTimeSearch style={ styles.quickTimeSearch } />
          </View>

{/* ************************************************** */}
      {/* Render MainNav or Footer based on state */}
{/* ************************************************** */}      
          { this.state.toggleNav ? 
            <MainNav 
                     toggleNav={ this.toggleNav }
                     availableCams={ this.state.cams }
                     selectedCam={ this.state.selectedCam }
                     updateCam= { this.handleCamSelect }
                     getSnapshot={ this.getCurrentImage } /> : 
            <View>
              <Footer toggleNav={ this.toggleNav }
                      currentEventType={ this.state.currentEventType }
                      eventTypes={ this.state.eventTypes }
                      updateEventType={ this.updateEventType }
                      date={ this.state.date }
                      setDate={ this.setDate } /> 
            </View> }

{/* ************************************************** */}
      {/* Placeholder for the Picker called in other components */}
{/* ************************************************** */}      
          <QuickPicker />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mediaContent: {
  
  },
  quickTimeSearch: {
  },
});