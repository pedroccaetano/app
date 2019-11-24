import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';

import colors from '~/styles/colors';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import Geocoder from 'react-native-geocoding';
Geocoder.init(''); // use a valid API key

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

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

  componentDidMount = async () => {
    this.setState({
      item: this.props.navigation.state.params.item,
    });
  };

  componentWillMount = async () => {
    const { item } = this.state;
    let endereco = '';

    if (item.emitente.uf === 'RS') {
      endereco = item.emitente.endereco;
    } else if (item.emitente.uf === 'PE') {
      endereco = `${item.emitente.endereco}, ${item.emitente.cep}`;
    }

    await Geocoder.from(endereco)
      .then(json => {
        const latitude = json.results[0].geometry.location.lat;
        const longitude = json.results[0].geometry.location.lng;
        const northeastLat = json.results[0].geometry.viewport.northeast.lat;
        const southwestLat = json.results[0].geometry.viewport.southwest.lat;
        const latitudeDelta = northeastLat - southwestLat;
        const longitudeDelta = latitudeDelta * ASPECT_RATIO;

        this.setState({
          latitudeValue: latitude,
          longitudeValue: longitude,
          latitudeDeltaValue: latitudeDelta,
          longitudeDeltaValue: longitudeDelta,
          loading: true,
        });
      })
      .catch(error => {
        this.refs.toast.show(error);
      });
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
              title={item.emitente.nome_fantasia}
              description={`${item.emitente.endereco}, ${item.emitente.cep}`}
            />
          </MapView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={colors.primary} size="large" />
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
