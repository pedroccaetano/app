import React, { Component } from 'react';

import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { ScrollView } from 'react-native-gesture-handler';
import colors from '~/styles/colors';
import styles from './styles';

class NotaFiscal extends Component {
  static navigationOptions = {
    headerTitle: 'Nota Fiscal',
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.textNota}>CNPJ: 23.300.876/1234-12</Text>
          <Text style={styles.textNota}>SUPERMECADO BOMBOM</Text>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.lineFont} numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - -
          </Text>
          <Text style={styles.textNota}>
            Documento Auxiliar da Nota Fiscal de Consumidor Eletrônica
          </Text>
          <Text style={styles.lineFont} numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - -
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default NotaFiscal;
