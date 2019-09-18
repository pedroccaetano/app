import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, Text, Left, Body, Right, View } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '~/styles/colors';
import utils from '~/utils/index';
import styles from './styles';

const Nota = ({ nota, navigation }) => (
  <ListItem thumbnail onPress={() => navigation.navigate('Note')}>
    <Left>
      <View style={styles.iconButton}>
        <Icon name="dollar-sign" size={26} color={colors.primary} />
      </View>
    </Left>
    <Body>
      <Text style={styles.razaoSocial}>
        {nota.emitente.nome_razao.substr(0, 26).toUpperCase()}
      </Text>
      <Text note numberOfLines={1} style={styles.dataEmissao}>
        {nota.nfe.data_emissao_formatada}
      </Text>
    </Body>
    <Right>
      <Text style={styles.currency}>
        {utils.currencyFormat(parseFloat(nota.total.valor_nota))}
      </Text>
    </Right>
  </ListItem>
);

Nota.propTypes = {
  nota: PropTypes.shape({
    emitente: PropTypes.shape({
      nome_razao: PropTypes.string.isRequired,
      nome_fantasia: PropTypes.string.isRequired,
      cnpj: PropTypes.string.isRequired,
      endereco: PropTypes.string.isRequired,
      cep: PropTypes.string.isRequired,
      municipio: PropTypes.string.isRequired,
      uf: PropTypes.string.isRequired,
    }).isRequired,
    nfe: PropTypes.shape({
      modelo: PropTypes.number.isRequired,
      serie: PropTypes.number.isRequired,
      numero: PropTypes.number.isRequired,
      data_emissao: PropTypes.string.isRequired,
      data_emissao_formatada: PropTypes.string.isRequired,
    }).isRequired,
    total: PropTypes.shape({
      valor_produto: PropTypes.string.isRequired,
      valor_nota: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Nota;
