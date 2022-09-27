import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Button, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

const initial = {
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221
};

const [address, setAddress] = useState('');
const [geolocation, setGeolocation] = useState(initial);

useEffect(() => {
  const findLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
    Alert.alert('No permission to get location');
  } else {
    try {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setGeolocation({ ...geolocation, latitude: location.coords.latitude, longitude: location.coords.longitude });
    } catch (error) {
      Alert.alert('Error', error);
    }
  }
}
findLocation();
}, []);

const findAddress = async (address) => {
  try {
    const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=r0vb5J2B0gkhcNQ7YyQfNAk8fKMqFBsa&location=${address}`);
    const data = await response.json();

    const { lat, lng } = data.results[0].location[0].latLng;
    setGeolocation({ ...geolocation, latitude: lat, longitude: lng })
  } catch(error) {
    Alert.alert('Error', error);
  }
  Keyboard.dismiss();
}

  return (

    <View style={ styles.container }>

      <MapView
        style={ styles.map }
        region={ geolocation }
      >

      <Marker
        coordinate={ geolocation }
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
          onPress={ () => findAddress(address) } />
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
    marginBottom: 20
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
    width: '95%',
    height: '95%'
  }
});
