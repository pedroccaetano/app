import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Moment from 'moment';
import DatePicker from 'react-native-datepicker';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';
import styles from './styles';

const arrow_down = require('~/assets/images/arrow_down.png');

class Products extends Component {
  static navigationOptions = {
    title: 'Pesquisa de Produtos',
    headerTitleStyle: {
      flex: 1,
      // textAlign: 'center',
      // fontWeight: 'bold',
    },
    headerTintColor: colors.primary,
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
    dataInicial: '',
    dataFinal: '',
  };

  componentDidMount() {
    this.setState({
      dataInicial: Moment(),
      dataFinal: Moment(),
    });
  }

  render() {
    const { dataInicial, dataFinal } = this.state;
    return (
      <View style={{ paddingHorizontal: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.label}>Data incial</Text>
            <DatePicker
              style={styles.datePicker}
              date={dataInicial}
              mode="date"
              placeholder={dataInicial}
              format="DD/MM/YYYY"
              minDate="2016/05/01"
              maxDate={dataInicial}
              confirmBtnText="Confirmar"
              cancelBtnText="Selecionar"
              iconComponent={
                <Icon
                  size={22}
                  color={colors.primary}
                  name="keyboard-arrow-down"
                />
              }
              customStyles={{
                dateInput: {
                  alignSelf: 'stretch',
                  // padding: 5,
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  color: colors.primary,
                  borderWidth: 0,
                  paddingRight: 0,
                },
                placeholderText: {
                  color: colors.primary,
                  paddingLeft: 10,
                },
              }}
              onDateChange={dataInicial => {
                this.setState({ dataInicial });
              }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Data incial</Text>
            <DatePicker
              style={styles.datePicker}
              date={dataFinal}
              mode="date"
              placeholder={dataFinal}
              format="DD/MM/YYYY"
              minDate="2016/05/01"
              maxDate={dataFinal}
              confirmBtnText="Confirmar"
              cancelBtnText="Selecionar"
              iconComponent={
                <Icon
                  size={22}
                  color={colors.primary}
                  name="keyboard-arrow-down"
                />
              }
              customStyles={{
                dateInput: {
                  padding: 5,
                  alignItems: 'flex-start',
                  color: colors.primary,
                  borderWidth: 0,
                },
                dateIcon: {
                  right: 10,
                  top: 8,
                  marginRight: 10,
                  paddingRight: 10,
                },
                placeholderText: {
                  color: colors.primary,
                  paddingLeft: 10,
                },
              }}
              onDateChange={dataFinal => {
                this.setState({ dataFinal });
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>Código de barras</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>Nome do estabelecimento</Text>
          <TextInput style={styles.input} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.icon}>
            <Icon name="arrow-forward" size={18} colors={colors.light} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Products;
