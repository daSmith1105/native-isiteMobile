import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const MediaHeader = props => {
    return (
        <View style={ styles.fullScreenHeader }>
            <TouchableHighlight onPress={ () => props.onPressBack() } style={ styles.back}>
                <Icon name="arrow-left" size={ moderateScale(20) } color="white" />             
            </TouchableHighlight>

            { !props.video ? 
                <Text style={ styles.timestamp }>{ props.timeStamp }</Text> :
                null
            }
            { props.timelapse ? 
                <Text style={{ color: 'transparent' }}>000000000000000</Text> :
                null
            }

            <TouchableHighlight onPress={ () => props.onPressDownload() } style={ styles.download}>
                <Icon name="arrow-circle-down" size={ moderateScale(40) } color="white" />
            </TouchableHighlight>
        </View>
    )
}

export default MediaHeader;

const styles = {
    fullScreenHeader: {
        zIndex: 20,
        flexDirection: 'row',
        padding: 5,
        width: '70%',
        alignItems: 'center', 
        justifyContent: 'space-around',
        position: 'absolute', 
        top: verticalScale(30), 
        marginLeft: '13%',
        backgroundColor: 'rgba(0,0,0,.4)',
        borderRadius: scale(20)
      },
      timestamp: {
        color: 'white',
        fontSize: moderateScale(12, .3)
      },
      download: {
        borderRadius: 50,
        backgroundColor: 'grey',
        paddingLeft: moderateScale(3),
        paddingRight: moderateScale(3),
      },
      back: {
        borderRadius: 50,
        backgroundColor: 'grey',
        paddingLeft: moderateScale(9),
        paddingRight: moderateScale(11),
        paddingTop: moderateScale(6),
        paddingBottom: moderateScale(10),
        borderWidth: 2,
        borderColor: 'white'
      },
}