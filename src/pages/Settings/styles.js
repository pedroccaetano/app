import { StyleSheet } from 'react-native';
import colors from '~/styles/colors';

const styles = StyleSheet.create({
  containerDashboar: {
    backgroundColor: '#eee',
  },
  containerPesquisa: {
    backgroundColor: '#7901250F',
  },
  containerCompras: { backgroundColor: '#79012545' },
  containerSair: { backgroundColor: '#79012575' },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    alignSelf: 'center',
  },
  marginFifity: {
    marginLeft: 50,
  },
  marginEighty: {
    marginLeft: 80,
  },
});

export default styles;
