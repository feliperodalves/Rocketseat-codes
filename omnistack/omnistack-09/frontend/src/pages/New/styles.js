import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    color: #444;
    font-weight: bold;
    margin-bottom: 8px;

    span {
      font-weight: normal;
      color: #999;
      font-size: 12px;
    }
  }

  #thumbnail {
    margin-bottom: 20px;
    
    border: ${props => props.thumbnail ? 'none' : '1px dashed #ddd;'}
    background-size: cover;
    cursor: pointer;
    height: 160px;

    display: flex;
    justify-content: center;
    align-items: center;

    input {
      display: none;
    }

    img {
      display: ${props => props.thumbnail ? 'none' : 'normal'}
    }
  }

  > input {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 2px;
    height: 45px;
    padding: 0 15px;
    font-size: 16px;
  }

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
