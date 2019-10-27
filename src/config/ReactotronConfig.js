import Reactotron, { networking } from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.10.118' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}

export default Reactotron;
