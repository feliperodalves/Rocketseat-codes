import styled from 'styled-components/native';

export const Header = styled.View`
  height: 64px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateSwitch = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 30px 0 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const ListLoading = styled.Text`
  font-size: 30px;
  color: #fff;
  align-self: center;
`;
