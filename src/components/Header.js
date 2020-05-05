import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Header = (props) => {

    const { site, dataUsage, maxData } = props;
  
    return (
      <View style={ styles.header }>

        <View style={ styles.logosContainer }>

            <View style={{ padding: 5, backgroundColor: 'white', width: '68%', height: moderateScale(48), overflow: 'visible' }}> 
                <Image source={ require('../../assets/images/dividia.png') } style={ styles.companyLogo } />
            </View>

            <View style={{ padding: 5, backgroundColor: 'white', width: '18%', height: moderateScale(60) }}> 
                <Image source={ require('../../assets/images/i-site.png') } style={ styles.productLogo } />
            </View>

        </View>
 
        <View style={ styles.statusContainer }>
            <View style={ styles.statusData }>
                <Text style={ styles.customer }>{ site}</Text>
                <Text style={ styles.data }>{ dataUsage }GB/{ maxData }GB</Text>
            </View>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        top: 0, 
        left: 0, 
        justifyContent: 'center',
        alignItems: 'center',
        height: verticalScale(70),
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
    },
    logosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        padding: 10,
        marginTop: 20
    },
    companyLogo: {
        width: '100%%',
        height: '100%',
        overflow: 'visible'
    },
    productLogo: {
        width: '100%',
        height: '100%',
        overflow: 'visible'
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        top: verticalScale(80),
        left: scale(16),
    },
    statusData: {
        flex: 1,
        flexDirection: 'row',   
    },
    customer: {
        marginRight: moderateScale(10),
        fontSize: moderateScale(14),
    },
    data: {
        fontSize: moderateScale(14),
    },
});

  export default Header;