import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image, Button } from 'react-native';
import TimelapseButton from '../../src/components/TimelapseButton';
import Header from '../../src/components/Header';
import Touchable from '@appandflow/touchable';
import QuickPicker from 'quick-picker';
import PickerTopRow from '../components/PickerTopRow';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const today = moment(new Date()).format('MM/DD/YY');

class TimelapseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: '',
      siteURL: 'https://gte.dividia.net/', //'https://' + this.props.siteTag + '.dividia.net/'
      date: today,
      dayArray: [],
      weekArray: [],
      monthArray: [],
      projectArray: [],
      startDate: new Date,
      endDate: new Date
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.fetchPastWeek = this.fetchPastWeek.bind(this);
    this.fetchPastDay = this.fetchPastDay.bind(this);
    this.fetchPastMonth= this.fetchPastMonth.bind(this);
    this.fetchProject= this.fetchProject.bind(this);
    this._onPressS = this._onPressS.bind(this);
    this._onPressE = this._onPressE.bind(this);
    this.closeDate = this.closeDate.bind(this);
  }

    handleButtonClick(length) {
        switch (length) {
            case 'day':
                console.log('day selected')
                console.log(this.state.dayArray.length)
            break;
            case 'week':
                console.log('week selected')
                console.log(this.state.dayArray.length)
            break;
            case 'month':
                console.log('month selected')
                console.log(this.state.dayArray.length)
            break;
            case 'project':
                console.log('entire project selected')
                console.log(this.state.dayArray.length)
            break;
            default:
                console.log('day selected')
                console.log('switch statement default called')
        }
    }

    componentDidMount() {
        this.fetchPastDay()
        this.fetchPastWeek()
        this.fetchPastMonth()
        this.fetchProject()
    }

    fetchPastDay() {
                  // May need this proxy:
                  // let proxy = 'https://cors-anywhere.herokuapp.com/';
    
        fetch( this.state.siteURL + `ajax.php?action=getEvents&date=` + this.state.date )
        .then( response => {
              if (response.status !== 200) {
                console.log('Error. Status Code: ' + response.status);
                return;
              }
              response.json().then(data => {
                  let images = data.filter(d => d.sType === "STILL");
                  this.setState({
                     dayArray: images,
                    });
              })
          .catch(err => {
            console.log('Fetch Error: ', err);
                });
            })
      }

      fetchPastWeek() {
                  // May need this proxy:
                  // let proxy = 'https://cors-anywhere.herokuapp.com/';
    
        fetch( this.state.siteURL + `ajax.php?action=getEvents&date=` + this.state.date )
        .then( response => {
              if (response.status !== 200) {
                console.log('Error. Status Code: ' + response.status);
                return;
              }
              response.json().then(data => {
                  let images = data.filter(d => d.sType === "STILL");
                  this.setState({
                     weekArray: images,
                    });
              })
          .catch(err => {
            console.log('Fetch Error: ', err);
                });
            })
      }

      fetchPastMonth() {

                  // May need this proxy:
                  // let proxy = 'https://cors-anywhere.herokuapp.com/';
    
        fetch( this.state.siteURL + `ajax.php?action=getEvents&date=` + this.state.date )
        .then( response => {
              if (response.status !== 200) {
                console.log('Error. Status Code: ' + response.status);
                return;
              }
              response.json().then(data => {
                  let images = data.filter(d => d.sType === "STILL");
                  this.setState({
                     monthArray: images,
                    });
              })
          .catch(err => {
            console.log('Fetch Error: ', err);
                });
            })
      }

      fetchProject() {

                  // May need this proxy:
                  // let proxy = 'https://cors-anywhere.herokuapp.com/';
    
        fetch( this.state.siteURL + `ajax.php?action=getEvents` )
        .then( response => {
              if (response.status !== 200) {
                console.log('Error. Status Code: ' + response.status);
                return;
              }
              response.json().then(data => {
                  let images = data.filter(d => d.sType === "STILL");
                  this.setState({
                     projectArray: images,
                    });
              })
          .catch(err => {
            console.log('Fetch Error: ', err);
                });
            })
      }

      closeDate() {
        QuickPicker.close()
    }

    _onPressS = () => {
        const today = new Date;
        console.log( 'date pressed: Start Date'  )
        QuickPicker.open({ 
            pickerType: "date",
            mode: 'date',
            // topRow: <PickerTopRow   pickerTitle={'Select Date'} 
            //                         pickerConfirm={'SELECT'}
            //                         close={ this.closeDate }
            //                         confirmText={'CONFIRM'} />,
            selectedValue: this.state.startDate,
            maximumDate: today,
            onValueChange: (selectedValueFromPicker) => this.setState({ startDate: selectedValueFromPicker })                                                                  
        });
    }

    _onPressE = () => {
        const today = new Date;
        console.log( 'date pressed: End Date'  )
        QuickPicker.open({ 
            pickerType: "date",
            mode: 'date',
            // topRow: <PickerTopRow   pickerTitle={'Select Date'} 
            //                         pickerConfirm={'SELECT'}
            //                         close={ this.closeDate }
            //                         confirmText={'CONFIRM'} />,
            selectedValue: this.state.endDate,
            maximumDate: today,
            onValueChange: (selectedValueFromPicker) => this.setState({ endDate: selectedValueFromPicker })
        });
    }

    render() {

        return (
        <View style={ styles.container }>
            <Header  site={ this.props.site } 
                    dataUsage={ this.props.dataUsage }
                    maxData={ this.props.maxData} />

            <View style={ styles.timelapseContainer }>
                { this.state.startDate > this.state.endDate ? <Text>Start date must be prior to end date.</Text> : null }
            
                <Text style={ styles.timelapseHeading }>Timelapse Video Creator</Text>
                <View style={ styles.dateSelectContainer }>
                    <Text style={ styles.selectionHeading }>Play by Date Range</Text>
                    <View style={ styles.labelContainer }>
                        <Text style={ styles.labelText }>Start Date</Text>
                        <Text style={ styles.labelText }>End Date</Text>
                    </View>
                    <View style={ styles.dateContainer }>
                        <Touchable feedback="opacity" 
                                    native={ false } 
                                    onPress={ this._onPressS } 
                                    style={ styles.dateSelect }>
                            <Icon name="calendar" size={ 28 } color="black" style={ styles.icon } /> 
                            <Text style={ styles.dateText }>{ moment(this.state.startDate.toString()).format('MM/DD/YY') }</Text>
                        </Touchable>


                        <Touchable feedback="opacity" 
                                    native={ false } 
                                    onPress={ this._onPressE } 
                                    style={ styles.dateSelect }>
                            <Icon name="calendar" size={ 28 } color="black" style={ styles.icon } /> 
                            <Text style={ styles.dateText }>{ moment(this.state.endDate.toString()).format('MM/DD/YY') }</Text>
                        </Touchable>
                    </View>
                    <TimelapseButton title={'Create'} call={ () => console.log('submitted') }/>
                </View>
                
                <View style={ styles.buttonContainer }>
                    <Text style={ styles.selectionHeading }>Quick Play Options</Text>
                    <View style={ styles.buttonRow }>
                        <TimelapseButton title={'day'} call={ () => this.handleButtonClick('day') }/>
                        <TimelapseButton title={'past week'} call={ () => this.handleButtonClick('week') }/>
                    </View>
                    <View style={ styles.buttonRow }>
                        <TimelapseButton title={'past month'} call={ () => this.handleButtonClick('month') }/>
                        <TimelapseButton title={'entire project'} call={ () => this.handleButtonClick('project') }/>
                    </View>
                </View>
            </View>
            <Touchable feedback="opacity" 
                                    native={ false } 
                                    onPress={ this.props.toggleTimelapse } 
                                    style={ styles.back }>
                            <Icon name="arrow-left" size={ 28 } color="black" style={ styles.icon } /> 
                            <Text style={ styles.dateText }>Back to app</Text>
                        </Touchable>
        </View>
        )
    }
}

export default TimelapseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'flex-start',
  },
  timelapseContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 40,
  },
  timelapseHeading: {
    fontSize: 28,
    marginBottom: 10,
  },
  selectionHeading: {
    fontSize: 16,
    backgroundColor: 'lightgrey',
    padding: 5,
    borderRadius: 10,
    width: '100%',
    textAlign: 'center',
    marginBottom: 5,
  },
  dateSelectContainer: {
    // backgroundColor: 'blue',
    width: '100%',
    paddingTop: 16,
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateSelect: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 3,
  },
  submitButton: {
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 16,
    // backgroundColor: 'green',
    alignItems: 'center',
    marginTop: -10,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  back: {
    position: 'absolute',
    bottom: 24,
    left: 30,
    flexDirection: 'row',
  },
});