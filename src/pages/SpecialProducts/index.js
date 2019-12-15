import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';

import AnimateNumber from 'react-native-animate-number';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

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
          <TouchableOpacity onPress={navigation.getParam('cleanAsyncStorage')}>
            <FontAwesome name="trash" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  state = {
    notasAsyncStorage: [],
    total: 0.0,
  };

  componentDidMount = async () => {
    await this.restoreNotesAsyncStorage();

    this.state.notasAsyncStorage.map(item => {
      this.setState({
        total: this.state.total + parseFloat(item.produto.preco_unitario),
      });
    });

    this.props.navigation.setParams({
      cleanAsyncStorage: this.cleanAsyncStorage,
    });
  };

  restoreNotesAsyncStorage = async () => {
    await AsyncStorage.getItem('@Sefaz:notasStorage').then(response => {
      this.setState({
        notasAsyncStorage: JSON.parse(response),
      });
    });
  };

  renderProductList = () => {
    const { notasAsyncStorage } = this.state;

    if (notasAsyncStorage.length) {
      return (
        <FlatList
          data={notasAsyncStorage}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => this.renderProduct(item, index)}
          numColumns={1}
          extraData={this.state}
        />
      );
    }
  };

  cleanAsyncStorage = async () => {
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
                notasAsyncStorage: [],
                total: 0.0,
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

  favoriteProduct = async index => {
    const { notasAsyncStorage } = this.state;

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
            let nota = notasAsyncStorage[index];

            nota.produto.favoritado = !notasAsyncStorage[index].produto
              .favoritado;
            notasAsyncStorage[index] = nota;

            this.setState({
              notasAsyncStorage: notasAsyncStorage,
              total: this.state.total - parseFloat(nota.produto.preco_unitario),
            });

            await this.saveAsyncStorage(nota);
          },
        },
      ],
      { cancelable: true }
    );
  };

  saveAsyncStorage = async nota => {
    const { notasAsyncStorage } = this.state;
    const { produto } = nota;

    if (this.hasProductAsyncStorage(produto)) {
      this.deleteProduct(produto);
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

  defineNotesAsyncStorage = async () => {
    await AsyncStorage.setItem(
      '@Sefaz:notasStorage',
      JSON.stringify(this.state.notasAsyncStorage)
    );
  };

  deleteProduct = product => {
    this.setState(
      {
        notasAsyncStorage: this.state.notasAsyncStorage.filter(
          note => note.produto.codigo != product.codigo
        ),
      },
      async () => {
        await this.defineNotesAsyncStorage();
      }
    );
  };

  hasProductAsyncStorage = product => {
    let statusFavorito = false;

    this.state.notasAsyncStorage.map(note => {
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

          <Row style={[styles.marginLeft]}>
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
    const { notasAsyncStorage, total } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.animatedNumber}>
          R${' '}
          <AnimateNumber
            value={total}
            formatter={val => {
              return `${utils.currencyFormat(parseFloat(val))}`;
            }}
          />
        </Text>
        {notasAsyncStorage.length ? (
          <View style={{ marginBottom: 34 }}>{this.renderProductList()}</View>
        ) : (
          <View style={styles.containerSemProdutos}>
            <Text style={styles.textoSemProdutos}>
              Não há produtos favoritados.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default ProductList;
