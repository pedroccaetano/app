import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';

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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  ordenacao: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 12,
    color: colors.white,
  },
  nameProductContainer: {
    marginLeft: 12,
    marginTop: 20,
  },
  nameProductText: {
    marginLeft: 4,
    fontSize: 15,
  },
  dataEmissao: {
    marginLeft: 4,
  },
  priceContainer: {
    width: 80,
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  marginLeft: {
    marginLeft: 12,
  },
  productContainerRed: {
    height: 100,
    backgroundColor: colors.backgroundProducts,
  },
  productContainerWhite: {
    height: 100,
    backgroundColor: colors.white,
  },
});

export default styles;
