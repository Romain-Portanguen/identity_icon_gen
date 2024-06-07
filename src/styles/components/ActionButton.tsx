import styled from 'styled-components';

export const ActionButton = styled.button`
  background: linear-gradient(to top, #3c99dc, #66ccff);
  border-radius: 6px;
  border: none;
  color: #fff;
  font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transform: scale(1.05);
  }

  &:active {
    background: linear-gradient(to top, #3380b3, #66ccff);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.5);
    outline: none;
  }
`;
