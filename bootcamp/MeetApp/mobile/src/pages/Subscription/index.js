import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Meetup from '~/components/Meetup';
import logo from '~/assets/logo.png';
import { Container, Header, List } from './styles';
import Background from '~/components/Background';

function Subscription({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get('/subscriptions');
    if (!response) {
      return;
    }
    setSubscriptions(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    await api.delete(`/subscriptions/${id}`);
    loadSubscriptions();
  }

  return (
    <Background>
      <Header>
        <Image source={logo} style={{ width: 23, height: 24 }} />
      </Header>
      <Container>
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item.meetup}
              subscribed
              onPress={() => handleCancel(item.meetup.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
