// Contains: Company and Product Logos, Customer/Site name, Data usage information

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const width = '100%';

const Header = (props) => {

    const { site, dataUsage, maxData } = props;
  
    return (
      <View style={ styles.header }>

        <View style={ styles.logosContainer }>
            <View style={ styles.imageContainer }>
                <Image source={ require('../../assets/images/dividia.png') } style={ styles.companyLogo } />
            </View>
            <Image source={ require('../../assets/images/i-site.png') } style={ styles.productLogo } />
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
        justifyContent: 'center',
        alignItems: 'space-between',
        height: verticalScale(110), 
        backgroundColor: 'white',
        width: scale(350),
        paddingRight: scale(10),
        paddingLeft: scale(10),
        paddingTop: verticalScale(20)
    },
    logosContainer: {
        flex: 1,
        flexDirection: 'row',
        width: scale(330),
        height: verticalScale(65),
        justifyContent: 'space-between'
    },
    imageContainer: {
        alignItems: 'space-around',
        justifyContent: 'center',
        height: verticalScale(65),
        width: moderateScale(200),
    },
    companyLogo: {
        width: moderateScale(140),
        height: verticalScale(50),
        zIndex: 1,
        overflow: 'visible',
    },
    productLogo: {
        width: moderateScale(65),
        height: verticalScale(60),
        overflow: 'visible',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        top: verticalScale(86),
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