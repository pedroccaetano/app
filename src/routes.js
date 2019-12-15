import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import colors from '~/styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import MainScreen from '~/pages/Main';
import LogInScreen from '~/pages/Login';
import SignInScreen from '~/pages/SignIn';
import MenuScreen from '~/pages/Menu';
import SearchProductsScreen from '~/pages/Search';
import ListProductsScreen from '~/pages/Search/ListProducts';
import InvoiceScreen from '~/pages/Invoice';
import SpecialProductsScreen from '~/pages/SpecialProducts';
import ScannerScreen from '~/pages/Scanner';
import LocationScreen from '~/pages/Location';

const MenuScreens = createStackNavigator(
  {
    MenuScreen,
    SearchProductsScreen,
    LocationScreen,
    SpecialProductsScreen,
    ListProductsScreen,
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
    Invoice: InvoiceScreen,
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

const ScannerScreens = createStackNavigator(
  {
    Scanner: ScannerScreen,
    InvoiceScanner: InvoiceScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'scanner',
      tabBarIcon: ({ focused }) => (
        <IconMaterial
          name="qrcode-scan"
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
        Login: createStackNavigator({
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
            ScannerScreens,
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
              keyboardHidesTabBar: true,
            },
          }
        ),
      },
      {
        initialRouteName: userLogged ? 'App' : 'Login',
        showIcon: true,
        keyboardHidesTabBar: true,
      }
    )
  );

export default Routes;
