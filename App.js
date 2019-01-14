//TODO: implement navigation to handle login and redirect to main screen

import React from 'react';
import { StyleSheet, StatusBar, View, AsyncStorage } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import TimelapseScreen from './src/screens/TimelapseScreen';
import FullScreenVideo from './src/screens/FullScreenVideo';
import FullScreenImage from './src/screens/FullScreenImage';
import QuickPicker from 'quick-picker';

class App extends React.Component {
  constructor( props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      site: '', // full site name used in header
      siteTag: '', // short version of site used for URL
      siteList: [ 'birch', 'gte' ],
      error: false,
      showTimelapse: false,
      dataUsage: '',
      maxData: ''
    }

    this.setLogout = this.setLogout.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.resolveSitename = this.resolveSitename.bind(this);
    this.toggleTimelapse = this.toggleTimelapse.bind(this);
    this.setMaxData = this.setMaxData.bind(this);
    this.setDataUsage = this.setDataUsage.bind(this);
  }

  validateLogin(userInput) {
    let siteList = this.state.siteList;

    if ( siteList.includes( userInput ) ) {
      this.resolveSitename( userInput );
      this.setState({ 
        isLoggedIn: true,
        siteTag: userInput
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

  resolveSitename( site ) {
    if ( site == 'gte' ) {
        this.setState({ site: 'GoldenTriangle Estates' })
    } else if ( site == 'birch' ) {
        this.setState({ site: 'Birch Racquet Club' })
    } else {
      console.log('site not found')
    }
  }

  clearError() {
    this.setState({ 
      error: false
    })
  }

  setLogout() {
    this.setState({ isLoggedIn: false,
                    site: '', // full site name used in header 
                    siteTag: '', // short version of site used for URL,
                    siteList: [ 'birch', 'gte' ],
                    noInput: false,
                    error: false
                  })
  }

  toggleTimelapse() {
    this.setState({ showTimelapse: !this.state.showTimelapse })
  }

  setDataUsage(value){
    this.setState({ dataUsage:  value })
  }

  setMaxData(value){
    this.setState({ maxData:  value })
  }

  render() {
      return (

                <View style={ styles.container }>

                  {/* Main app view */}
                  {/* { this.state.isLoggedIn && !this.state.showTimelapse ? 
                    <MainScreen setLogout={ this.setLogout }
                                loggedIn={ this.state.isLoggedIn}
                                site={ this.state.site }
                                siteTag={ this.state.siteTag }
                                toggleTimelapse={ this.toggleTimelapse }
                                timelapse={ this .state.showTimelapse }
                                setDataUsage={ this.setDataUsage }
                                setMaxData={ this.setMaxData } /> :
                    null }

                  {!this.state.isLoggedIn  ? 
                    <LoginScreen setLogin={ this.setLogin } 
                                setLogout={ this.setLogout }
                                loggedIn={ this.state.isLoggedIn }
                                validateLogin={ this.validateLogin }
                                noInput={ this.state.noInput }
                                error={ this.state.error }
                                checkLogin={ this.checkLogin } /> :
                    null }    

                  { this.state.isLoggedIn && this.state.showTimelapse ? 
                    <TimelapseScreen site={ this.state.site }
                                    siteTag={ this.state.siteTag }
                                    toggleTimelapse={ this.toggleTimelapse }
                                    timelapse={ this.state.timelapse }
                                    dataUsage={ this.state.dataUsage }
                                    maxData={ this.state.maxData } /> :
                    null } */}

                  {/* <FullScreenVideo /> */}
                  <FullScreenImage />
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