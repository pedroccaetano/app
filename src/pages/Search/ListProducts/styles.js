import { StyleSheet, Dimensions } from 'react-native';
import colors from '~/styles/colors';
import base from '~/styles/layout';

const { width } = Dimensions.get('window'); // full width
const { height } = Dimensions.get('window'); // full height

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
    marginBottom: 16,
  },
  monthContainer: {
    backgroundColor: colors.primary,
    width: 154,
    height: 27,
    borderRadius: 20,
    // marginBottom: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: 'Lucida-Sans-Unicode',
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    // textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  icon: {
    color: colors.white,
    // paddingTop: 8,
  },
});

export default styles;
