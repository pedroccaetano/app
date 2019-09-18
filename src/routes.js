import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LogInScreen from '~/pages/Login';
import SignInScreen from '~/pages/SignIn';
import SettingScreen from '~/pages/Settings';
import ProductsScreen from '~/pages/Searches/Products';
import MainScreen from '~/pages/Main';
import NotaFiscalScreen from '~/pages/NotaFiscalPapel';

import ScannerScreen from '~/pages/Scanner';
import colors from '~/styles/colors';

const SettingScreens = createStackNavigator(
  {
    Setting: SettingScreen,
    Details: ProductsScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ focused }) => (
        <Icon
          name="menu"
          size={22}
          color={focused ? colors.primary : colors.light}
        />
      ),
    },
  }
);

const MainScreens = createStackNavigator(
  {
    Main: MainScreen,
    Note: NotaFiscalScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'home',
      tabBarIcon: ({ focused }) => (
        <Icon
          name="home"
          size={22}
          color={focused ? colors.primary : colors.light}
        />
      ),
    },
  }
);

const Routes = (userLogged = true) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Welcome: {
          screen: LogInScreen,
          navigationOptions: {
            header: null,
          },
        },
        Log: createStackNavigator({
          LogIn: {
            screen: LogInScreen,
            navigationOptions: {
              header: null,
            },
          },
          SignIn: {
            screen: SignInScreen,
          },
        }),
        ProductsSearch: createStackNavigator({
          ProductsSearch: {
            screen: ProductsScreen,
          },
        }),
        App: createBottomTabNavigator(
          {
            SettingScreens,
            MainScreens,
            ScannerScreen,
          },
          {
            tabBarOptions: {
              showIcon: true,
              showLabel: false,
              activeTintColor: colors.primary,
              inactiveTintColor: colors.light,
              style: {
                backgroundColor: colors.white,
              },
            },
          }
        ),
      },
      {
        initialRouteName: ScannerScreen ? 'App' : 'App',
        showIcon: true,
      }
    )
  );

export default Routes;
