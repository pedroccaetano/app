import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Picker from 'react-native-picker';

import colors from '~/styles/colors';
import styles from './styles';

class ListProducts extends Component {
  static navigationOptions = {
    title: 'Produtos',
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
    notas: [],
    ordernar: false,
    notasAsyncStorage: [],
    ordecanao: 'Mais Recente',
  };

  componentDidMount = async () => {
    this.setState(
      {
        notas: this.props.navigation.state.params.notas,
      },
      async () => {
        this.maisRecente();
        await this.restoreNotesAsyncStorage();
      }
    );
  };

  restoreNotesAsyncStorage = async () => {
    await AsyncStorage.getItem('@Sefaz:notasStorage').then(response => {
      this.setState({
        notasAsyncStorage: JSON.parse(response),
      });
    });
  };

  defineNotesAsyncStorage = async () => {
    const { notasAsyncStorage } = this.state;

    await AsyncStorage.setItem(
      '@Sefaz:notasStorage',
      JSON.stringify(notasAsyncStorage)
    );
  };

  maiorPreco = () => {
    const { notas } = this.state;

    this.setState({ notas: [] }, () => {
      this.setState({
        ordecanao: 'Maior Preço',
        notas: notas
          .sort((a, b) => {
            return (
              parseFloat(a.produto.preco_unitario) -
              parseFloat(b.produto.preco_unitario)
            );
          })
          .reverse(),
      });
    });
  };

  menorPreco = () => {
    const { notas } = this.state;

    this.setState({ notas: [] }, () => {
      this.setState({
        ordecanao: 'Menor Preço',
        notas: notas.sort((a, b) => {
          return (
            parseFloat(a.produto.preco_unitario) -
            parseFloat(b.produto.preco_unitario)
          );
        }),
      });
    });
  };

  maisRecente = () => {
    const { notas } = this.state;

    this.setState({ notas: [] }, () => {
      this.setState({
        ordecanao: 'Mais Recente',
        notas: notas.sort((a, b) => {
          return new Date(a.nfce.data_emissao) - new Date(b.nfce.data_emissao);
        }),
      });
    });
  };

  handleOrdenacao = () => {
    Keyboard.dismiss();

    const ordecanao = ['Mais Recente', 'Menor Preço', 'Maior Preço'];
    const pickerData = [ordecanao];
    const selectedValue = [ordecanao];

    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Fechar',
      pickerTitleText: 'Ordenar por',
      wheelFlex: [1],
      onPickerConfirm: pickedValue => {
        if (pickedValue[0] === 'Mais Recente') {
          this.maisRecente();
        }

        if (pickedValue[0] === 'Menor Preço') {
          this.menorPreco();
        }

        if (pickedValue[0] === 'Maior Preço') {
          this.maiorPreco();
        }
      },
    });
    Picker.show();
  };

  hidePicker = () => {
    Picker.hide();
  };

  ordernarNotas = () => {
    const { ordernar, notas } = this.state;

    this.setState({ ordernar: !ordernar, notas: [] }, () => {
      if (ordernar) {
        this.setState({
          notas: notas.sort((a, b) => {
            return (
              parseFloat(a.produto.preco_unitario) -
              parseFloat(b.produto.preco_unitario)
            );
          }),
        });
      } else {
        this.setState({
          notas: notas.reverse(),
        });
      }
    });
  };

  renderProductList = () => {
    const { notas } = this.state;

    if (notas.length) {
      return (
        <FlatList
          data={notas}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => this.renderProduct(item, index)}
          numColumns={1}
          extraData={this.state}
        />
      );
    }
  };

  favoriteProduct = index => {
    const { notas } = this.state;
    let notaAux = notas;

    this.setState({
      notas: [],
    });

    let nota = notaAux[index];
    nota.produto.favoritado = !notaAux[index].produto.favoritado;
    notaAux[index] = nota;

    this.setState({
      notas: notaAux,
    });

    this.saveAsyncStorage(nota);
  };

  saveAsyncStorage = async nota => {
    const { notasAsyncStorage } = this.state;

    if (this.hasProductAsyncStorage(nota.produto)) {
      this.deleteProductAsyncStorage(nota.produto);
    } else {
      this.setState(
        {
          notasAsyncStorage: [...notasAsyncStorage, nota],
        },
        async () => {
          await this.defineNotesAsyncStorage();
        }
      );
    }
  };

  deleteProductAsyncStorage = product => {
    const { notasAsyncStorage } = this.state;

    let notas = notasAsyncStorage.filter(
      note => note.produto.codigo != product.codigo
    );

    this.setState(
      {
        notasAsyncStorage: notas,
      },
      async () => {
        await this.defineNotesAsyncStorage();
      }
    );
  };

  hasProductAsyncStorage = product => {
    const { notasAsyncStorage } = this.state;

    let statusFavorito = false;

    notasAsyncStorage.map(note => {
      if (note.produto.codigo == product.codigo) {
        statusFavorito = true;
      }
    });

    return statusFavorito;
  };

  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return index % 2 == 0 ? (
      <Grid style={styles.productContainerRed}>
        <Col>
          <Row style={styles.nameProductContainer}>
            <Text>
              <Icon name={'shopping-basket'} size={22} color={colors.primary} />
            </Text>
            <Text numberOfLines={1} style={styles.nameProductText}>
              {item.produto.nome}
            </Text>
          </Row>
          <Row style={styles.marginLeft}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LocationScreen', { item })}
            >
              <Row>
                <Text>
                  <Icon name={'location-on'} size={22} color={colors.primary} />
                </Text>
                <Text numberOfLines={1} style={styles.nameProductText}>
                  {item.emitente.nome_fantasia}
                </Text>
              </Row>
            </TouchableOpacity>
          </Row>

          <Row style={styles.marginLeft}>
            <Text>
              <Icon name={'date-range'} size={22} color={colors.primary} />
            </Text>
            <Text numberOfLines={1} style={styles.dataEmissao}>
              {item.nfce.data_emissao_formatada}
            </Text>
          </Row>
        </Col>
        <Col style={styles.priceContainer}>
          {item.produto.favoritado ? (
            <Text onPress={() => this.favoriteProduct(index)}>
              <Icon name={'star'} size={30} color={colors.gold} />
            </Text>
          ) : (
            <Text onPress={() => this.favoriteProduct(index)}>
              <Icon name={'star-border'} size={30} color={'black'} />
            </Text>
          )}
          <Text style={styles.priceText}>
            R${' '}
            {parseFloat(item.produto.preco_unitario).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </Text>
        </Col>
      </Grid>
    ) : (
      <Grid style={styles.productContainerWhite}>
        <Col>
          <Row style={styles.nameProductContainer}>
            <Text>
              <Icon name={'shopping-basket'} size={22} color={colors.primary} />
            </Text>
            <Text numberOfLines={1} style={styles.nameProductText}>
              {item.produto.nome}
            </Text>
          </Row>
          <Row style={styles.marginLeft}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LocationScreen', { item })}
            >
              <Row>
                <Text>
                  <Icon name={'location-on'} size={22} color={colors.primary} />
                </Text>
                <Text numberOfLines={1} style={styles.nameProductText}>
                  {item.emitente.nome_fantasia}
                </Text>
              </Row>
            </TouchableOpacity>
          </Row>

          <Row style={styles.marginLeft}>
            <Text>
              <Icon name={'date-range'} size={22} color={colors.primary} />
            </Text>
            <Text numberOfLines={1} style={styles.nameProductText}>
              {item.nfce.data_emissao_formatada}
            </Text>
          </Row>
        </Col>
        <Col style={styles.priceContainer}>
          {item.produto.favoritado ? (
            <Text onPress={() => this.favoriteProduct(index)}>
              <Icon name={'star'} size={30} color={colors.gold} />
            </Text>
          ) : (
            <Text onPress={() => this.favoriteProduct(index)}>
              <Icon name={'star-border'} size={30} color={'black'} />
            </Text>
          )}
          <Text style={styles.priceText}>
            R${' '}
            {parseFloat(item.produto.preco_unitario).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </Text>
        </Col>
      </Grid>
    );
  };

  render() {
    const { ordecanao } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.monthContainer}
            onPress={() => this.handleOrdenacao()}
          >
            <Text style={styles.ordenacao}>{ordecanao}</Text>
            <Text style={styles.icon}>
              <Icon name="filter-list" size={18} colors={colors.light} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 34 }}>{this.renderProductList()}</View>
      </View>
    );
  }
}

export default ListProducts;
