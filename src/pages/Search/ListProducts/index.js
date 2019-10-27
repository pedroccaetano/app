import React, { Component } from 'react';

import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Row, Grid, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';
import styles from './styles';
import utils from '~/utils/index';

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
    notasLocalStorage: [],
  };

  componentDidMount = async () => {
    this.setState({
      notas: this.props.navigation.state.params.notas
        .sort((a, b) => {
          return (
            parseFloat(a.produto.preco_unitario) -
            parseFloat(b.produto.preco_unitario)
          );
        })
        .reverse(),
    });

    await this.restoreNotesLocalStorage();
  };

  restoreNotesLocalStorage = async () => {
    await AsyncStorage.getItem('@Sefaz:notasStorage').then(response => {
      this.setState({
        notasLocalStorage: JSON.parse(response),
      });
    });
  };

  defineNotesLocalStorage = async () => {
    const { notasLocalStorage } = this.state;

    await AsyncStorage.setItem(
      '@Sefaz:notasStorage',
      JSON.stringify(notasLocalStorage)
    );
  };

  ordernarNotas = () => {
    const { ordernar, notas } = this.state;

    this.setState({ ordernar: !ordernar, notas: [] }, () => {
      if (!ordernar) {
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

  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return index % 2 == 0 ? (
      <Grid style={{ height: 100, backgroundColor: '#79012533' }}>
        <Col>
          <Row style={{ marginLeft: 12, marginTop: 20 }}>
            <Text>
              <Icon name={'shopping-basket'} size={22} color={colors.primary} />
            </Text>
            <Text numberOfLines={1} style={{ marginLeft: 4, fontSize: 15 }}>
              {item.produto.nome}
            </Text>
          </Row>
          <Row style={{ marginLeft: 12 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LocationScreen')}
            >
              <Text numberOfLines={1} style={{ fontSize: 15 }}>
                <Icon name={'location-on'} size={22} color={colors.primary} />
                {item.emitente.nome_fantasia}
              </Text>
            </TouchableOpacity>
          </Row>
        </Col>
        <Col
          style={{
            width: 80,
            flex: 0.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.produto.favoritado ? (
            <Text onPress={() => this.pushFavorito(index)}>
              <Icon name={'star'} size={30} color={'#F8C327'} />
            </Text>
          ) : (
            <Text onPress={() => this.pushFavorito(index)}>
              <Icon name={'star-border'} size={30} color={'black'} />
            </Text>
          )}
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
            }}
          >
            R$ {item.produto.preco_unitario}
          </Text>
        </Col>
      </Grid>
    ) : (
      <Grid style={{ height: 100, backgroundColor: colors.white }}>
        <Col>
          <Row style={{ marginLeft: 12, marginTop: 20 }}>
            <Text>
              <Icon name={'shopping-basket'} size={22} color={colors.primary} />
            </Text>
            <Text numberOfLines={1} style={{ marginLeft: 4, fontSize: 15 }}>
              {item.produto.nome}
            </Text>
          </Row>
          <Row style={{ marginLeft: 12 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LocationScreen')}
            >
              <Text numberOfLines={1} style={{ fontSize: 15 }}>
                <Icon name={'location-on'} size={22} color={colors.primary} />
                {item.emitente.nome_fantasia}
              </Text>
            </TouchableOpacity>
          </Row>
        </Col>
        <Col
          style={{
            width: 80,
            flex: 0.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.produto.favoritado ? (
            <Text onPress={() => this.pushFavorito(index)}>
              <Icon name={'star'} size={30} color={'#F8C327'} />
            </Text>
          ) : (
            <Text onPress={() => this.pushFavorito(index)}>
              <Icon name={'star-border'} size={30} color={'black'} />
            </Text>
          )}
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
            }}
          >
            R$ {utils.currencyFormat(parseFloat(item.produto.preco_unitario))}
          </Text>
        </Col>
      </Grid>
    );
  };

  pushFavorito = async index => {
    const { notas, notasLocalStorage } = this.state;
    let notas_aux = notas;

    this.setState({
      notas: [],
    });

    let nota = notas_aux[index];
    nota.produto.favoritado = !notas_aux[index].produto.favoritado;
    notas_aux[index] = nota;

    this.setState({
      notas: notas_aux,
    });

    await this.saveLocalStorage(nota);
  };

  saveLocalStorage = async nota => {
    const { notasLocalStorage } = this.state;
    const { produto } = nota;

    if (this.hasProductLocalStorage(produto)) {
      this.deleteProduct(produto);
    } else {
      this.setState(
        {
          notasLocalStorage: [...notasLocalStorage, nota],
        },
        async () => {
          await this.defineNotesLocalStorage();
        }
      );
    }
  };

  deleteProduct = product => {
    const { notasLocalStorage } = this.state;

    let notas = notasLocalStorage.filter(
      note => note.produto.codigo != product.codigo
    );

    this.setState(
      {
        notasLocalStorage: notas,
      },
      async () => {
        await this.defineNotesLocalStorage();
      }
    );
  };

  hasProductLocalStorage = product => {
    const { notasLocalStorage } = this.state;

    let statusFavorito = false;

    notasLocalStorage.map(note => {
      if (note.produto.codigo == product.codigo) {
        statusFavorito = true;
      }
    });

    return statusFavorito;
  };

  render() {
    const { ordernar } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.monthContainer}
            onPress={() => this.ordernarNotas()}
          >
            <Text style={styles.monthText}>
              {!ordernar ? 'Maior preço' : 'Menor preço'}
            </Text>
            <Text style={styles.icon}>
              {ordernar ? (
                <Icon
                  name="keyboard-arrow-down"
                  size={18}
                  colors={colors.light}
                />
              ) : (
                <Icon
                  name="keyboard-arrow-up"
                  size={18}
                  colors={colors.light}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View>{this.renderProductList()}</View>
      </View>
    );
  }
}

export default ListProducts;
