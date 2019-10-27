import React, { Component } from 'react';
import createNavigator from './routes';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  componentDidMount = async () => {
    const user = await AsyncStorage.getItem('@Sefaz:user');

    this.setState({
      userChecked: true,
      userLogged: !!user,
    });
  };

  render() {
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);

    return <Routes />;
  }
}
