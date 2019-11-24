import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';

import { PERNAMBUCO, RIO_GRANDE_DO_SUL, TOCANTINS } from '~/utils/sefaz';
import api from '~/services/index';

import colors from '~/styles/colors';
const TabIcon = ({ tintColor }) => (
  <Icon name="qrcode-scan" size={22} color={tintColor} />
);

class Scanner extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    screenWidth: '',
    screenHeight: '',
    url: '',
    scanner: {},
    focusedScreen: false,
    reactivateCamera: false,
    loading: false,
    marker: true,
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

  readQrCode = scannerData => {
    const { data: url } = scannerData;

    const urlDecisao = url.substr(0, 27);

    this.setState({
      marker: false,
    });

    if (
      urlDecisao === PERNAMBUCO ||
      urlDecisao === RIO_GRANDE_DO_SUL ||
      urlDecisao === TOCANTINS
    ) {
      Alert.alert(
        'Deseja salvar a nota?',
        '',
        [
          {
            text: 'Cancelar',
            onPress: () => {
              this.scanner.reactivate();
              this.setState({
                marker: true,
              });
            },
            style: 'cancel',
          },
          { text: 'Salvar', onPress: () => this.saveNota(url) },
        ],
        { cancelable: false }
      );
    } else {
      this.alertError();
    }
  };

  alertError = () => {
    Alert.alert(
      'Erro!',
      'Não foi possivel identificar a nota.',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            this.scanner.reactivate();
            this.setState({
              marker: true,
            });
          },
          style: 'cancel',
        },
      ],
      { cancelable: false }
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

    this.setState(
      {
        loading: true,
        marker: false,
      },
      async () => {
        await api
          .post(
            `/nota/store`,
            { url, email },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(response => {
            const { nota, mensagem } = response.data;

            if (mensagem) {
              this.refs.toast.show(mensagem);

              // const { navigation } = this.props;
              // navigation.navigate('ListProduct', { notas });
            }
            // this.refs.toast.show('Não encontramos nenhuma nota');
          })
          .catch(error => {
            this.refs.toast.show('Erro inesperado');
          })
          .finally(() => {
            this.setState({
              loading: false,
              marker: true,
            });
          });
      }
    );
  };

  cameraView = () => {
    const { marker, loading } = this.state;

    return (
      <>
        <QRCodeScanner
          ref={node => {
            this.scanner = node;
          }}
          onRead={this.readQrCode}
          fadeIn={false}
          cameraStyle={{ height: 800 }}
          showMarker={marker}
          markerStyle={{}}
          checkAndroid6Permissions={true}
          cameraType="back"
        />

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : null}

        <Toast
          ref="toast"
          position="bottom"
          positionValue={200}
          style={{ backgroundColor: colors.primary }}
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

export default Scanner;
