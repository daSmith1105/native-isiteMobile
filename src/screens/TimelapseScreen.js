import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimelapseButton from '../../src/components/TimelapseButton';
import Header from '../../src/components/Header';
import Touchable from '@appandflow/touchable';
import QuickPicker from 'quick-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class TimelapseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }

    this.requestWeek = this.requestWeek.bind(this);
    this.requestDay = this.requestDay.bind(this);
    this.requestMonth= this.requestMonth.bind(this);
    this.requestProject= this.requestProject.bind(this);
    this.requestByDateRange = this.requestByDateRange.bind(this);
    this._onPressS = this._onPressS.bind(this);
    this._onPressE = this._onPressE.bind(this);
    this.closeDate = this.closeDate.bind(this);

  }

    
    requestDay() {
        const today = moment().format('YYYY/MM/DD');
        this.props.setTimelapse( this.props.siteURL + 'timelapse.php?start=' + today + '&end=' + today )
        this.props.toggleTimelapseVideo()
    }

    requestWeek() {
        const today = moment().format('YYYY/MM/DD');
        const lastWeek = moment().subtract(7,'d').format('YYYY/MM/DD');
        this.props.setTimelapse( this.props.siteURL + 'timelapse.php?start=' + lastWeek + '&end=' + today )
        this.props.toggleTimelapseVideo()
    }

    requestMonth() {
        const today = moment().format('YYYY/MM/DD');
        const lastMonth = moment().subtract(30,'d').format('YYYY/MM/DD');
        this.props.setTimelapse( this.props.siteURL + 'timelapse.php?start=' + lastMonth + '&end=' + today )
        this.props.toggleTimelapseVideo()
    }

    requestProject() {
        const today = moment().format('YYYY/MM/DD');
        const fiveYears = moment().subtract(1800,'d').format('YYYY/MM/DD');
        this.props.setTimelapse( this.props.siteURL + 'timelapse.php?start=' + fiveYears + '&end=' + today )
        this.props.toggleTimelapseVideo()          
    }

    requestByDateRange() {
        let start = this.props.timelapseStart.toString().slice(2, -1);
        let end = this.props.timelapseEnd.toString().slice(2, -1);
        let s = moment(start).format('YYYY/MM/DD');
        let e = moment(end).format('YYYY/MM/DD');
        this.props.setTimelapse( this.props.siteURL + 'timelapse.php?start=' + s + '&end=' + e )
        this.props.toggleTimelapseVideo()   
    }

      closeDate() {
        QuickPicker.close()
    }

    _onPressS = () => {
        const today = new Date;
        QuickPicker.open({ 
            pickerType: "date",
            mode: 'date',
            selectedValue: this.props.timelapseStart,
            maximumDate: today,
            onValueChange: (selectedValueFromPicker) => this.props.setTimelapseStart( selectedValueFromPicker )                                                                  
        });
    }

    _onPressE = () => {
        const today = new Date;
        QuickPicker.open({ 
            pickerType: "date",
            mode: 'date',
            selectedValue: this.props.timelapseEnd,
            maximumDate: today,
            onValueChange: (selectedValueFromPicker) => this.props.setTimelapseEnd( selectedValueFromPicker )
        });
    }

    render() {

        return (
        <View style={ styles.container }>
            <Header  site={ this.props.site } 
                     dataUsage={ this.props.dataUsage }
                     maxData={ this.props.maxData} />

            <View style={ styles.timelapseContainer }>
                { this.props.timelapseStart > this.props.timelapseEnd ? <Text>Start date must be prior to end date.</Text> : null }
            
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
                            <Text style={ styles.dateText }>{ moment(this.props.timelapseStart.toString()).format('MM/DD/YY') }</Text>
                        </Touchable>


                        <Touchable feedback="opacity" 
                                    native={ false } 
                                    onPress={ this._onPressE } 
                                    style={ styles.dateSelect }>
                            <Icon name="calendar" size={ 28 } color="black" style={ styles.icon } /> 
                            <Text style={ styles.dateText }>{ moment(this.props.timelapseEnd.toString()).format('MM/DD/YY') }</Text>
                        </Touchable>
                    </View>
                    <TimelapseButton title={'Play'} call={ this.requestByDateRange }/>
                </View>

        {/* Preset options */}
                
                <View style={ styles.buttonContainer }>
                    <Text style={ styles.selectionHeading }>Quick Play Options</Text>
                    <View style={ styles.buttonRow }>
                        <TimelapseButton title={'day'} call={ this.requestDay }/>
                        <TimelapseButton title={'past week'} call={ this.requestWeek }/>
                    </View>
                    <View style={ styles.buttonRow }>
                        <TimelapseButton title={'past month'} call={ this.requestMonth }/>
                        <TimelapseButton title={'entire project'} call={ this.requestProject }/>
                    </View>
                </View>
            </View>
            <Touchable feedback="opacity" 
                                    native={ false } 
                                    onPress={ this.props.toggleTimelapse } 
                                    style={ styles.back }>
                            <Icon name="arrow-left" size={ moderateScale(28) } color="black" style={ styles.icon } /> 
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
    paddingBottom: verticalScale(40),
  },
  timelapseHeading: {
    fontSize: moderateScale(28, .2),
    marginBottom: verticalScale(10),
  },
  selectionHeading: {
    fontSize: moderateScale(16, .2),
    backgroundColor: 'lightgrey',
    padding: scale(5),
    borderRadius: 10,
    width: '100%',
    textAlign: 'center',
    marginBottom: scale(5),
  },
  dateSelectContainer: {
    // backgroundColor: 'blue',
    width: '100%',
    paddingTop: verticalScale(16),
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  labelText: {
    fontSize: moderateScale(20, .2),
    marginLeft: scale(20),
    marginRight: scale(20),
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateSelect: {
    flexDirection: 'row',
    marginRight: scale(10),
    marginLeft: scale(10),
    marginBottom: verticalScale(15),
  },
  dateText: {
    fontSize: moderateScale(20, .2),
    marginLeft: scale(10),
    marginTop: verticalScale(3),
  },
  submitButton: {
  },
  buttonContainer: {
    width: '100%',
    paddingTop: verticalScale(16),
    alignItems: 'center',
    marginTop: verticalScale(-10),
  },
  buttonRow: {
    flexDirection: 'row',
  },
  back: {
    position: 'absolute',
    bottom: scale(24),
    left: moderateScale(30),
    flexDirection: 'row',
  },
});