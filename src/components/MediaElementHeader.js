
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';


export default function MediaElementHeader (props) {

    const { date, time } = props;

    return (
        <View style={ styles.mediaHeader }>
            
            <View style={ styles.dateTime }>
                <Text style={ styles.date }>{ date }</Text>
                <Text style={ styles.time }>{ time }</Text>
            </View>

            { props.type === 'VIDEO' ?
                  <Icon name="film" size={ 20 } color="white" style={{ position: 'absolute', top: 4, right: 15 }}/> :
                  null
            }

            { props.type === 'STILL' ?
              <Icon name="image" size={ 20 } color="white" style={{ position: 'absolute', top: 4, right: 15 }}/> :
              null
            }

          {/* vehicle tag but not person tag */}
            { props.tags.indexOf('vehicle') > -1 ?
               <Icon5 name="truck-pickup" size={ 20 } color="white" style={{ position: 'absolute', top: 4, right: 45 }}/> :
              null
            }
          {/* person tag but not vehicle tag */}
            { props.tags.indexOf('person') > -1 && props.tags.indexOf('vehicle') < 0?
               <Icon5 name="walking" size={ 20 } color="white" style={{ position: 'absolute', top: 4, right: 45 }}/> :
              null
            }
          {/* vehicle tag and person tag */}
            { props.tags.indexOf('vehicle') > -1 && props.tags.indexOf('person') > -1 ?
               <Icon5 name="walking" size={ 20 } color="white" style={{ position: 'absolute', top: 4, right: 80 }}/> :
              null
            }

        </View>
    );
  }


const styles = StyleSheet.create({
  mediaHeader: {
    height: moderateScale(30, .4),
    backgroundColor: 'rgba(0,0,0,.6)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: scale(10),
    position: 'absolute',
    top: -30,
    left: 0,
    width: '100%',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: moderateScale(16, .25),
    fontWeight: 'bold',
    color: 'white',
    marginRight: moderateScale(10),
  },
  time: {
    fontSize: moderateScale(16, .25),
    fontWeight: 'bold',
    color: 'white',
  }
});