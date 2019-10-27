import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';
import base from '~/styles/layout';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingVertical: base.defaultPadding,
    backgroundColor: colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.7,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  logo: {
    position: 'relative',
    width: 258,
    height: 261,
  },
  buttonCadastrar: {
    // marginTop: 30,
    // alignContent: 'stretch',
    alignSelf: 'stretch',
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
