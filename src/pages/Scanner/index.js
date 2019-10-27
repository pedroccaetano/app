import React, { Component } from 'react';
import {
  StyleSheet,
  Linking,
  Dimensions,
  StatusBar,
  View,
  Text,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/index';
import Toast from 'react-native-easy-toast';

import colors from '~/styles/colors';
const TabIcon = ({ tintColor }) => (
  <Icon name="qrcode-scan" size={22} color={tintColor} />
);

class Scanner extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
    // tabBarVisible: false,
    // header: ({ goBack }) => ({
    //   left: (
    //     <Icon
    //       name="chevron-left"
    //       onPress={() => {
    //         goBack();
    //       }}
    //     />
    //   ),
    // }),
  };

  state = {
    screenWidth: '',
    screenHeight: '',
    url: '',
    focusedScreen: false,
    reactivateCamera: true,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  }

  getScreenSize = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    this.setState({ screenWidth, screenHeight });
  };

  onSuccess = e => {
    let { reactivateCamera } = this.state;

    this.setState(
      {
        reactivateCamera: false,
      },
      () => {
        Alert.alert(
          'Alert Title',
          'Deseja salvar a nota',
          [
            {
              text: 'Ask me later',
              onPress: () => console.log('Ask me later pressed'),
            },
            {
              text: 'Cancel',
              onPress: () => this.cancelNota(),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => this.saveNota(e.data) },
          ],
          { cancelable: false }
        );
      }
    );
  };

  cancelNota = () => {
    this.setState({
      reactivateCamera: true,
    });
  };

  saveNota = async url => {
    const token = await AsyncStorage.getItem('@Sefaz:token');
    const user = await AsyncStorage.getItem('@Sefaz:user');

    const { email } = JSON.parse(user);

    await api
      .post(
        `/nota/store`,
        { url, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(response => {
        console.log(response);
        // const { nota: notas } = response.data;
        // if (notas.length) {
        //   const { navigation } = this.props;
        //   navigation.navigate('ListProduct', { notas });
        // }
        // this.refs.toast.show('Não encontramos nenhuma nota');
      })
      .catch(error => {
        this.refs.toast.show('Erro inesperado');
      })
      .finally(() => {});
  };

  cameraView = () => {
    const { reactivateCamera } = this.state;

    return (
      <>
        <StatusBar translucent hidden showHideTransition />
        <QRCodeScanner
          onRead={this.onSuccess}
          // topContent={
          //   <Text style={styles.centerText}>
          //     Go to{' '}
          //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
          //     your computer and scan the QR code.
          //   </Text>
          // }
          fadeIn={false}
          cameraStyle={{ height: 800 }}
          showMarker
          markerStyle={{}}
          reactivate
          checkAndroid6Permissions={true}
          cameraType="back"
          // permissionDialogTitle="mudar title"
          // permissionDialogMessage="mudar corpo"
          // bottomContent={
          //   <TouchableOpacity style={styles.buttonTouchable}>
          //     <Text style={styles.buttonText}>OK. Got it!</Text>
          //   </TouchableOpacity>
          // }
        />

        <Toast
          ref="toast"
          position="bottom"
          positionValue={200}
          style={{ backgroundColor: `${colors.primary}` }}
          fadeOutDuration={1000}
        />
      </>
    );
  };

  render() {
    const { hasCameraPermission, focusedScreen } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (focusedScreen) {
      return this.cameraView();
    } else {
      return <View />;
    }
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  containerStyle: {
    height: 900,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scanner;
