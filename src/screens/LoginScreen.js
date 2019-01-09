//TODO: implement navigation for timelapse selection passed to the footer element
//      implement quickSearch feature on the right hand side of screen

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      textInput: ''
    }
    this.validateInput = this.validateInput.bind(this);
  }

  validateInput() {
    this.props.validateLogin( this.state.text )
    this.setState({ textInput: '' })
    }

    render() {

        return (
        <View style={ styles.container }>
          <View style={ styles.imageContainer }>
          <Image source={ require('../../assets/images/dividia.png')}
                 style={ styles.dividiaIcon } />
          </View>
          <Image source={ require('../../assets/images/i-site.png')}
                 style={ styles.isiteIcon } />
          <View style={ styles.directiveContainer }>
            <Text style={ styles.directive1 }>Sign in to your viewer</Text>

            <View style={ styles.directive2Container }>
              <Text style={ styles.directive2 }>Enter your site's</Text>
              <Text style={ styles.bold }>Camera URL</Text>
            </View>
          </View>

          { this.props.error ?
            <Text style={ styles.error }>'{ this.state.text }'' not found. Please try again.</Text> : 
            null
          }
          { this.props.noInput ?
            <Text style={ styles.error }>Please enter your site name.</Text> : 
            null
          }

          <View style={ styles.inputContainer }>
            <TextInput style={ styles.loginInput }
                      onChangeText={ text => this.setState({ text: text.toLowerCase().trim(), textInput: text.toLowerCase().trim() }) }
                      value={ this.state.textInput } 
                      placeholder = 'your-site'>
            </TextInput>
            <Text style={ styles.domain}>.divida.net</Text>
          </View>

            <TouchableHighlight onPress={ this.validateInput } 
                                style={ styles.submitContainer }>
              <View style={ styles.innerSubmitContainer }>
                <Text style={ styles.submitText }>Continue</Text>
                <Icon name="arrow-right" size={ 32 } color="black" style={ styles.icon } /> 
                </View>
            </TouchableHighlight>

        </View>
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  imageContainer: {
    height: 78,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  dividiaIcon: {
    height: '80%',
    width: '80%',
    marginBottom: 10,
    marginTop: 10,
  },
  isiteIcon: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginTop: -22,
  },
  directiveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  directive1: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  directive2Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  directive2: {
    fontSize: 16,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 5,
  },
  loginInput: {
    width: 160,
    borderWidth: 2,
    padding: 5,
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: 24,
    textAlign: 'center',
  },
  domain: {
    fontSize: 24,
    marginLeft: 10,
  },
  submitContainer: {
    width: 240,
    marginTop: 40,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  innerSubmitContainer: {
    flexDirection: 'row',
  },
  submitText: {
    fontSize: 26,
    marginRight: 10,
  }
});