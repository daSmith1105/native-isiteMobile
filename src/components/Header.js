// Contains: Company and Product Logos, Customer/Site name, Data usage information

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const width = '100%';

const Header = (props) => {

    const { site, dataUsage, maxData } = props;
  
    return (
      <View style={ styles.header }>

        <View style={ styles.logosContainer }>
            <Image source={ require('../../assets/images/dividia.psd') } style={ styles.companyLogo } />
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
        paddingTop: 25,
    },
    companyLogo: {
        width: 200,
        height: 50,
        marginRight: 22,
        flex: 2,
    },
    productLogo: {
        width: 70,
        height: 70,
        flex: .5,
        marginRight: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 12,
        marginTop: -20,
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