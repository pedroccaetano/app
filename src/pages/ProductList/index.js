import React, { Component } from 'react';

import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Row, Grid, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import colors from '~/styles/colors';
import utils from '~/utils/index';
import styles from './styles';

class ProductList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Lista de Compra',
      headerTintColor: colors.primary,
      headerTitleStyle: {},
      headerStyle: {
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerRight: (
        <View style={{ marginRight: 16, padding: 3 }}>
          <TouchableOpacity onPress={navigation.getParam('cleanLocalStorage')}>
            <FontAwesome5 name="trash" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  _cleanLocalStorage = async () => {
    Alert.alert(
      'Atenção',
      'Irá excluir todos os itens da sua lista de compra. Você tem certeza ?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            this.setState(
              {
                notasLocalStorage: [],
              },
              async () => {
                await AsyncStorage.setItem(
                  '@Sefaz:notasStorage',
                  JSON.stringify([])
                );
              }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  state = {
    notasLocalStorage: [],
  };

  componentDidMount = async () => {
    const { notasLocalStorage } = this.state;

    await this.restoreNotesLocalStorage();

    if (notasLocalStorage.length) {
      notasLocalStorage.map(item => {
        let favoritado = this.hasProductLocalStorage(item.produto);

        item.produto.favoritado = favoritado;
      });
    }

    this.props.navigation.setParams({
      cleanLocalStorage: this._cleanLocalStorage,
    });
  };

  restoreNotesLocalStorage = async () => {
    await AsyncStorage.getItem('@Sefaz:notasStorage').then(response => {
      this.setState({
        notasLocalStorage: JSON.parse(response),
      });
    });
  };

  renderProductList = () => {
    const { notasLocalStorage } = this.state;

    if (notasLocalStorage.length) {
      return (
        <FlatList
          data={notasLocalStorage}
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
              onPress={() => navigation.navigate('LocationScreen', { item })}
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
              onPress={() => navigation.navigate('LocationScreen', { item })}
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
    const { notasLocalStorage } = this.state;

    Alert.alert(
      'Atenção',
      'Você deseja excluir esse item dos favoritos?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            let nota = notasLocalStorage[index];
            nota.produto.favoritado = !notasLocalStorage[index].produto
              .favoritado;
            notasLocalStorage[index] = nota;

            this.setState({
              notasLocalStorage: notasLocalStorage,
            });

            await this.saveLocalStorage(nota);
          },
        },
      ],
      { cancelable: true }
    );
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

  defineNotesLocalStorage = async () => {
    const { notasLocalStorage } = this.state;

    await AsyncStorage.setItem(
      '@Sefaz:notasStorage',
      JSON.stringify(notasLocalStorage)
    );
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
    const { notasLocalStorage } = this.state;
    return (
      <View style={styles.container}>
        {notasLocalStorage.length ? (
          <View>{this.renderProductList()}</View>
        ) : (
          <View
            style={{
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{ paddingTop: 18, fontSize: 16, color: colors.primary }}
            >
              Não há produtos favoritados.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default ProductList;
