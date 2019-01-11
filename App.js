//TODO: implement navigation to handle login and redirect to main screen

import React from 'react';
import { StyleSheet, StatusBar, View, AsyncStorage } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';

class App extends React.Component {
  constructor( props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      site: '', // full site name used in header
      siteTag: '', // short version of site used for URL
      siteList: [ 'birch', 'gte' ],
      error: false,
    }

    this.setLogout = this.setLogout.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.resolveSitename = this.resolveSitename.bind(this);

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


  render() {
      return (

                <View style={ styles.container }>

                  {/* Main app view */}
                  { this.state.isLoggedIn ? 
                  <MainScreen setLogout={ this.setLogout }
                              loggedIn={ this.state.isLoggedIn}
                              site={ this.state.site }
                              siteTag={ this.state.siteTag } /> :

                  <LoginScreen setLogin={ this.setLogin } 
                              setLogout={ this.setLogout }
                              loggedIn={ this.state.isLoggedIn }
                              validateLogin={ this.validateLogin }
                              noInput={ this.state.noInput }
                              error={ this.state.error }
                              checkLogin={ this.checkLogin } />
                  }    
                  {/* Hide the top status bar on ios */}
                  <StatusBar hidden={ true } style={ styles.statusBar }/>
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