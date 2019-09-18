import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';
import base from '~/styles/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  topContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  monthContainer: {
    backgroundColor: colors.primary,
    width: 295,
    height: 40,
    borderRadius: 20,
    marginBottom: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontFamily: 'Lucida-Sans-Unicode',
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedNumber: {
    color: colors.primary,
    fontSize: 50,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
