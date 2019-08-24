import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    > button {
      margin: 5px 0 0;
      padding: 0 20px;
      height: 44px;
      align-self: flex-end;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 10px;
      }

      &:hover {
        background: ${darken(0.05, '#F94D6A')};
      }
    }
  }
`;

export const List = styled.ul`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  li {
    padding: 0 0 0 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 62px;

    strong {
      font-size: 18px;
      line-height: 21px;
      font-weight: bold;
      color: #fff;
      margin: auto 30px;
    }

    div {
      margin: auto 30px;

      p {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.6);
        margin-right: 20px;
      }
    }
  }
`;
