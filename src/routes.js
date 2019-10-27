import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import colors from '~/styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import MainScreen from '~/pages/Main';
import LogInScreen from '~/pages/Login';
import SignInScreen from '~/pages/SignIn';
import MenuScreen from '~/pages/Menu';
import SearchProductsScreen from '~/pages/Search';
import ListProductsScreen from '~/pages/Search/ListProducts';
import NotaFiscalScreen from '~/pages/NotaFiscal';
import ProductListScreen from '~/pages/ProductList';
import ScannerScreen from '~/pages/Scanner';
import LocationScreen from '~/pages/Location';

const MenuScreens = createStackNavigator(
  {
    MenuScreen,
    LocationScreen,
    ProductListScreen,
    ListProductsScreen,
    SearchProductsScreen,
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

const Routes = (userLogged = false) =>
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
            screen: SearchProductsScreen,
          },
        }),
        App: createBottomTabNavigator(
          {
            MainScreens,
            ScannerScreen,
            MenuScreens,
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
        initialRouteName: userLogged ? 'App' : 'Log',
        showIcon: true,
      }
    )
  );

export default Routes;
