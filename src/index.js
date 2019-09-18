import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import createNavigator from './routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const user = await AsyncStorage.getItem('@Sefaz:user');

    this.setState({
      userChecked: true,
      userLogged: !!user,
    });
  }

  render() {
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigator();

    return <Routes userLogged={userLogged} />;
  }
}
