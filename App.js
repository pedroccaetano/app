import React from 'react';
import { StatusBar } from 'react-native';

import Root from '~/index';

import '~/config/ReactotronConfig';
import '~/config/DevTools';
import colors from '~/styles/colors';

console.disableYellowBox = true;

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    <Root />
  </>
);

export default App;
