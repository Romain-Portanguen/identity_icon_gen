import styled from 'styled-components';

export const Button = styled.button`
  background: linear-gradient(to bottom, #007bff, #00d2ff);
  border-radius: 4px;
  border: none;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  padding: 8px 16px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 91, 187, 0.5);
    cursor: pointer;
  }

  &:active {
    background-color: #003bb3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.5);
  }
`;
