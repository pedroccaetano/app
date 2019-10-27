import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyCTz-NfFknY2c9kuPMBsdzQYJCGNBn0XVw'); // use a valid API key

class Location extends Component {
  static navigationOptions = {
    header: null,
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
    },
  };

  state = {
    item: {},
    loading: false,
    latitudeValue: 0.0,
    longitudeValue: 0.0,
    latitudeDeltaValue: 0.0,
    longitudeDeltaValue: 0.0,
  };

  componentWillMount = async () => {
    this.setState({
      item: this.props.navigation.state.params.item,
    });

    const { item } = this.props.navigation.state.params;
    let endereco = '';

    if (item.emitente.uf === 'RS') {
      endereco = item.emitente.endereco;
    } else if (item.emitente.uf === 'PE') {
      endereco = `${item.emitente.endereco}, ${item.emitente.cep}`;
    }

    Geocoder.from(endereco)
      .then(json => {
        const { width, height } = Dimensions.get('window');
        const ASPECT_RATIO = width / height;
        const latitude = parseFloat(json.results[0].geometry.location.lat);
        const longitude = parseFloat(json.results[0].geometry.location.lng);
        const northeastLat = parseFloat(
          json.results[0].geometry.viewport.northeast.lat
        );
        const southwestLat = parseFloat(
          json.results[0].geometry.viewport.southwest.lat
        );
        const latitudeDelta = parseFloat(northeastLat - southwestLat);
        const longitudeDelta = parseFloat(latitudeDelta * ASPECT_RATIO);

        this.setState({
          latitudeValue: latitude,
          longitudeValue: longitude,
          latitudeDeltaValue: latitudeDelta,
          longitudeDeltaValue: longitudeDelta,
          loading: true,
        });

        console.log(json);
      })
      .catch(error => console.log('Erro:', error));
  };

  render() {
    const {
      latitudeValue,
      longitudeValue,
      latitudeDeltaValue,
      longitudeDeltaValue,
      loading,
      item,
    } = this.state;

    return (
      <View style={styles.MainContainer}>
        {loading ? (
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: latitudeValue,
              longitude: longitudeValue,
              latitudeDelta: latitudeDeltaValue,
              longitudeDelta: longitudeDeltaValue,
            }}
          >
            <Marker
              coordinate={{
                latitude: latitudeValue,
                longitude: longitudeValue,
              }}
              title={`${item.emitente.nome_fantasia}`}
              description={`${item.emitente.endereco}, ${item.emitente.cep}`}
            />
          </MapView>
        ) : (
          <View>
            <Text>Caregando</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Location;

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
