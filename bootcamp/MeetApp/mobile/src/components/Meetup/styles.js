import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;

export const DataInfo = styled.View`
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Title = styled.Text`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Info = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const InfoText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
`;

export const SubscribeButton = styled(Button)`
  width: 100%;
`;
