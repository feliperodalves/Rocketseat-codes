import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.aside`
  background: #202225;
  padding: 20px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Team = styled.button`
  border: 0;
  background: transparent;
  margin: 0 0 8px;

  img {
    transition: all 0.2s;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  &:hover img {
    border-radius: 30%;
  }
`;

export const NewTeam = styled.button`
  transition: all 0.2s;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.3);
  margin: 0 0 8px;
  background: transparent;
  font-weight: bold;

  &:hover {
    border-radius: 30%;
    border: 1px dashed rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const Logout = styled.button`
  transition: all 0.2s;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px dashed #e04848;
  color: #e04848;
  margin: 0 0 8px;
  background: transparent;
  font-weight: bold;

  &:hover {
    border-radius: 30%;
    border: 1px dashed ${darken(0.2, '#e04848')};
    color: ${darken(0.2, '#e04848')};
  }
`;
