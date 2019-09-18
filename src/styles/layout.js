import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  defaultMargin: 20,
  defaultPadding: 20,
  defaultRadius: 5,
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
