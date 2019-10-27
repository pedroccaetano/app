import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Toast from 'react-native-easy-toast';
import TextInput from 'react-native-textinput-with-icons';

import { withNavigation } from 'react-navigation';

import api from '~/services';
import colors from '~/styles/colors';
import styles from './styles';

const logo = require('~/assets/images/logo.png');

class Login extends Component {
  state = {
    user: {},
    email: '1',
    password: '1',
    errorText: '',
    loading: false,
    errorLogin: false,
  };

  sigIn = async () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    await api
      .post(`/sessions`, {
        email,
        password,
      })
      .then(response => {
        const { token, user } = response.data;

        this.saveUser(token, user);

        navigation.navigate('App');
      })
      .catch(err => {
        const { resposta } = err.response.data;

        this.refs.toast.show(resposta);

        this.setState({ errorText: resposta, errorLogin: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  saveUser = async (token, user) => {
    await AsyncStorage.multiSet([
      ['@Sefaz:token', token],
      ['@Sefaz:user', JSON.stringify(user)],
      ['@Sefaz:notasStorage', JSON.stringify([])],
    ]);
  };

  render() {
    const { email, password, loading } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              value={email}
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              label="E-mail"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="words"
              leftIcon="envelope"
              leftIconType="awesome"
              labelColor={colors.primary}
              labelActiveColor={colors.primary}
              underlineColor={colors.primary}
              underlineActiveColor={colors.primary}
            />

            <TextInput
              value={password}
              onChangeText={text => this.setState({ password: text })}
              label="Password"
              returnKeyType="go"
              leftIcon="lock"
              leftIconType="awesome"
              labelColor={colors.primary}
              labelActiveColor={colors.primary}
              underlineColor={colors.primary}
              underlineActiveColor={colors.primary}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.buttonCadastrar}
              onPress={this.sigIn}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonCadastrar, styles.buttonEntrar]}
              onPress={() => navigate('SignIn')}
            >
              <Text style={[styles.buttonText, { color: colors.tintColor }]}>
                Cadastrar
              </Text>
            </TouchableOpacity>
          </View>

          <Toast
            ref="toast"
            position="bottom"
            style={{ backgroundColor: `${colors.primary}` }}
            fadeOutDuration={1000}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Login;
