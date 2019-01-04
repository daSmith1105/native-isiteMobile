//TODO: implement navigation for timelapse selection passed to the footer element
//      implement quickSearch feature on the right hand side of screen

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainNav from '../navigation/MainNav';
import QuickPicker from 'quick-picker';
import MediaContainer from '../components/MediaContainer';
import QuickTimeSearch from '../components/QuickTimeSearch';
import moment from 'moment';

let camCount = [];
const today = moment(new Date()).format('MM/DD/YY')

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: 'Birch Raquet Club',
      dataUsage: '',
      maxData: '',
      siteURL: 'https://birch.dividia.net/',
      projects: [],

  // Snapshot request
      snapShot: '',

  // Number of customer cams 
      selectedCam: '1',

  // Events arrays
      date: '' || today,
      events: [],
      images: [],
      videos: [],

  // Event filter state
      eventTypes: [ 'ALL', 'IMAGES', 'VIDEOS' ],
      currentEventType: 'ALL',
      filterEvents: false,

  //  Toggle state of Main Nav
      toggleNav: false,
    }

  // Function bindings
    this.handleCamSelect = this.handleCamSelect.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.getCurrentImage = this.getCurrentImage.bind(this);
    this.updateEventType = this.updateEventType.bind(this);
    this.setDate = this.setDate.bind(this);
    this.fetchNewByDate = this.fetchNewByDate.bind(this);
    this.fetchDataUsage = this.fetchDataUsage.bind(this);
    this.fetchSnapShot = this.fetchSnapShot.bind(this);
    this.checkForMultipleCams = this.checkForMultipleCams.bind(this);
    this.triggerFilter = this.triggerFilter.bind(this);
  }

// Fetch data for today's date onLoad
  componentDidMount() {
    this.triggerFilter()
    this.fetchDataUsage()
    this.fetchNewByDate()
    this.checkForMultipleCams()
  }

  // Fetch dataUsage
  fetchDataUsage() {
    this.setState({
        loading: true,
        error: false
    });
              // May need this proxy:
              // let proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch( this.state.siteURL + `ajax.php?action=getBandwidthUsage`)
    .then( response => {
          if (response.status !== 200) {
            console.log('Error. Status Code: ' + response.status);
            return;
          }
          response.json().then(data => {
              this.setState({
                 dataUsage: data.bTotal.toString().slice(0,4),
                 maxData: data.bDataPlanGB,
                 loading: false
                });
            })
      .catch(err => {
        console.log('Fetch Error: ', err);
            });
        })
  }

// Fetch all events by date and save filtered results to state
  fetchNewByDate(filter, date) {
    this.setState({
        loading: true,
        error: false,
        date: date || this.state.date
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
              let images = data.filter(d => d.sType === "STILL");
              // let thumbs = data.filter(d )
              let videos = data.filter(d => d.sType === "VIDEO");
              this.setState({
                 events: data,
                 images,
                 videos,
                 currentEventType: filter || 'ALL',
                 loading: false,
                 filterEvents: true
                });
            })
      .catch(err => {
        console.log('Fetch Error: ', err);
            });
        })
  }

  // Fetch current snapshot image
  fetchSnapShot() {
    this.setState({
        loading: true,
        error: false,
    });
              // May need this proxy:
              // let proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch( this.state.siteURL + `ajax.php?action=requestStill`)
      .then( response => {
            if (response.status !== 200) {
              console.log('Error. Status Code: ' + response.status);
              return;
            }
            // Fetch new image and update filter to show only images
            this.fetchNewByDate('IMAGES', today)
      });
  }

  // Check for multiple cameras
  checkForMultipleCams() {
    this.setState({
        loading: true,
        error: false
    });
              // May need this proxy:
              // let proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch( this.state.siteURL + `ajax.php?action=getProjects`)
      .then( response => {
            if (response.status !== 200) {
              console.log('Error. Status Code: ' + response.status);
              return;
            }
            response.json().then(data => {
              this.setState({
                 projects: data,
                 loading: false
                }, function(){ 
                  for( let x = 0; x < this.state.projects.length; x++ ){
                    camCount.push('Cam ' + (x + 1).toString())
                  }
                 });
            })
      .catch(err => {
        console.log('Fetch Error: ', err);
            });
        })
  }



// Set new date and fetch events for new date
  setDate( selectedDate ) {
    console.log( 'This is the date we recieved from Selection: ' + selectedDate )
    this.setState({ 
      date: moment(selectedDate).format('MM/DD/YY'),
     }, 
    function(){ 
      console.log('New state of date is: ' + this.state.date)
      this.fetchNewByDate(this.state.date) 
    })
  }

// Handle the selection of other cams if customer site has more than one
  handleCamSelect(cam) {
    this.setState({ selectedCam: cam },
      function(){console.log(this.state.selectedCam)});
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
    this.fetchSnapShot()
    this.toggleNav();
  }

// Set the current event filter based on picker input from footer bar
  updateEventType( eventType ) {
    this.setState({ 
      currentEventType: eventType,
    }, this.triggerFilter())
    
  }

// Set boolean for triggering rerender of media after filter selection
  triggerFilter() {
    this.setState({ filterEvents: !this.state.filterEvents })
  }
  
  render() {

    return (
      <View style={ styles.container }>

{/* ************************************************** */}
      {/* Header component containing logos and customer / data usage information */}
{/* ************************************************** */}
          <Header  site={ this.state.site } 
                    dataUsage={ this.state.dataUsage }
                    maxData={ this.state.maxData} />

{/* ************************************************** */}
      {/* Images, Video thumbnail display and quick search by hour */}
{/* ************************************************** */}
          <View style={ styles.mediaContainer } >
          {/* Testing for cam selected */}
            {/* <Text>{ this.state.selectedCam.toString() }</Text> */}
            <MediaContainer style={ styles.mediaContent } 
                            events={ this.state.events }
                            images={ this.state.images }
                            videos={ this.state.videos }
                            siteURL={ this.state.siteURL }
                            currentEventType={ this.state.currentEventType }
                            triggerFilter={ this.triggerFilter }
                            filterEvents={ this.state.filterEvents}
                            site={ this.state.site } 
                            date={ this.state.date } />

            <QuickTimeSearch style={ styles.quickTimeSearch } />
          </View>

{/* ************************************************** */}
      {/* Render MainNav or Footer based on state */}
{/* ************************************************** */}      
          { this.state.toggleNav ? 
            <MainNav 
                     toggleNav={ this.toggleNav }
                     projects={ this.state.projects }
                     camArray= { camCount }
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