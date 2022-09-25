import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

const [address, setAddress] = useState('');
const [geolocation, setGeolocation] = useState('');
const [location, setLocation] = useState(null);
const [coordinates, setCoordinates] = useState(null);

useEffect(() => {
  (async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('No permission to get location')
    return;
  }

  let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  setLocation({ latitude: `${coords.latitude}`, longitude: `${coords.longitude}`, latitudeDelta: 0.0322, longitudeDelta: 0.0221 });
  console.log('Location', location)
  setCoordinates({ latitude: `${coords.latitude}`, longitude: `${coords.longitude}`, title: 'Current location' });
})();
 }, []);

//change geolocation to location and coordinates when the original location works
const findAddress = () => {
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=r0vb5J2B0gkhcNQ7YyQfNAk8fKMqFBsa&location=${address}`)
  .then(response => response.json())
  .then(responseJson => responseJson.results[0].locations[0].latLng)
  console.log(responseJson)
  setGeolocation({ latitude: `${responseJson.lat}`, longitude: `${responseJson.lng}` })
  console.log(geolocation)

  .catch(error => {
    Alert.alert('Error', error);
  });
}

  return (

    <View style={styles.container}>

      <MapView
        style={ styles.map }
        region={ location }
      >

      <Marker
        followUserLocation={ true }
        coordinate={ coordinates }
      />
      </MapView>
    
      <View>
        <TextInput
          style={ styles.input }
          keyboardType='default'
          onChangeText={ text => setAddress(text) }
          value={ address }
        />
      </View>

      <View style={ styles.button }>
        <Button title='SHOW'
          onPress={ findAddress } />
      </View>
    
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200
  },
  input : {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 3,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button : {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '20%',
    height: 40
  },
  text : {
    color: 'black',
    fontSize: 20,
    marginBottom: 4,
  },
  map: {
    flex: 1,
    width: '80%',
    height: '95%'
  }
});
