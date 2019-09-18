import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';
import base from '~/styles/layout';

const styles = StyleSheet.create({
  buttonCadastrar: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    marginHorizontal: 15,
    height: 45,
    borderRadius: base.defaultRadius,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  iconButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  razaoSocial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  dataEmissao: {
    fontSize: 10,
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default styles;
