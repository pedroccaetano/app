import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast';
import colors from '~/styles/colors';
import styles from './styles';
import api from '~/services/index';
import utils from '~/utils';

class Products extends Component {
  static navigationOptions = {
    title: 'Pesquisa de Produtos',
    headerTitleStyle: {
      flex: 1,
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
    initDate: '',
    finalDate: '',
    barcode: '',
    productName: '',
    organization: '',
    state: '',
    loading: false,
    data: [],
    notasLocalStorage: [],
  };

  componentDidMount = async () => {
    const date = new Date();
    this.setState({
      initDate: `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()}`,
      finalDate: `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()}`,
    });
  };

  restoreNotesLocalStorage = async () => {
    await AsyncStorage.getItem('@Sefaz:notasStorage').then(response => {
      this.setState({
        notasLocalStorage: JSON.parse(response),
      });
    });
  };

  findProducts = async () => {
    this.setState({ loading: true });

    let {
      initDate,
      finalDate,
      barcode,
      organization,
      productName,
      state,
    } = this.state;

    const token = await AsyncStorage.getItem('@Sefaz:token');
    const user = await AsyncStorage.getItem('@Sefaz:user');
    const { email } = JSON.parse(user);

    if (organization === '') {
      organization = '""';
    }

    if (barcode === '') {
      barcode = '""';
    }

    if (productName === '') {
      productName = '""';
    }

    if (state === '') {
      state = '""';
    }

    initDate = utils.convertDateToString(initDate);
    finalDate = utils.convertDateToString(finalDate);

    await this.restoreNotesLocalStorage();

    await api
      .get(
        `/nota/date/initDate/${initDate}/finalDate/${finalDate}/productName/${productName}/barcode/${barcode}/organization/${organization}/state/${state}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            email,
          },
        }
      )
      .then(response => {
        const { nota: notas } = response.data;

        if (notas.length) {
          const { navigation } = this.props;

          notas.map(item => {
            let favoritado = this.hasProductLocalStorage(item.produto);

            item.produto.favoritado = favoritado;
          });

          navigation.navigate('ListProductsScreen', { notas });
        } else {
          this.refs.toast.show('Não encontramos nenhuma nota');
        }
      })
      .catch(error => {
        this.refs.toast.show('Erro inesperado');
      })
      .finally(() => {
        this.setState({ loading: false });
        Keyboard.dismiss();
      });
  };

  hasProductLocalStorage = produt => {
    const { notasLocalStorage } = this.state;

    let statusFavorito = false;

    notasLocalStorage.map(note => {
      if (note.produto.codigo == produt.codigo) {
        statusFavorito = true;
      }
    });

    return statusFavorito;
  };

  changeFinalDate = finalDate => {
    let finalDateArray = finalDate.split('/');

    this.setState({
      finalDate: new Date(
        finalDateArray[0],
        finalDateArray[1],
        finalDateArray[2]
      ),
    });
  };

  changeInitDate = initDate => {
    let initDateArray = initDate.split('/');

    this.setState({
      initDate: new Date(initDateArray[0], initDateArray[1], initDateArray[2]),
    });
  };

  render() {
    const {
      initDate,
      finalDate,
      barcode,
      organization,
      productName,
      loading,
      state,
    } = this.state;
    return (
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 10 }}>
            <Text style={styles.label}>Data incial</Text>
            <DatePicker
              style={styles.datePicker}
              date={initDate}
              mode="date"
              format="DD/MM/YYYY"
              confirmBtnText="Confirmar"
              cancelBtnText="Selecionar"
              onDateChange={initDate => {
                this.setState({ initDate });
              }}
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
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  color: colors.primary,
                  borderWidth: 0,
                  paddingRight: 0,
                },
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Data final</Text>
            <DatePicker
              style={styles.datePicker}
              date={finalDate}
              mode="date"
              format="DD/MM/YYYY"
              confirmBtnText="Confirmar"
              cancelBtnText="Selecionar"
              onDateChange={finalDate => {
                this.setState({ finalDate });
              }}
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
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  color: colors.primary,
                  borderWidth: 0,
                  paddingRight: 0,
                },
              }}
            />
          </View>
        </View>
        {/* <View>
          <Text style={styles.label}>Código de barras</Text>
          <TextInput
            style={styles.input}
            onChangeText={barcode => this.setState({ barcode })}
            value={barcode}
          />
        </View> */}
        <View>
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput
            style={[styles.input, { color: colors.black }]}
            onChangeText={productName => this.setState({ productName })}
            value={productName}
          />
        </View>
        <View>
          <Text style={styles.label}>Nome do estabelecimento</Text>
          <TextInput
            style={[styles.input, { color: colors.black }]}
            onChangeText={organization => this.setState({ organization })}
            value={organization}
          />
        </View>

        <View>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={[styles.input, { color: colors.black }]}
            onChangeText={state => this.setState({ state })}
            value={state}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.findProducts()}
        >
          {!loading ? (
            <Text style={styles.icon}>
              <Icon name="arrow-forward" size={18} colors={colors.light} />
            </Text>
          ) : (
            <ActivityIndicator size={'small'} color={colors.white} />
          )}
        </TouchableOpacity>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={200}
          style={{ backgroundColor: `${colors.primary}` }}
          fadeOutDuration={1000}
        />
      </View>
    );
  }
}

export default Products;
