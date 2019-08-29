import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { subDays, addDays, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import logo from '~/assets/logo.png';
import { Container, Header, DateSwitch } from './styles';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups');

      if (!response) {
        return;
      }

      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.datetime),
            "d 'de' MMMM', às' HH'h'",
            {
              locale: pt,
            }
          ),
        }))
      );
    }
    loadMeetups();
  }, []);

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

        {meetups && meetups.map(meetup => <Text>{meetup.title}</Text>)}
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
