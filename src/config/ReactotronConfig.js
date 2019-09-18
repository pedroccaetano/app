import Reactotron, { networking } from 'reactotron-react-native'

if (__DEV__) {
  // 192.168.0.114
  const tron = Reactotron.configure({ host: '192.168.0.114' }) // controls connection & communication settings
    .useReactNative()
    // .use(networking) // add all built-in react native plugins
    .connect() // let's connect!

  console.tron = tron

  tron.clear()
}

export default Reactotron
