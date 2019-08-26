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

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    .react-datepicker__input-container {
      width: 100%;
    }

    input,
    textarea {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      height: 200px;
      resize: none;
      padding: 15px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
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
