import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  DataInfo,
  Title,
  Info,
  InfoText,
  SubscribeButton,
} from './styles';

export default function Meetup({ data, loading, subscribed, onPress }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.datetime), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.datetime]);

  return (
    <Container>
      <Banner
        source={{
          uri: data.banner.url,
        }}
      />
      <DataInfo>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" size={20} color="#999" />
          <InfoText>{dateParsed}</InfoText>
        </Info>
        <Info>
          <Icon name="place" size={20} color="#999" />
          <InfoText>{data.location}</InfoText>
        </Info>
        <Info>
          <Icon name="person" size={20} color="#999" />
          <InfoText>Organizador: {data.organizer.name}</InfoText>
        </Info>
        <SubscribeButton onPress={onPress} loading={loading}>
          {subscribed ? 'Cancelar Inscrição' : 'Realizar Inscrição'}
        </SubscribeButton>
      </DataInfo>
    </Container>
  );
}
