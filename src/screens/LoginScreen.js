import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      textInput: ''
    }
  }

  validateInput = () => {
    this.props.validateLogin( this.state.text )
    this.setState({ textInput: '' })
    }

    render() {

        return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={100}>
          <View style={ styles.imageContainer }>
            <Image source={ require('../../assets/images/dividia.png')}
                  style={ styles.dividiaIcon } />
          </View>
          <Image source={ require('../../assets/images/i-site.png')}
                 style={ styles.isiteIcon } />
          <View style={ styles.directiveContainer }>

            <View style={ styles.directive2Container }>
              <Text style={ styles.directive2 }>Enter your site's</Text>
              <Text style={ styles.bold }>Camera URL</Text>
            </View>
          </View>  

          { this.props.error ?
            <Text style={ styles.error }>'{ this.state.text }'' not found. Please try again.</Text> : 
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

            { this.props.loginLoading ? 
                <TouchableHighlight onPress={ () => null } 
                                    style={ styles.submitContainer }>
                  <View style={ styles.innerSubmitContainer }>
                  <Text style={ styles.submitTextLoading }>Checking</Text>
                  <Icon name="user-secret" size={ moderateScale(32) } color="grey" style={ styles.icon } /> 
                  </View>
                </TouchableHighlight> :
                <TouchableHighlight onPress={ this.validateInput } 
                                   style={ styles.submitContainer }>
                  <View style={ styles.innerSubmitContainer }>
                    <Text style={ styles.submitText }>Continue</Text>
                    <Icon name="arrow-right" size={ moderateScale(32) } color="black" style={ styles.icon } /> 
                  </View>
                </TouchableHighlight>
            }
        </KeyboardAvoidingView>
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    height: verticalScale(78),
    width: moderateScale(400),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  dividiaIcon: {
    height: verticalScale(50),
    width: moderateScale(240, 1),
    overflow: 'visible',
  },
  isiteIcon: {
    height: verticalScale(100),
    width: moderateScale(80, 1),
    marginBottom: 10,
    overflow: 'visible',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: moderateScale(18, .2),
    marginBottom: 2,
    marginTop: verticalScale(10)
  },
  error: {
    fontSize: moderateScale(18, .2),
    color: 'red',
    marginTop: -22,
  },
  directiveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  directive1: {
    fontSize: moderateScale(30, .2),
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
    fontSize: moderateScale(16, .2),
    marginRight: 5,
    marginTop: verticalScale(10)
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
    width: moderateScale(160, .4),
    borderWidth: 2,
    padding: moderateScale(8, .2),
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: moderateScale(24, .2),
    textAlign: 'center',
  },
  domain: {
    fontSize: moderateScale(24, .2),
    marginLeft: moderateScale(10),
  },
  submitContainer: {
    width: moderateScale(240),
    height: moderateScale(50),
    marginTop: 40,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  innerSubmitContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
  },
  submitText: {
    fontSize: moderateScale(26, .2),
    marginRight: 10,
  },
  submitTextLoading: {
    fontSize: moderateScale(26, .2),
    marginRight: 10,
    color: 'grey'
  }
});