//TODO: implement navigation to handle login and redirect to main screen
// May need this proxy for fetch requests:
   // let proxy = 'https://cors-anywhere.herokuapp.com/';

import React from 'react';
import { StyleSheet, StatusBar, View, AsyncStorage } from 'react-native';
import { FileSystem } from 'expo';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import TimelapseScreen from './src/screens/TimelapseScreen';
import FullScreenVideo from './src/screens/FullScreenVideo';
import FullScreenImage from './src/screens/FullScreenImage';
import FullScreenTimelapse from './src/screens/FullScreenTimelapse';
import QuickPicker from 'quick-picker';
import moment from 'moment';

const today = moment(new Date()).format('MM/DD/YY')
let camCount = [];

class App extends React.Component {
  constructor( props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      site: '', // full site name used in header
      siteTag: '', // short version of site used for URL
      siteList: [ 'birch', 'gte', 'ashgrovejs' ],
      siteURL: '',
      projects: [],
      camCount: [],
      eventTypes: [ 'ALL', 'IMAGES', 'VIDEOS' ],
      currentEventType: 'ALL',
      selectedCam: '1',
      loginError: false,
      showTimelapse: false,
      showFullImage: false,
      showFullVideo: false,
      showTimelapseVideo: false,
      sImage: '',
      sImageDate: '',
      sImageTime: '',
      sVideo: '',
      sVideoDate: '',
      sVideoTime: '',
      sVideoDuration: '',
      sTimelapse: '',
      sTimelapseStart: new Date,
      sTimelapseEnd: new Date,
      videoLoading: false,
      videoReady: false,
      dataUsage: '',
      maxData: '',
      progressBar: 0,
      filterEvents: true,
      snapShot: '',
      date: '' || today,
      events: [],
      images: [],
      videos: [],
      loading: false,
      fetchError: false,
      videoPaused: false,
      videoReload: false,
    }

    this.setLogout = this.setLogout.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.resolveSitename = this.resolveSitename.bind(this);
    this.toggleTimelapse = this.toggleTimelapse.bind(this);
    this.toggleTimelapseVideo = this.toggleTimelapseVideo.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.setCurrentImage = this.setCurrentImage.bind(this);
    this.requestVideo = this.requestVideo.bind(this);
    this.videoReady = this.videoReady.bind(this);
    this.setTimelapseStart = this.setTimelapseStart.bind(this);
    this.setTimelapseEnd = this.setTimelapseEnd.bind(this);
    this.setTimelapse= this.setTimelapse.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.downloadEvent = this.downloadEvent.bind(this);
    this.triggerFilter = this.triggerFilter.bind(this);
    this.checkForMultipleCams = this.checkForMultipleCams.bind(this);
    this.handleCamSelect = this.handleCamSelect.bind(this);
    this.updateEventType = this.updateEventType.bind(this);
    this.getCurrentImage = this.getCurrentImage.bind(this);
    this.fetchSnapShot = this.fetchSnapShot.bind(this);
    this.fetchNewByDate = this.fetchNewByDate.bind(this);
    this.setDate = this.setDate.bind(this);
    this.fetchDataUsage = this.fetchDataUsage.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleMainNav = this.toggleMainNav.bind(this);
    this.getTimelapseDay = this.getTimelapseDay.bind(this);
    this.getTimelapseWeek = this.getTimelapseWeek.bind(this);
    this.getTimelapseMonth = this.getTimelapseMonth.bind(this);
    this.getTimelapseProject = this.getTimelapseProject.bind(this);
    this.toggleLoginError = this.toggleLoginError.bind(this);
    this.toggleFetchError = this.toggleFetchError.bind(this);
    this.toggleVideoPaused = this.toggleVideoPaused.bind(this);
    this.toggleVideoReload = this.toggleVideoReload.bind(this);
    this.saveSessionVariable = this.saveSessionVariable.bind(this);
  }

  componentDidMount() {
    this.retrieveSessionVariable()
  }

  async saveSessionVariable() { 
    // eventually resue with (key, value)
    try {
      // await AsyncStorage.setItem( key.toString(), value );
      await AsyncStorage.setItem( 'isLoggedIn', 'true' );
      await AsyncStorage.setItem( 'siteTag', this.state.siteTag );
      console.log( 'saving session variables')
    } catch( error ) {
      console.log( 'Saving session variable to local storage failed. ' + error.message )
    }
  }

  async retrieveSessionVariable() {
    // eventually resue with (key, value)
    try {
      const vSiteTag = await AsyncStorage.getItem('siteTag');
      if( vSiteTag !== null ) {
        console.log( vSiteTag )
        this.resolveSitename( vSiteTag )
        this.setState({ siteTag: vSiteTag })
      }
      const vIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if( vIsLoggedIn !== null ) {
        console.log( vIsLoggedIn )
        this.setState({ isLoggedIn: vIsLoggedIn })
      }
    } catch( error ) {
      console.log( 'Retrieving session variable from local storage failed. ' + error.message )
    }

  }

  async clearSessionVariable() {
    try {
      // await AsyncStorage.removeItem( key.toString());
      await AsyncStorage.removeItem( 'isLoggedIn')
      await AsyncStorage.removeItem( 'siteTag' )
      console.log( 'removing session variables')
    } catch( error ) {
      console.log( 'Removing session variable from local storage failed. ' + error.message )
    }
  }
  

  // auth functions 
  validateLogin(userInput) {
    let siteList = this.state.siteList;

    if ( siteList.includes( userInput ) ) {
      this.resolveSitename( userInput );
      this.setState({ 
        siteTag: userInput,
        isLoggedIn: true
      },
        function() {
          this.saveSessionVariable()
      })
    } else {
      console.log( 'Error logging in with user \"' +  userInput + '\"')
      this.setState({ 
        error: true,
      },
        function(){
          setTimeout(
            () => this.clearError(), 5000)
          })
      }
  }

  setLogout() {
    console.log( 'clearing user session ....')
    this.clearSessionVariable()
    this.setState({   isLoggedIn: false,
                      site: '', // full site name used in header
                      siteTag: '', // short version of site used for URL
                      siteList: [ 'birch', 'gte', 'ashgrovejs' ],
                      siteURL: '',
                      projects: [],
                      camCount: [],
                      eventTypes: [ 'ALL', 'IMAGES', 'VIDEOS' ],
                      currentEventType: 'ALL',
                      selectedCam: '1',
                      loginError: false,
                      showTimelapse: false,
                      showFullImage: false,
                      showFullVideo: false,
                      showTimelapseVideo: false,
                      sImage: '',
                      sImageDate: '',
                      sImageTime: '',
                      sVideo: '',
                      sVideoDate: '',
                      sVideoTime: '',
                      sVideoDuration: '',
                      sTimelapse: '',
                      sTimelapseStart: new Date,
                      sTimelapseEnd: new Date,
                      videoLoading: false,
                      videoReady: false,
                      dataUsage: '',
                      maxData: '',
                      progressBar: 0,
                      filterEvents: true,
                      snapShot: '',
                      date: '' || today,
                      events: [],
                      images: [],
                      videos: [],
                      loading: false,
                      fetchError: false,
                      videoPaused: false,
                      videoReload: false,
                  }, function() {
                        camCount = [];
                        console.log( 'user session cleared' )
                        console.log(this.state)
                        console.log('camcount: ' + JSON.stringify(camCount))
                  })
  }

  resolveSitename( site ) {
    if ( site == 'gte' ) {
        this.setState({ 
          site: 'GoldenTriangle Estates',
          siteTag: site,
          siteURL: 'https://' + site + '.dividia.net/'  
        })
    } else if ( site == 'birch' ) {
        this.setState({ site: 'Birch Racquet Club',
        siteTag: site,
        siteURL: 'https://' + site + '.dividia.net/'  
      })
    } else if ( site == 'ashgrovejs' ) {
      this.setState({ site: 'Ashgrove Cement',
      siteTag: site,
      siteURL: 'https://' + site + '.dividia.net/'  
      }) 
    } else {
      console.log('site not found')
    }
  }

  clearError() {
    this.setState({ 
      error: false,
      fetchError: false
    })
  }

  //General data functions

  // Check for multiple cameras
  checkForMultipleCams() {
    console.log( 'https://' + this.state.siteTag + '.dividia.net/ajax.php?action=getProjects' );
    fetch( 'https://' + this.state.siteTag + '.dividia.net/ajax.php?action=getProjects')
      .then( response => {
            if (response.status !== 200) {
              console.log('Error. Status Code: ' + response.status);
              return;
            }
            response.json().then(data => {
              this.setState({
                 projects: data,
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

  // dataUasage functions

  handleCamSelect(cam) {
    this.setState({ selectedCam: cam },
      function(){console.log('currently selected camera project is: ' + this.state.selectedCam)});
  }

  // image event functions

  toggleImage( image, date, time ) {
    this.setCurrentImage(image, date, time);
    this.setState({ 
      showFullImage: !this.state.showFullImage
    }, function(){console.log(this.state.sImage)})
  }

  setCurrentImage(image, date, time ) {
    this.setState({ sImage: image,
                    sImageDate: date,
                    sImageTime: time })
  }

  // video event functions

  requestVideo( siteURL, bID ) {
    console.log('Downloading video ... ');
    console.log( siteURL + 'ajax.php?action=requestVideo&id=' + bID )
      fetch( siteURL + 'ajax.php?action=requestVideo&id=' + bID )
        .then( response => {
          if (response.status !== 200) {
            console.log('Error. Status Code: ' + response.status);
            return;
          }
          response.json().then( data => {
            if (data.status == 0 ) {

              var pollProgress = 
                setInterval(function() {
                  let done = 0;
                  if(done == 1) {
                    this.fetchNewByDate()
                  }
                  fetch( siteURL + 'ajax.php?action=getEventCacheProgress&id=' + bID)
                  .then( response => {
                    response.json().then( data => {
                      if (parseInt(data.dCacheProgress) >= 100){
                        console.log(bID + ': done')
                        clearInterval(pollProgress)
                      } 

                      console.log( parseInt(data.dCacheProgress) )
                      this.setState({ progressBar: parseInt( data.dCacheProgress ) })
                    })
                  })
                }, 1000 )
              }
            })
        })
  }

  playVideo ( sTimeStamp, date, time, duration ) {
    console.log( sTimeStamp )
    console.log( date )
    console.log( time )
    this.setState({
      sVideo: 'base/' + this.state.siteTag + '/video/' + sTimeStamp + '.mp4',
      sVideoDate: date,
      sVideoTime: time,
      sVideoDuration: duration
    })
    this.toggleVideo();
  }

  videoReady( bID ) {
    clearInterval(pollProgress)
    this.setState({ 
      videoLoading: false,
      videoReady: true 
    })
  }

  toggleVideo() {
    console.log('toggling Video')
    this.setState({ 
      showFullVideo: !this.state.showFullVideo,
      showTimelapse: !this.state.showTimelapse 
      })
  }

  // timelapse event functions 

  setTimelapse(url) {
    this.setState({ 
      sTimelapse: url,
     },
      function(){ console.log( 'this is the timelapse file: ' + this.state.sTimelapse ) })
  }

  setTimelapseStart(value) {
    this.setState({ sTimelapseStart: value })
  }

  setTimelapseEnd(value) {
    this.setState({ sTimelapseEnd: value })
  }

  toggleTimelapse() {
    this.setState({ showTimelapse: !this.state.showTimelapse })
  }
  
  toggleTimelapseVideo() {
    this.setState({ showTimelapseVideo: !this.state.showTimelapseVideo })
  }

  // event download function

  downloadEvent( type, URL, sTimeStamp ) {
    console.log(type)
    console.log(URL)
    console.log( sTimeStamp )
    if(type == 'IMAGE') {
      FileSystem.downloadAsync( URL,
        FileSystem.documentDirectory + 'image.jpg'
      )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri)
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      FileSystem.downloadAsync( URL,
        FileSystem.documentDirectory + 'video.mp4'
      )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri)
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  triggerFilter() {
    this.setState({ 
      filterEvents: !this.state.filterEvents
    })
  }

  updateEventType( eventType ) {
    this.setState({ 
      currentEventType: eventType,
    })
    this.triggerFilter()
  }

// Get a current image from the snapshot button in footer bar
  getCurrentImage() {
    console.log('snapshot requested');
    this.fetchSnapShot()
    this.toggleMainNav();
  }

  // Fetch current snapshot image
  fetchSnapShot() {
    fetch( 'https://' + this.state.siteTag + '.dividia.net/ajax.php?action=requestStill' )
      .then( response => {
            if (response.status !== 200) {
              console.log('Error. Status Code: ' + response.status);
              return;
            }
            // Fetch new image and update filter to show only images
            this.fetchNewByDate('IMAGES', today)
          })
      .catch(err => {
        console.log('Fetch Error: ', err);
      });
    }

    // Fetch all events by date and save filtered results to state
  fetchNewByDate(filter, date) {
    this.setState({
        loading: true,
        date: date || this.state.date,
        currentEventType: filter || 'ALL',
        fetchError: false
    },
    function(){ console.log( 'fetchError cleared' )});
              // May need this proxy:
              // let proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch( 'http://' + this.state.siteTag + `.dividia.net/ajax.php?action=getEvents&date=` + this.state.date)
    .then( response => {
          if (response.status !== 200) {
            this.setState({
              loading: false,
              fetchError: true
            })
            console.log('Server Error. Status Code: ' + response.status);
            return;
          }
          response.json().then(data => {
              let images = data.filter(d => d.sType === "STILL").reverse();
              let videos = data.filter(d => d.sType === "VIDEO").reverse();
              this.setState({
                 events: data.reverse(),
                 images,
                 videos,
                 currentEventType: filter || 'ALL',
                 loading: false
                });
                this.triggerFilter()
          })
      .catch(err => {
        console.log('Fetch Error: ', err);
      })
    })
  }


  // Set new date and fetch events for new date
  setDate( selectedDate ) {
    this.setState({ 
      date: moment(selectedDate).format('MM/DD/YY'),
     }, 
    function(){ 
      console.log('New state of date is: ' + this.state.date)
      this.fetchNewByDate('ALL', this.state.date) 
    })
  }

// Fetch dataUsage
  fetchDataUsage() {
    fetch( 'https://' + this.state.siteTag + `.dividia.net/ajax.php?action=getBandwidthUsage`)
    .then( response => {
          if (response.status !== 200) {
            console.log('Error. Status Code: ' + response.status);
            return;
          }
          response.json().then(data => {
                  this.setState({ 
                    dataUsage: data.bTotal.toString().slice(0,3), 
                    maxData: data.bDataPlanGB 
                  })
                })
            })
      .catch(err => {
        console.log('Fetch Error: ', err);
            });
        }

// Toggle loader for waiting on events fetch
  toggleLoading() {
    this.setState({ loading: !this.state.loading })
  }

  // Toggle the main navigation menu from footer bar
  toggleMainNav() {
    if(!this.state.toggleNav) {
      console.log('Nav opened!')
    } else {
      console.log('Nav closed!')
    }

    this.setState({ showMainNav: !this.state.showMainNav });
    // add easing in
  }

  getTimelapseDay() {
    console.log('loading timelapse Day ... ');
    const today = moment().format('YYYY/MM/DD');
      fetch( this.state.siteURL + 'timelapse.php?start=' + today + '&end=' + today )
  }

  getTimelapseWeek() {
    console.log('loading timelapse Week ... ');
    const today = moment().format('YYYY/MM/DD');
    const lastWeek = moment().subtract(7,'d').format('YYYY/MM/DD');

      fetch( this.state.siteURL + 'timelapse.php?start=' + lastWeek + '&end=' + today )
  }

  getTimelapseMonth() {
    console.log('loading timelapse Month ... ');
    const today = moment().format('YYYY/MM/DD');
    const lastMonth = moment().subtract(30,'d').format('YYYY/MM/DD');
      fetch( this.state.siteURL + 'timelapse.php?start=' + lastMonth + '&end=' + today )
  }

  getTimelapseProject() {
    console.log('loading timelapse Entire Project ... ');
    const today = moment().format('YYYY/MM/DD');
    const fiveYears = moment().subtract(1800,'d').format('YYYY/MM/DD');
      fetch( this.state.siteURL + 'timelapse.php?start=' + fiveYears + '&end=' + today )
  }
  
  toggleLoginError() {
    this.setstate({ 
      error: !this.state.error 
    })
  }

  toggleFetchError() {
    this.setstate({ 
      fetchError: !this.state.fetchError,
      loading: !this.state.loading
    })
  }

  toggleVideoPaused() {
    this.setState({ 
      videoPaused: !this.state.videoPaused 
    })
  }

  toggleVideoReload() {
    this.setState({
      videoReload: !this.state.videoReload
    })
  }

  render() {

      return (

          <View style={ styles.container }>

            {/* Main app view */}
            { this.state.isLoggedIn && !this.state.showTimelapse 
                                    && !this.state.showFullImage 
                                    && !this.state.showFullVideo
                                    && !this.state.showTimelapseVideo  ? 
              <MainScreen setLogout={ this.setLogout }
                          loggedIn={ this.state.isLoggedIn}
                          site={ this.state.site }
                          siteTag={ this.state.siteTag }
                          camArray = { camCount }
                          checkForMultipleCams = { this.checkForMultipleCams }
                          toggleTimelapse={ this.toggleTimelapse }
                          toggleImage={ this.toggleImage }
                          timelapse={ this .state.showTimelapse }
                          dataUsage={ this.state.dataUsage }
                          maxData={ this.state.maxData }
                          setCurrentImage={ this.setCurrentImage }
                          requestVideo={ this.requestVideo }
                          progressBar={ this.state.progressBar }
                          playVideo={ this.playVideo }
                          videoLoading={ this.state.videoLoading }
                          videoReady={ this.state.videoReady }
                          downloadEvent={ this.downloadEvent }
                          setTimelapse={ this.setTimelapse }
                          triggerFilter={ this.triggerFilter } 
                          filterEvents={ this.state.filterEvents}
                          selectedCam={ this.state.selectedCam }
                          handleCamSelect = { this.handleCamSelect }
                          projects={ this.state.projects }
                          eventTypes={ this.state.eventTypes }
                          updateEventType={ this.updateEventType }
                          currentEventType={ this.state.currentEventType }
                          getCurrentImage= { this.getCurrentImage }
                          fetchNewByDate = { this.fetchNewByDate }
                          events={ this.state.events }
                          images={ this.state.images }
                          videos={ this.state.videos }
                          date={ this.state.date } 
                          setDate={ this.setDate }
                          fetchDataUsage={ this.fetchDataUsage }
                          toggleLoading={ this.toggleLoading }
                          loading={ this.state.loading }
                          toggleMainNav={ this.toggleMainNav }
                          showMainNav={ this.state.showMainNav }
                          getTimelapseDay={ this.getTimelapseDay }
                          getTimelapseWeek={ this.getTimelapseWeek }
                          getTimelapseMonth={ this.getTimelapseMonth }
                          getTimelapseProject={ this.getTimelapseProject }
                          fetchError={ this.state.fetchError }
                          error={ this.state.error }
                          toggleError={ this.toggleError } /> :
              null }

            { !this.state.isLoggedIn  ? 
              <LoginScreen setLogin={ this.setLogin } 
                            setLogout={ this.setLogout }
                            loggedIn={ this.state.isLoggedIn }
                            validateLogin={ this.validateLogin }
                            noInput={ this.state.noInput }
                            error={ this.state.error }
                            checkLogin={ this.checkLogin } /> :
              null }    

            { this.state.isLoggedIn && this.state.showTimelapse  
                                    && !this.state.showFullVideo 
                                    && !this.state.showFullImage 
                                    && !this.state.showTimelapseVideo ? 
              <TimelapseScreen site={ this.state.site }
                                siteTag={ this.state.siteTag }
                                siteURL={ this.state.siteURL }
                                toggleTimelapse={ this.toggleTimelapse }
                                toggleTimelapseVideo={ this.toggleTimelapseVideo }
                                dataUsage={ this.state.dataUsage }
                                maxData={ this.state.maxData }
                                timelapseDay={ this.state.timelapseDay }
                                timelapseWeek={ this.state.timelapseWeek }
                                timelapseMonth={ this.state.timelapseMonth }
                                timelapseAll={ this.state.timelapseAll }
                                setTimelapseStart={ this.setTimelapseStart }
                                setTimelapseEnd={ this.setTimelapseEnd }
                                setTimelapse={ this.setTimelapse }
                                timelapseStart={ this.state.sTimelapseStart }
                                timelapseEnd={ this.state.sTimelapseEnd } /> :
              null }

            {/* <FullScreenImage /> */}
            { this.state.isLoggedIn && this.state.showFullImage  ? 
              <FullScreenImage  toggleImage={ this.toggleImage }
                                sImage={ this.state.sImage }
                                sImageDate={ this.state.sImageDate }
                                sImageTime={ this.state.sImageTime }
                                siteURL={ this.state.siteURL }
                                downloadEvent={ this.downloadEvent } /> :
              null }

              {/* <FullScreenVideo /> */}
              { this.state.isLoggedIn && this.state.showFullVideo && !this.state.showTimelapseVideo ? 
              <FullScreenVideo  toggleVideo={ this.toggleVideo }
                                sVideo={ this.state.sVideo }
                                sVideoDate={ this.state.sVideoDate }
                                sVideoTime={ this.state.sVideoTime }
                                sVideoDuration={ this.state.sVideoDuration}
                                siteURL={ this.state.siteURL }
                                downloadEvent={ this.downloadEvent }
                                videoReload={ this.state.videoReload }
                                videoPaused={ this.state.videoPaused }
                                toggleVideoPaused={ this.toggleVideoPaused } 
                                toggleVideoReload={ this.toggleVideoReload } /> :
              null }

              {/* <FullScreenTimelapse /> */}
              { this.state.isLoggedIn && this.state.showTimelapseVideo ? 
              <FullScreenTimelapse toggleTimelapseVideo={ this.toggleTimelapseVideo }
                                   sTimelapse={ this.state.sTimelapse }
                                   siteTag={ this.state.siteTag }
                                   downloadEvent={ this.downloadEvent } /> :
              null }

            {/* Hide the top status bar on ios */}
            <StatusBar hidden={ true } style={ styles.statusBar }/>

            <QuickPicker />

          </View>

      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});


export default App;