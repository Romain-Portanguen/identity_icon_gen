import React from 'react';
import styled from 'styled-components';
import { AvatarGenerator } from './components/AvatarGenerator';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  width: 100vw;
`;

const Title = styled.h1`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 20px;
  margin-top: 0;
`;

const App: React.FC = () => (
  <Container>
    <Title>Identity icon generator</Title>
    <AvatarGenerator />
  </Container>
);

export default App;
