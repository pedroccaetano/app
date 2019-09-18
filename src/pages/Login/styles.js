import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';
import base from '~/styles/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: base.defaultPadding,
    backgroundColor: colors.white,
  },
  loginContainer: {
    alignItems: 'center',
  },
  formContainer: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'relative',
    width: 258 * 1.5,
    height: 261 * 1.5,
  },
  buttonCadastrar: {
    marginTop: 30,
    backgroundColor: colors.primary,
    marginHorizontal: base.defaultMargin * 2,
    height: base.defaultMargin * 2.2,
    borderRadius: base.defaultRadius,
    justifyContent: 'center',
  },
  buttonEntrar: {
    marginTop: 5,
    backgroundColor: colors.white,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default styles;
