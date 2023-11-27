import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function App() {

  const [inputValue, setInputValue] = useState('');
  const [myAddress, setMyAddress] = useState('');
  const [prossing, setProssing] = useState(false);

  async function getAddress() {
    if (inputValue.length !== 8) {
      alert('Error: "Minimum 8 digits!"');
      setMyAddress('');
      return;
    }

    try {
      setProssing(true);
      const { data } = await axios.get(`https://viacep.com.br/ws/${inputValue}/json/`);
      setProssing(false);

      if (data.erro) {
        alert('Error: "CEP Invalid!"');
        setMyAddress('');
        return;
      }

      setMyAddress(`${data.localidade}-${data.uf}`);
    } catch (error) {
      console.log(error);
      setMyAddress('');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Search address ViaCep</Text>
        <Text style={styles.label}>Type your CEP</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={getAddress}
        >
          {!prossing ?
            <Text style={styles.searchButtonText}>Search</Text>
            :
            <ActivityIndicator color={'purple'} size={'large'} animating={prossing} />
          }
        </TouchableOpacity>
        {myAddress.length !== 0 && <Text style={styles.myAddress}>Your adress is: {myAddress}</Text>}
      </View>

    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    padding: 30,
    borderRadius: 30,
    backgroundColor: 'purple',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    padding: 5,
    fontSize: 18,
    backgroundColor: '#ffffff',
  },
  searchButton: {
    width: 90,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'darkorange',
    borderRadius: 10,
  },
  searchButtonText: {
    fontWeight: 'bold',
  },
  myAddress: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
  },
});