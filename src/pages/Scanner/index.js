import React, { Component } from 'react';
import { StyleSheet, Linking, Dimensions, StatusBar } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  };

  getScreenSize = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    this.setState({ screenWidth, screenHeight });
  };

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  render() {
    const { screenHeight } = this.state;

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
          reactivate
          showMarker
          markerStyle={{}}
          // checkAndroid6Permissions
          // bottomContent={
          //   <TouchableOpacity style={styles.buttonTouchable}>
          //     <Text style={styles.buttonText}>OK. Got it!</Text>
          //   </TouchableOpacity>
          // }
        />
      </>
    );
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
