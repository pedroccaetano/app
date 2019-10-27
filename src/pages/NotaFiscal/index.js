import React, { Component } from 'react';

import { Text, View } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import colors from '~/styles/colors';
import styles from './styles';
import utils from '~/utils/index';
import QRCode from 'react-native-qrcode-svg';

class NotaFiscal extends Component {
  static navigationOptions = {
    headerTitle: 'Nota Fiscal',
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
  };

  // state = {
  //   nota: {},
  // };

  render() {
    const { nota } = this.props.navigation.state.params;
    const { emitente, produtos, nfe, dados, total } = nota;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.topContainer}>
          {emitente.uf === 'RS' ? (
            <Text style={styles.nomeFantasia}>{emitente.nome_fantasia}</Text>
          ) : (
            <>
              <Text style={styles.nomeFantasia}>{emitente.nome_fantasia}</Text>
              <Text style={styles.nomeFantasia}>{emitente.nome_razao}</Text>
            </>
          )}

          <Text style={styles.textoNormal}>
            CNPJ: {utils.mascaraCnpj(emitente.cnpj)}
          </Text>
          {emitente.uf === 'RS' ? (
            <Text style={styles.textoNormal}>{emitente.endereco}</Text>
          ) : (
            <Text style={styles.textoNormal}>
              {emitente.municipio} - {emitente.uf}
            </Text>
          )}
          <Text style={styles.textoNormal}>
            CEP: {utils.mascaraCep(emitente.cep)}
          </Text>
          <Text style={styles.textoNormal}>
            Documento Auxiliar da Nota Fiscal de Consumidor Eletrônica
          </Text>
        </View>
        <View style={styles.productsContainer}>
          <View style={[styles.headerTable, styles.textoNormal]}>
            <View style={[{ flex: 0.5 }, styles.stretch]}>
              <Text>Cod</Text>
            </View>
            <View style={[{ flex: 1 }, styles.stretch]}>
              <Text>Descrição</Text>
            </View>
            <View style={[{ flex: 0.6 }, styles.stretch]}>
              <Text style={styles.center}>Qtd. Un</Text>
            </View>
            <View style={[{ flex: 0.6 }, styles.stretch]}>
              <Text style={styles.center}>V. Unit</Text>
            </View>
            <View style={[{ flex: 0.5 }, styles.stretch]}>
              <Text style={styles.right}>V. Total</Text>
            </View>
          </View>

          <Text
            style={[styles.lineFont, { fontWeight: 'bold' }]}
            numberOfLines={1}
            ellipsizeMode={'clip'}
          >
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - -
          </Text>

          {produtos.map(produto => {
            return (
              <View style={styles.headerTable}>
                <View style={[{ flex: 0.5 }, styles.stretch]}>
                  <Text style={styles.textoNormal}>{produto.codigo}</Text>
                </View>
                <View style={[{ flex: 1 }, styles.stretch]}>
                  <Text style={[styles.left, styles.textoNormal]}>
                    {produto.nome}
                  </Text>
                </View>
                <View style={[{ flex: 0.6 }, styles.stretch]}>
                  <Text style={[styles.center, styles.textoNormal]}>
                    {produto.quantidade} {produto.unidade}
                  </Text>
                </View>
                <View style={[{ flex: 0.6 }, styles.stretch]}>
                  <Text style={[styles.center, styles.textoNormal]}>
                    {produto.preco_unitario}
                  </Text>
                </View>
                <View style={[{ flex: 0.5 }, styles.stretch]}>
                  <Text style={[styles.right, styles.textoNormal]}>
                    {produto.preco_total}
                  </Text>
                </View>
              </View>
            );
          })}

          <Text
            style={[styles.lineFont, { fontWeight: 'bold', marginTop: 10 }]}
            numberOfLines={1}
            ellipsizeMode={'clip'}
          >
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - -
          </Text>
          <View style={styles.headerTable}>
            <View style={[{ flex: 0.8 }, styles.stretch]}>
              <Text>Valor Total R$</Text>
            </View>
            <View style={[{ flex: 0.2 }, styles.stretch]}>
              <Text style={styles.right}>
                {utils.currencyFormat(parseFloat(total.valor_produto))}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={[styles.textoNormal, { fontWeight: 'bold' }]}>
            Consulte pela Chave de Acesso em:
          </Text>
          <Text style={[styles.textoNormal]}>
            {emitente.uf === 'RS' ? (
              <Text style={styles.textoNormal}>
                https://www.sefaz.rs.gov.br
              </Text>
            ) : emitente.uf === 'PE' ? (
              <Text style={styles.textoNormal}>
                https://nfce.sefaz.pe.gov.br
              </Text>
            ) : (
              <Text style={[styles.textoNormal, { fontWeight: 'bold' }]}></Text>
            )}
          </Text>
          <Text style={[styles.textoNormal, { marginTop: 8, marginBottom: 8 }]}>
            {nfe.chave}
          </Text>
          <QRCode value={nfe.url} size={150} backgroundColor="#FFFFB9" />
        </View>
      </ScrollView>
    );
  }
}

export default NotaFiscal;
