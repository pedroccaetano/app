import { StyleSheet, Dimensions } from 'react-native';
import colors from '~/styles/colors';
import base from '~/styles/layout';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  datePicker: {
    width: width / 2 - 15,
    height: 48,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dateInput: {
    padding: 5,
    alignItems: 'flex-start',
    color: colors.primary,
  },
  datePlaceholder: {
    color: colors.black,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.primary,
    color: colors.primary,
    fontSize: 14,
  },
  label: {
    color: colors.primary,
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 6,
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: base.defaultRadius,
    justifyContent: 'center',
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default styles;
