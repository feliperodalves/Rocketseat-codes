import styled from 'styled-components';
import { darken } from 'polished';

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 940px;
  margin: 50px auto;

  color: #fff;
  font-size: 30px;
  font-weight: bold;
`;

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    > div {
      display: flex;
      flex-direction: row;
    }

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    button {
      margin: 5px 0 0;
      padding: 0 20px;
      height: 44px;
      align-self: flex-end;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      margin-left: 15px;
      transition: background 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 10px;
      }
      &.edit {
        background: #4dbaf9;

        &:hover {
          background: ${darken(0.05, '#4DBAF9')};
        }
      }
      &.cancel {
        background: #f94d6a;

        &:hover {
          background: ${darken(0.05, '#f94d6a')};
        }
      }
    }
  }
`;

export const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 25px;
  }

  > p {
    white-space: pre-line;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    margin-bottom: 30px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgba(255, 255, 255, 0.7);

    p {
      margin-right: 30px;
      font-size: 16px;
    }
    svg {
      margin-right: 10px;
    }
  }
`;
