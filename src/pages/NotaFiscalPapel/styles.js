import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';
import base from '~/styles/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFB9',
    margin: 10,
    padding: 10,
  },
  topContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  middleContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textNota: {
    fontSize: 12,
  },
  lineFont: {
    fontSize: 15,
  },
});

export default styles;
