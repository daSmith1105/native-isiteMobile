//TODO: implement navigation for timelapse selection passed to the footer element
//      implement quickSearch feature on the right hand side of screen

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainNav from '../navigation/MainNav';
import QuickPicker from 'quick-picker';
import MediaContainer from '../components/MediaContainer';
import QuickTimeSearch from '../components/QuickTimeSearch';


export default class MainScreen extends React.Component {


  render() {
    return (
      <View style={ styles.container }>

{/* ************************************************** */}
      {/* Header component containing logos and customer / data usage information */}
{/* ************************************************** */}
          <Header  site={ this.props.site } 
                    dataUsage={ this.props.dataUsage }
                    maxData={ this.props.maxData} />

{/* ************************************************** */}
      {/* Images, Video thumbnail display and quick search by hour */}
{/* ************************************************** */}
          <View style={ styles.mediaContainer } >
          {/* Testing for cam selected */}
            {/* <Text>{ this.state.selectedCam.toString() }</Text> */}
            <MediaContainer style={ styles.mediaContent } 
                            events={ this.props.events }
                            images={ this.props.images }
                            videos={ this.props.videos }
                            siteURL={ this.props.siteURL }
                            currentEventType={ this.props.currentEventType }
                            currentEventList={ this.props.currentEventList }
                            site={ this.props.site } 
                            siteTag={ this.props.siteTag }
                            date={ this.props.date }
                            loading={ this.props.loading }
                            toggleoading={ this.props.toggleLoading }
                            toggleImage={ this.props.toggleImage } 
                            requestVideo={ this.props.requestVideo }
                            progressBar={ this.props.progressBar }
                            videoLoading={ this.props.videoLoading }
                            videoReady={ this.props.videoReady }
                            playVideo={ this.props.playVideo }
                            downloadImageEvent={ this.props.downloadImageEvent }
                            toggleFetchError={ this.props.toggleFetchError }
                            fetchError={ this.props.fetchError }
                            error={ this.props.error }
                            /> 
                        

            <QuickTimeSearch style={ styles.quickTimeSearch } />
          </View>

{/* ************************************************** */}
      {/* Render MainNav or Footer based on state */}
{/* ************************************************** */}      
          { this.props.showMainNav ? 
            <MainNav 
                     toggleMainNav={ this.props.toggleMainNav }
                     projects={ this.props.projects }
                     camArray= { this.props.camArray }
                     selectedCam={ this.props.selectedCam }
                     handleCamSelect= { this.props.handleCamSelect }
                     getSnapshot={ this.props.getCurrentImage }
                     doLogout={ this.props.setLogout }
                     toggleTimelapse={ this.props.toggleTimelapse } /> : 

            <View>
              <Footer toggleMainNav={ this.props.toggleMainNav }
                      currentEventType={ this.props.currentEventType }
                      eventTypes={ this.props.eventTypes }
                      updateEventType={ this.props.updateEventType }
                      date={ this.props.date }
                      setDate={ this.props.setDate }
                      loading={ this.props.loading }
                      toggleloading={ this.props.toggleLoading }
                      toggleFetchError={ this.toggleFetchError } /> 
            </View> 
          }

{/* ************************************************** */}
      {/* Placeholder for the Picker called in other components */}
{/* ************************************************** */}      
          <QuickPicker />

      </View>
    )
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