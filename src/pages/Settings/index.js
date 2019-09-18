import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IcoFoundation from 'react-native-vector-icons/Foundation';
import colors from '~/styles/colors';
import styles from './styles';

const TabIcon = ({ tintColor }) => (
  <Icon name="menu" size={22} color={tintColor} />
);

class SettingScreen extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
    header: null,
  };

  signOut = async () => {
    const { navigation } = this.props;

    await AsyncStorage.clear();

    navigation.navigate('Log');
  };

  render() {
    const { navigation } = this.props;
    return (
      <Grid>
        <Row>
          <TouchableOpacity style={styles.button}>
            <View style={styles.marginFifity}>
              <IcoFoundation
                name="graph-pie"
                size={100}
                color={colors.primary}
              />
            </View>
            <View style={styles.marginEighty}>
              <Text style={styles.textTitle}>DASHBOARD</Text>
            </View>
          </TouchableOpacity>
        </Row>
        <Row style={styles.containerPesquisa}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Details')}
          >
            <View style={styles.marginFifity}>
              <Icon name="search" size={100} color={colors.primary} />
            </View>
            <View style={styles.marginFifity}>
              <Text style={styles.textTitle}>PESQUISA DE {'\n'}PRODUTOS</Text>
            </View>
          </TouchableOpacity>
        </Row>
        <Row style={styles.containerCompras}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.marginFifity}>
              <IconMaterial name="basket" size={100} color={colors.primary} />
            </View>
            <View style={styles.marginFifity}>
              <Text style={styles.textTitle}>COMPRAS</Text>
            </View>
          </TouchableOpacity>
        </Row>
        <Row style={styles.containerSair}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.signOut()}
          >
            <View style={styles.marginFifity}>
              <IconMaterial name="logout" size={100} color={colors.primary} />
            </View>
            <View style={styles.marginFifity}>
              <Text style={styles.textTitle}>SAIR</Text>
            </View>
          </TouchableOpacity>
        </Row>
      </Grid>
    );
  }
}

export default SettingScreen;
