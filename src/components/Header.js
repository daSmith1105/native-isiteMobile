// Contains: Company and Product Logos, Customer/Site name, Data usage information

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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
        flexDirection: 'column',
        height: 100, 
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width: width,
    },
    logosContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingRight: 10,
        paddingLeft: 10,
        width: '100%',
    },
    imageContainer: {
        flex: 2,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 60,
        width: '75%',
    },
    companyLogo: {
        width: '90%',
        height: '73%',
        zIndex: 1,
        overflow: 'visible',
    },
    productLogo: {
        width: 75,
        height: 70,
        flex: .5,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 12,
        marginTop: -14,
        width: '75%'
    },
    statusData: {
        flex: 1,
        flexDirection: 'row',
    },
    customer: {
        marginRight: 10,
    },
    data: {
    },
});

  export default Header;