import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';
import base from '~/styles/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFB9',
    margin: 10,
    padding: 10,
    fontSize: 12,
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
  bottomContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textoNormal: {
    fontSize: 12,
    marginBottom: 2,
    marginTop: 2,
  },
  lineFont: {
    fontSize: 15,
  },
  nomeFantasia: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerTable: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
});

export default styles;
