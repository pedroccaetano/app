import { StyleSheet } from 'react-native';

import colors from '~/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  containerSemProdutos: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSemProdutos: { paddingTop: 18, fontSize: 16, color: colors.primary },
  nameProductContainer: {
    marginLeft: 12,
    marginTop: 20,
  },
  nameProductText: {
    marginLeft: 4,
    fontSize: 15,
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
  animatedNumber: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 50,
  },
});

export default styles;
