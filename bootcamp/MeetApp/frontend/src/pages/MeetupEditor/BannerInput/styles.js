import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  width: 100%;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      height: 300px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: rgba(255, 255, 255, 0.7);

      p {
        margin-top: 10px;
        font-size: 18px;
      }
    }

    img {
      height: 300px;
      width: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    input {
      display: none;
    }
  }
`;
