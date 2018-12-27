// TODO: Include - Dividia Logo, Isiste Logo, Site Name, Data Usage

import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

const width = '100%';

export default function Header (props) {
  
    return (
      <View style={styles.header}>

        <View style={styles.logosContainer}>
            <Image source={require('../assets/images/dividia.psd')} style={styles.companyLogo} />
            <Image source={require('../assets/images/i-site.png')} style={styles.productLogo} />
        </View>
 
        <View style={styles.statusContainer}>
            <View style={styles.statusData}>
                <Text style={styles.customer}>{props.customer}</Text>
                <Text style={styles.data}>{props.data} / 10GB</Text>
            </View>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        height: 120, 
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width
    },
    logosContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 20,
    },
    companyLogo: {
        width: 220,
        height: 60,
        marginRight: 22,
        flex: 3,
    },
    productLogo: {
        width: 90,
        height: 90,
        flex: 1,
        marginRight: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 14,
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