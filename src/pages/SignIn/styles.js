import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';
import base from '~/styles/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonCadastrar: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderRadius: base.defaultRadius,
    height: 45,
    marginHorizontal: base.defaultMargin * 2,
    marginTop: base.defaultMargin,
  },
  buttonText: {
    paddingTop: 12,
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  buttonLoding: {
    height: 46,
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default styles;
