//TODO: implement navigation to handle login and redirect to main screen
// May need this proxy for fetch requests:
   // let proxy = 'https://cors-anywhere.herokuapp.com/';

import React from 'react';
import { StyleSheet, StatusBar, View, AsyncStorage, CameraRoll, Dimensions } from 'react-native';
import { FileSystem, ScreenOrientation } from 'expo';
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
      loginLoading: false,
      site: '', // full site name used in header
      siteTag: '', // short version of site used for URL
      siteURL: '',
      projects: [],
      eventTypes: [ 'ALL', 'IMAGES', 'VIDEOS' ],
      currentEventType: 'ALL',
      currentEventList: [],
      selectedCam: 0,
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
      snapShot: '',
      date: today,
      events: [],
      images: [],
      videos: [],
      loading: false,
      fetchError: false,
      videoPaused: false,
      videoReload: false,
      done: false,
      renderEventsList: false,
      mediaDownloadLoading: false,
      mediaDownloadSuccess: false,
      mediaDownloadFailed: false,
      isPortrait: true,
    }

    this.setLogout = this.setLogout.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.resolveSitename = this.resolveSitename.bind(this);
    this.toggleTimelapse = this.toggleTimelapse.bind(this);
    this.toggleTimelapseVideo = this.toggleTimelapseVideo.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.setCurrentImage = this.setCurrentImage.bind(this);
    this.videoReady = this.videoReady.bind(this);
    this.setTimelapseStart = this.setTimelapseStart.bind(this);
    this.setTimelapseEnd = this.setTimelapseEnd.bind(this);
    this.setTimelapse= this.setTimelapse.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.downloadImageEvent = this.downloadImageEvent.bind(this);
    this.downloadVideoEvent = this.downloadVideoEvent.bind(this);
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
    this.saveSessionVariable = this.saveSessionVariable.bind(this);
    this.loadNewCam = this.loadNewCam.bind(this);
    this.setCurrentEventList = this.setCurrentEventList.bind(this);
    this.toggleMediaDownloadStatus = this.toggleMediaDownloadStatus.bind(this);
    this.switchToPortrait = this.switchToPortrait.bind(this);
    this.switchtoLandscape = this.switchToLandscape.bind(this);
    this.orientationChangeHandler = this.orientationChangeHandler.bind(this);
  
    }

  componentDidMount() {
      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
      Dimensions.addEventListener(
        'change',
        this.orientationChangeHandler
      );
      this.switchToPortrait();
      this.retrieveSessionVariable();
  }

  orientationChangeHandler(dims) {
    const { width, height } = dims.window;
    const isLandscape = width > height;
    this.setState({ isPortrait: !isLandscape });
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  }

  switchToLandscape() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  switchToPortrait() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  async saveSessionVariable() { 
    // eventually resue with (key, value)
    try {
      // await AsyncStorage.setItem( key.toString(), value );
      await AsyncStorage.setItem( 'isLoggedIn', 'true' );
      await AsyncStorage.setItem( 'siteTag', this.state.siteTag );
      console.log( 'saving session variables')
    } catch( error ) {
      console.log( 'Saving session variable to local storage FAILED. ' + error.message )
    }
  }

  async retrieveSessionVariable() {
    // eventually redo with (key, value)
    try {
      const vSiteTag = await AsyncStorage.getItem('siteTag');
      if( vSiteTag !== null ) {

        this.resolveSitename( vSiteTag )
        this.setState({ siteTag: vSiteTag })
      } else {
        this.setState({ siteTag: '' })
      }
      const vIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if( vIsLoggedIn !== null ) {
  
        this.setState({ isLoggedIn: vIsLoggedIn })
      } else {
        this.setState({ isLoggedIn: false })
      }

        this.fetchNewByDate( today, 'ALL')
        this.fetchDataUsage()
        this.checkForMultipleCams();

    } catch( error ) {
      console.log( 'Retrieving session variable from local storage FAILED ' + error.message )
    }

  }

  async clearSessionVariable() {
    try {
      // await AsyncStorage.removeItem( key.toString());
      await AsyncStorage.removeItem( 'isLoggedIn')
      await AsyncStorage.removeItem( 'siteTag' )
      console.log( 'removing session variables')
    } catch( error ) {
      console.log( 'Removing session variable from local storage FAILED. ' + error.message )
    }
  }
  

  // auth functions 
  validateLogin(userInput) {
    this.setState({ loginLoading: true })
    fetch( 'https://' + userInput + '.dividia.net/ajax.php?action=customerExists&domain=' + userInput + '.dividia.net')
      .then( response => {
        if (response.status === 404 ) {
          console.log( 'Error logging in with user \"' +  userInput + '\"')
          this.setState({ 
            error: true,
            loginLoading: false
          },
            function(){
              setTimeout(
                () => this.clearError(), 5000)
              })
              return;
        }

        response.json().then(data => {
          if ( data.result === true ) {
            this.resolveSitename( userInput );
            this.setState({ 
              siteTag: userInput,
              isLoggedIn: true,
              loginLoading: false
            },
              function() {
                this.fetchNewByDate( today, 'ALL' )
                this.fetchDataUsage()
                this.checkForMultipleCams();
                this.saveSessionVariable()
          })
        } else if ( data.result === false ) {
          console.log( 'Error logging in with user \"' +  userInput + '\"')
          this.setState({ 
            error: true,
            loginLoading: false
          },
            function(){
              setTimeout(
                () => this.clearError(), 5000)
              })
          } else {
            console.log('Other error.')
          }
      })
  })
}

  setLogout() {
    this.clearSessionVariable()
    this.setState({   isLoggedIn: false,
      isLoggedIn: false,
      site: '', // full site name used in header
      siteTag: '', // short version of site used for URL
      siteURL: '',
      projects: [],
      eventTypes: [ 'ALL', 'IMAGES', 'VIDEOS' ],
      currentEventType: 'ALL',
      currentEventList: [],
      selectedCam: 0,
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
      snapShot: '',
      date: today,
      events: [],
      images: [],
      videos: [],
      loading: false,
      fetchError: false,
      videoPaused: false,
      videoReload: false,
      done: false,
      renderEventsList: false,
      mediaDownloadLoading: false,
      mediaDownloadSuccess: false,
      mediaDownloadFailed: false,
      isPortrait: true,
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
    this.setState({ selectedCam: ( cam - 1 ) }, () =>
      this.loadNewCam(cam - 1) )
  }

  // load selected cam events from multiple cam select 

  loadNewCam( newCam ) {
    fetch( 'https://' + this.state.siteTag + '.dividia.net/index.php?setproject=' + newCam )
    .then( response => {
      if (response.status !== 200) {
        console.log('Error. Status Code: ' + response.status);
        return;
      }
      this.fetchNewByDate( this.state.date, this.state.currentEventType )
      this.fetchDataUsage()
    })
  }

  // image event functions

  toggleImage( image, date, time ) {
    this.setCurrentImage(image, date, time);
    this.setState({ 
      showFullImage: !this.state.showFullImage,
      showMainNav: false
    })
  }

  setCurrentImage(image, date, time ) {
    this.setState({ sImage: image,
                    sImageDate: date,
                    sImageTime: time })
  }

  playVideo ( sTimeStamp, date, time, duration ) {
    let videoURL;
    if (this.state.projects.length > 1) {
      videoURL = 'base/' + this.state.siteTag + '/cam' + (this.state.selectedCam + 1) + '/video/' + sTimeStamp + '.mp4';
    } else {
      videoURL = 'base/' + this.state.siteTag + '/video/' + sTimeStamp + '.mp4'
    }
    this.setState({
      sVideo: videoURL,
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
    this.setState({ 
      showFullVideo: !this.state.showFullVideo,
      showTimelapse: !this.state.showTimelapse,
      showMainNav: false
      })
      this.fetchNewByDate();
  }

  // timelapse event functions 

  setTimelapse(url) {
    this.setState({ 
      sTimelapse: url,
     })
  }

  setTimelapseStart(value) {
    this.setState({ sTimelapseStart: value })
  }

  setTimelapseEnd(value) {
    this.setState({ sTimelapseEnd: value })
  }

  toggleTimelapse() {
    this.setState({ 
      showTimelapse: !this.state.showTimelapse,
      showMainNav: false })
  }
  
  toggleTimelapseVideo() {
    this.setState({ showTimelapseVideo: !this.state.showTimelapseVideo })
  }

  toggleMediaDownloadStatus() {
      setTimeout(() => {
      this.setState({ 
        mediaDownloadSuccess: false,
        mediaDownloadFailed: false 
      })
    }, 3000 )
  }


  // event download function

  async downloadImageEvent( image ) {
    this.setState({ 
      mediaDownloadLoading: true
    })
    const fileUri = FileSystem.documentDirectory + 'image.jpg';
      await FileSystem.downloadAsync(
        image,
        fileUri
      )
        .then(({ uri }) => {
          var promise = CameraRoll.saveToCameraRoll(fileUri, 'photo');
            promise.then(function(result) {
              this.setState({ 
                mediaDownloadLoading: false,
                mediaDownloadSuccess: true 
              }, 
                this.toggleMediaDownloadStatus 
            )
            }.bind(this))
            .catch(function(error) {
            });
          })
          .catch(error => {
            console.error(error);
          });
  }

  async downloadVideoEvent( video ) {
    this.setState({ mediaDownloadLoading: true })
    const fileUri = FileSystem.documentDirectory + 'video.mp4';
      await FileSystem.downloadAsync(
        video,
        fileUri
      )
        .then(({ uri }) => {
          var promise = CameraRoll.saveToCameraRoll( fileUri, 'video' );
          promise.then(function(result) {
            this.setState({ 
              mediaDownloadLoading: false,
              mediaDownloadSuccess: true 
            }, 
              this.toggleMediaDownloadStatus 
          )
          }.bind(this))
          .catch(function(error) {
            this.setState({
              mediaDownloadLoading: false,
              mediaDownloadFailed: true
            })
            setTimeout(function() {
              this.setState({ mediaDownloadFailed: false })
            }, 5000)
          });
        })
        .catch(error => {
          console.error(error);
        });
  }

  setCurrentEventList( type ) {
    switch (type.toString()) {
      case 'ALL':
        this.setState({ 
          currentEventList: this.state.events
        })
      break;
      case 'IMAGES':
        this.setState({ 
          currentEventList: this.state.images
        })
      break;
      case 'VIDEOS':
        this.setState({ 
          currentEventList: this.state.videos
        })
      break;
      default: 
        this.setState({ 
          currentEventList: this.state.events
        })
    }
  }

  updateEventType( type ) {
    this.setState({ currentEventType: type },
      () => this.setCurrentEventList( type ))
  }

// Get a current image from the snapshot button in footer bar
  getCurrentImage() {
    this.fetchSnapShot()
    this.toggleMainNav()
    }
  

  // Fetch current snapshot image
  fetchSnapShot() {
    fetch( 'https://' + this.state.siteTag + '.dividia.net/ajax.php?action=requestStill' )
      .then( response => {
            if (response.status !== 200) {
              console.log('Error. Status Code: ' + response.status);
              return;
            }
            this.setState({ loading: true })
            setTimeout(() => {
              this.fetchNewByDate( today, 'IMAGES')
            }, 4000)
            setTimeout(() => {
              this.setState({ loading: false })
            }, 4100)    
          })
      .catch(err => {
        console.log('Fetch Error: ', err);
      });
    }

    // Fetch all events by date and save filtered results to state
  fetchNewByDate( uDate, sFilterType ) {
    let date;
    let filterType;

    if( uDate ) { 
      date = uDate 
    } else { 
      date = this.state.date 
    }

    if( sFilterType ) { 
      filterType = sFilterType 
    } else { 
      filterType = 'ALL' }

      this.setState({
          loading: true,
          fetchError: false,
          date: date,
      });
    fetch( 'https://' + this.state.siteTag + '.dividia.net/ajax.php?action=getEvents&date=' + this.state.date )
    .then( response => {
          if (response.status !== 200) {
            console.log('ooops, could not connect to server')
          }
          response.json().then(data => {
              if( data.length > 0 ) {  
                // .reverse()
              let images = data.filter(d => d.sType === "STILL").reverse();
              let videos = data.filter(d => d.sType === "VIDEO").reverse();
              this.setState({
                 events: data.reverse(),
                 images,
                 videos,
                 currentEventType: filterType
              }, () => {
                this.setCurrentEventList( this.state.currentEventType)
                this.setState({ loading: false })
              })    
              } else {
                this.setState({ 
                  loading: false,
                  fetchError: true })
              } 
          })
        })
      .catch( err => {
        console.log('Fetch Error: ', err);
        this.setState({
          loading: false,
          fetchError: true,
        })
      })
    }
  


  // Set new date and fetch events for new date
  setDate( selectedDate ) {
    this.setState({ 
      date: moment(selectedDate).format('MM/DD/YY'),
     }, 
    () => { 
      console.log('New state of date is: ' + this.state.date)
      this.fetchNewByDate( this.state.date, 'ALL' ) 
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
  toggleLoading(value) {
    { value ? 
      this.setState({ loading: value }) :
      this.setState({ loading: !this.state.loading })
    }
  }

  // Toggle the main navigation menu from footer bar
  toggleMainNav() {
    this.setState({ showMainNav: !this.state.showMainNav });
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
    this.setState({ 
      fetchError: !this.state.fetchError,
      loading: false
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
                          siteURL={ this.state.siteURL }
                          camArray={ camCount }
                          checkForMultipleCams={ this.checkForMultipleCams }
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
                          downloadImageEvent={ this.downloadImageEvent }
                          setTimelapse={ this.setTimelapse }
                          selectedCam={ this.state.selectedCam }
                          handleCamSelect = { this.handleCamSelect }
                          projects={ this.state.projects }
                          eventTypes={ this.state.eventTypes }
                          updateEventType={ this.updateEventType }
                          currentEventType={ this.state.currentEventType }
                          currentEventList={ this.state.currentEventList }
                          getCurrentImage= { this.getCurrentImage }
                          fetchNewByDate={ this.fetchNewByDate }
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
                          toggleFetchError={ this.toggleFetchError }
                          renderEventsList={ this.state.renderEventsList }
                          setRenderEventsComplete={ this.setRenderEventsComplete }
                          mediaDownloadLoading={ this.state.mediaDownloadLoading }
                          mediaDownloadSuccess={ this.state.mediaDownloadSuccess }
                          mediaDownloadFailed={ this.state.mediaDownloadFailed }
                           /> :
              null }

            { !this.state.isLoggedIn  ? 
              <LoginScreen setLogin={ this.setLogin } 
                            setLogout={ this.setLogout }
                            loggedIn={ this.state.isLoggedIn }
                            validateLogin={ this.validateLogin }
                            noInput={ this.state.noInput }
                            error={ this.state.error }
                            checkLogin={ this.checkLogin }
                            loginLoading={ this.state.loginLoading } /> :
              null }    

            { this.state.isLoggedIn && this.state.showTimelapse  
                                    && !this.state.showFullVideo 
                                    && !this.state.showFullImage 
                                    && !this.state.showTimelapseVideo ? 
              <TimelapseScreen  site={ this.state.site }
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
                                timelapseEnd={ this.state.sTimelapseEnd }
                                downloadVideoEvent={ this.downloadVideoEvent } /> :
              null }

            {/* <FullScreenImage /> */}
            { this.state.isLoggedIn && this.state.showFullImage  ? 
              <FullScreenImage  toggleImage={ this.toggleImage }
                                sImage={ this.state.sImage }
                                sImageDate={ this.state.sImageDate }
                                sImageTime={ this.state.sImageTime }
                                siteURL={ this.state.siteURL }
                                downloadImageEvent={ this.downloadImageEvent }
                                mediaDownloadLoading={ this.state.mediaDownloadLoading }
                                mediaDownloadSuccess={ this.state.mediaDownloadSuccess }
                                mediaDownloadFailed={ this.state.mediaDownloadFailed }
                                 /> :
              null }

              {/* <FullScreenVideo /> */}
              { this.state.isLoggedIn && this.state.showFullVideo && !this.state.showTimelapseVideo ? 
              <FullScreenVideo  toggleVideo={ this.toggleVideo }
                                sVideo={ this.state.sVideo }
                                sVideoDate={ this.state.sVideoDate }
                                sVideoTime={ this.state.sVideoTime }
                                sVideoDuration={ this.state.sVideoDuration}
                                siteURL={ this.state.siteURL }
                                downloadVideoEvent={ this.downloadVideoEvent }
                                videoReload={ this.state.videoReload }
                                videoPaused={ this.state.videoPaused }
                                toggleVideoPaused={ this.toggleVideoPaused } 
                                toggleVideoReload={ this.toggleVideoReload }
                                mediaDownloadLoading={ this.state.mediaDownloadLoading }
                                mediaDownloadSuccess={ this.state.mediaDownloadSuccess }
                                mediaDownloadFailed={ this.state.mediaDownloadFailed }
                                 /> : 
              null }

              {/* <FullScreenTimelapse /> */}
              { this.state.isLoggedIn && this.state.showTimelapseVideo ? 
              <FullScreenTimelapse toggleTimelapseVideo={ this.toggleTimelapseVideo }
                                   sTimelapse={ this.state.sTimelapse }
                                   siteTag={ this.state.siteTag }
                                   downloadVideoEvent={ this.downloadVideoEvent }
                                  //  CHANGE THESE VALUES
                                   videoReload={ this.state.videoReload }
                                   videoPaused={ this.state.videoPaused }
                                   toggleVideoPaused={ this.toggleVideoPaused } 
                                   toggleVideoReload={ this.toggleVideoReload } 
                                   mediaDownloadLoading={ this.state.mediaDownloadLoading }
                                   mediaDownloadSuccess={ this.state.mediaDownloadSuccess }
                                   mediaDownloadFailed={ this.state.mediaDownloadFailed }
                                    /> :
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