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

import Picker from 'react-native-picker';
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
    productName: '',
    organization: '',
    state: '',
    stateText: '',
    loading: false,
    data: [],
    notasAsyncStorage: [],
  };

  componentDidMount = async () => {
    const date = new Date();
    this.setState({
      initDate: `01/${date.getMonth() + 1}/${date.getFullYear()}`,
      finalDate: `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()}`,
    });
  };

  restoreNotesAsyncStorage = async () => {
    await AsyncStorage.getItem('@Sefaz:notasStorage').then(response => {
      this.setState({
        notasAsyncStorage: JSON.parse(response),
      });
    });
  };

  findProducts = async () => {
    this.hidePicker();
    Keyboard.dismiss();
    this.setState({ loading: true });

    let { initDate, finalDate, organization, productName, state } = this.state;

    const token = await AsyncStorage.getItem('@Sefaz:token');

    if (organization === '') {
      organization = '""';
    }

    if (productName === '') {
      this.refs.toast.show('É necessário entrar com nome do produto');
      this.setState({ loading: false });
      return;
    }

    if (state === '') {
      this.refs.toast.show('É necessário selecionar o estado');
      this.setState({ loading: false });
      return;
    }

    initDate = utils.convertDateToString(initDate);
    finalDate = utils.convertDateToString(finalDate);

    await api
      .get(
        `/nota/date/initDate/${initDate}/finalDate/${finalDate}/productName/${productName}/organization/${organization}/state/${state}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async response => {
        await this.restoreNotesAsyncStorage();
        const { nota: notas } = response.data;

        if (notas.length) {
          const { navigation } = this.props;

          notas.map(item => {
            let favoritado = this.hasProductAsyncStorage(item.produto);

            item.produto.favoritado = favoritado;
          });

          navigation.navigate('ListProductsScreen', { notas });
        } else {
          this.refs.toast.show('Não encontramos nenhuma nota');
        }
      })
      .catch(() => {
        this.refs.toast.show('Erro inesperado');
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  hasProductAsyncStorage = produt => {
    const { notasAsyncStorage } = this.state;

    let statusFavorito = false;

    notasAsyncStorage.map(note => {
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

  handleEstado = () => {
    Keyboard.dismiss();

    const estados = ['TO', 'PE', 'RS'];

    const pickerData = [estados];

    const selectedValue = [estados];

    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Fechar',
      pickerTitleText: 'Selecione um estado',
      wheelFlex: [1],
      onPickerConfirm: pickedValue => {
        this.setState({
          state: pickedValue[0],
        });
      },
    });
    Picker.show();
  };

  hidePicker = () => {
    Picker.hide();
  };

  render() {
    const {
      initDate,
      finalDate,
      organization,
      productName,
      loading,
      state,
    } = this.state;
    return (
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 10 }}>
            <Text style={styles.label}>Data inicial</Text>
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
        <View>
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput
            style={[styles.input, { color: colors.black }]}
            onChangeText={productName => this.setState({ productName })}
            value={productName}
            onFocus={() => this.hidePicker()}
          />
        </View>
        <View>
          <Text style={styles.label}>Nome do estabelecimento</Text>
          <TextInput
            style={[styles.input, { color: colors.black }]}
            onChangeText={organization => this.setState({ organization })}
            value={organization}
            onFocus={() => this.hidePicker()}
          />
        </View>

        <View>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={[styles.input, { color: colors.black }]}
            value={state}
            onTouchStart={() => this.handleEstado()}
            showSoftInputOnFocus={false}
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
