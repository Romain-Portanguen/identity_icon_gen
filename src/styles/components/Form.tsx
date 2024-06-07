import styled from 'styled-components';

export const FormContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 15px;

  @media (max-width: 768px) {
    margin: 10px;
  }
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  background: #2d2d2d;
  border-radius: 4px;
  border: 1px solid #009bff;
  color: #c9d1d9;
  font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  margin: 10px 0;
  padding: 8px 16px;
  width: 700px;

  @media (max-width: 1024px) {
    width: 500px;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
  }

  &:focus {
    border-color: #66aacc;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(to top, #3399cc, #66ccff);
  border-radius: 4px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  padding: 8px 16px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 91, 187, 0.5);
  }

  &:active {
    background-color: #003bb3;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.5);
    outline: none;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
  }
`;
