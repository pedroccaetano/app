/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';

import {
  View,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AnimateNumber from 'react-native-animate-number';
import Picker from 'react-native-picker';

import Nota from './Nota';
import api from '~/services/index';
import colors from '~/styles/colors';
import utils from '~/utils/index';
import styles from './styles';

const TabIcon = ({ tintColor }) => (
  <Icon name="home" size={22} color={tintColor} />
);

class Main extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
    header: null,
  };

  state = {
    loading: false,
    refreshing: false,
    data: [],
    total: 0,
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    currentMonth: '',
  };

  componentDidMount = async () => {
    await this.loadCompras();

    const { months } = this.state;
    const date = new Date();
    this.setState({
      currentMonth: months[date.getMonth()],
    });
  };

  loadCompras = async () => {
    const { months } = this.state
    const token = await AsyncStorage.getItem('@Sefaz:token');
    const today = new Date();

    this.setState({ loading: true, total: 0, currentMonth: months[today.getMonth()] });

    await api
    .get(`/nota/date/${today.getFullYear()}-${today.getMonth()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.setState({ data: response.data, loading: false });
      })
      .finally(() => {
        this.calcularTotal();
      });
  };

  calcularTotal = () => {
    const { data } = this.state;
    let total = 0;

    data.map(produto => {
      total += parseFloat(produto.total.valor_nota.replace(/,/, '.'));
      return total;
    });

    this.setState({ total });
  };

  renderListItem = ({ item }) => {
    const { navigation } = this.props;

    return <Nota nota={item} navigation={navigation} />;
  };

  showTimePicker = () => {
    const years = [];
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    for (let i = 1; i < 51; i++) {
      years.push(i + 1980);
    }

    const pickerData = [years, months];
    const date = new Date();

    const indexMonth = this.getMonthIndex(months);

    const selectedValue = [date.getFullYear(), months[indexMonth]];

    Picker.init({
      pickerData,
      selectedValue,
      pickerTitleText: 'Selecione ano e mês',
      wheelFlex: [1, 1],
      onPickerConfirm: pickedValue => {
        const {
          currentYear = pickedValue[0],
          currentMonth = pickedValue[1],
        } = pickedValue;

        this.setState({
          currentYear,
          currentMonth,
        });

        this.getNoteByMonth(currentYear, this.getMonthIndex());
      },
    });
    Picker.show();
  };

  getNoteByMonth = async (year, fristMonth) => {
    this.setState({ loading: true, total: 0, data: [] });

    const token = await AsyncStorage.getItem('@Sefaz:token');

    await api
      .get(`/nota/date/${year}-${fristMonth}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const { nota } = response.data;
        this.setState({ data: nota });
      })
      .finally(() => {
        this.calcularTotal();
        this.setState({ loading: false });
      });
  };

  getMonthIndex = () => {
    const { currentMonth, months } = this.state;

    const indexMonth = months.map((month, index) => {
      if (currentMonth === month) {
        return index;
      }
      return null;
    });

    return indexMonth.filter(el => {
      return el != null;
    });
  };

  renderList = () => {
    const { data, refreshing } = this.state;

    if (data.length) {
      return (
        <FlatList
          data={data}
          keyExtractor={item => String(item._id)}
          renderItem={this.renderListItem}
          numColumns={1}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              colors={[colors.primary, colors.primary]}
              onRefresh={this.loadCompras}
            />
          }
        />
      );
    }
    return (
      <View style={styles.containerSemNota}>
        <Text style={styles.semNota}>Não há notas cadastradas nesse mês.</Text>
      </View>
    );
  };

  render() {
    const { loading, total, currentMonth } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.monthContainer}
            onPress={() => this.showTimePicker()}
          >
            <Text style={styles.monthText}>{currentMonth}</Text>
          </TouchableOpacity>
          <Text style={styles.animatedNumber}>
            <AnimateNumber
              value={total}
              formatter={val => {
                return utils.currencyFormat(parseFloat(val));
              }}
            />
          </Text>
        </View>
        {loading ? (
          <View style={styles.activityContainer}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

export default withNavigation(Main);
