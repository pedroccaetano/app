import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Toast from 'react-native-easy-toast';
import TextInput from 'react-native-textinput-with-icons';

import api from '~/services/index';
import colors from '~/styles/colors';
import styles from './styles';

class SignIn extends Component {
  static navigationOptions = {
    headerTitle: 'Crie uma conta',
    headerTintColor: colors.primary,
    headerTitleStyle: {
      // fontWeight: 'bold',
    },
    headerStyle: {
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
    },
  };

  state = {
    username: '',
    email: '',
    password: '',
  };

  signIn = async () => {
    const { username, email, password } = this.state;

    await api
      .post('/users', {
        name: username,
        email,
        password,
      })
      .then(response => {
        const { resposta } = response.data;

        this.refs.toast.show(resposta);

        this.setState({
          username: '',
          email: '',
          password: '',
        });
      })
      .catch(error => {
        const { resposta } = error.response.data;

        this.refs.toast.show(resposta);
      });
  };

  render() {
    const { username, email, password } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <TextInput
            value={username}
            onChangeText={text => this.setState({ username: text })}
            autoCorrect={false}
            label="Seu nome"
            returnKeyType="next"
            autoCapitalize="words"
            leftIcon="user"
            leftIconType="awesome"
            labelColor={colors.primary}
            labelActiveColor={colors.primary}
            underlineColor={colors.primary}
            underlineActiveColor={colors.primary}
          />
          <TextInput
            value={email}
            onChangeText={text => this.setState({ email: text })}
            autoCorrect={false}
            label="Seu e-mail"
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
            autoCorrect={false}
            label="Sua senha"
            returnKeyType="next"
            autoCompleteType="password"
            leftIcon="lock"
            secureTextEntry
            leftIconType="awesome"
            labelColor={colors.primary}
            labelActiveColor={colors.primary}
            underlineColor={colors.primary}
            underlineActiveColor={colors.primary}
          />
          <Toast
            ref="toast"
            position="center"
            style={{ backgroundColor: `${colors.primary}` }}
          />
          <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={() => this.signIn()}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.buttonLoding}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignIn;
