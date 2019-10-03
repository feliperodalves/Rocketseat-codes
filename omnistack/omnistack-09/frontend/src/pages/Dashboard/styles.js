import styled from 'styled-components';

export const List = styled.ul`
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 30px;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 120px;
    background-size: cover;
    border-radius: 4px;
  }

  strong {
    margin-top: 10px;
    font-size: 24px;
    color: #444;
  }

  span {
    font-size: 15px;
    color: #999;
  }
`;

export const Container = styled.div`
  button {
    border: 0;
    border-radius: 2px;
    width: 100%;
    height: 42px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
    background: #f05a5b;
    color: #fff;

    :hover {
      background: #e14f50;
    }
  }
`;
