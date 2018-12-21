import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { WebBrowser } from 'expo';
import { NavButton, NavCloseButton } from '../components/NavButtons';

const width = '100%';

export default class MainNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: '',
        }
        this.timelapse = this.timelapse.bind(this);
        this.logout = this.logout.bind(this);
        this.openDividiaURL = this.openDividiaURL.bind(this);
     }

    timelapse() {
        this.setState({
            alert: 'Create timelapse clicked!'
        })
    }

    logout() {
        this.setState({
            alert: 'Logout clicked!'
        })
    }

    openDividiaURL() {
        WebBrowser.openBrowserAsync('http://www.dividia.net')
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.alert}>{this.state.alert}</Text>
            </View>
            <View style={styles.nav}>
                <View style={styles.touchContainer} >
                    <NavButton call={this.timelapse} title={'Create Timelapse'} />
                    <NavButton call={this.logout} title={'Logout'} />
                    <Text style={styles.dividiaLink}
                          onPress={this.openDividiaURL}>
                        www.dividia.net
                    </Text>
                </View>
                <NavCloseButton call={this.props.close} title={'X'} />
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     position: 'absolute',
     bottom: 0,
     left: 0,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 1000,
    },
    nav: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderTopWidth: 0.8,
        borderColor: 'lightgrey',
        height: 380,
    },
    alert: {
        color: '#ADF5FF',
        fontSize: 20,
    },
    touchContainer: {
        marginTop: 20,
        alignItems: 'center',
        height: 260,
    },  
    dividiaLink: {
        color: 'white',
        fontSize: 24,
        textDecorationLine: 'underline',
    },
   
  });