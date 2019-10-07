import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#444',
    borderRadius: 2,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    height: 42,
    alignSelf: 'stretch',
    backgroundColor: '#f05a5b',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(
      `spots/${id}/booking`,
      {
        date,
      },
      {
        headers: {
          user_id,
        },
      }
    );

    Alert.alert('Solicitação de Reserva Enviada!');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cancelButton, styles.button]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
