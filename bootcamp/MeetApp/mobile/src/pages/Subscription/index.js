import React from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/logo.png';
import { Container, Header } from './styles';
import Background from '~/components/Background';

export default function Subscription() {
  return (
    <Background>
      <Header>
        <Image source={logo} style={{ width: 23, height: 24 }} />
      </Header>
      <Container />
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
