import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { subDays, addDays, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import logo from '~/assets/logo.png';
import { Container, Header, DateSwitch, List, ListLoading } from './styles';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Meetup from '~/components/Meetup';

function Dashboard({ isFocused }) {
  const [loadingList, setLoadingList] = useState(true);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const loadMeetups = async () => {
    const response = await api.get('/meetups', {
      params: {
        date: format(date, 'yyyy-MM-dd'),
        page,
      },
    });

    if (!response) {
      setLoading(false);
      setLoadingList(false);
      return;
    }

    setMeetups(
      response.data
        .map(meetup => ({
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.datetime),
            "d 'de' MMMM', às' HH'h'",
            {
              locale: pt,
            }
          ),
          subscribed: meetup.subscription.length > 0,
        }))
        .filter(meetup => !meetup.past)
    );
    setPage(page + 1);
    setLoading(false);
    setLoadingList(false);
  };

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isFocused, refresh]);

  async function handleSubmit(id, subscribed) {
    setLoading(true);
    if (subscribed) {
      await api.delete(`/subscriptions/${id}`);
    } else {
      await api.post(`/subscriptions/${id}`);
    }
    setRefresh(!refresh);
  }

  return (
    <Background>
      <Header>
        <Image source={logo} style={{ width: 23, height: 24 }} />
      </Header>
      <Container>
        <DateSwitch>
          <TouchableOpacity
            onPress={() => {
              setLoadingList(true);
              setDate(subDays(date, 1));
            }}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <DateInput date={date} onChange={setDate} />
          <TouchableOpacity
            onPress={() => {
              setLoadingList(true);
              setDate(addDays(date, 1));
            }}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateSwitch>
        {loadingList && meetups ? (
          <ListLoading>
            {meetups ? 'Carregando ...' : 'Nenhum Meetup cadastrado hoje :('}
          </ListLoading>
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                subscribed={item.subscribed}
                loading={loading}
                onPress={() => {
                  handleSubmit(item.id, item.subscribed);
                }}
              />
            )}
            onEndReached={loadMeetups()}
            onEndReachedThreshold={0.1}
          />
        )}
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

export default withNavigationFocus(Dashboard);
