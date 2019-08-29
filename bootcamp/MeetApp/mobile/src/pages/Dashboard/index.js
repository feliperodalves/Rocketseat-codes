import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { subDays, addDays } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/logo.png';
import { Container, Header, DateSwitch } from './styles';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <Background>
      <Header>
        <Image source={logo} style={{ width: 23, height: 24 }} />
      </Header>
      <Container>
        <DateSwitch>
          <TouchableOpacity
            onPress={() => {
              setDate(subDays(date, 1));
            }}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <DateInput date={date} onChange={setDate} />
          <TouchableOpacity
            onPress={() => {
              setDate(addDays(date, 1));
            }}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateSwitch>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
