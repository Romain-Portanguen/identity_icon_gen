import React, { useState } from 'react';
import styled from 'styled-components';
import { AvatarGenerator } from './components/AvatarGenerator';
import { SvgCodeViewer } from './components/SVGViewer';

const AppContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;

  @media (min-height: 1024px) {
    align-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
  }
  
  @media (min-height: 1180px) {
    align-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
  }
  
`;

const AppTitle = styled.h1`
  background-color: #007bff;
  border-radius: 6px;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0 10px;
  max-width: 800px;
  padding: 10px;
  text-align: center;
  width: 100%;

  @media (min-width: 600px) {
    font-size: 32px;
    padding: 20px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  margin: 20px 0;
  max-width: 800px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 20px;
  }

  @media (min-width: 400px) {
    align-items: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;

  @media (min-width: 768px) {
    max-width: 50%;
  }
`;

const Footer = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  max-width: 800px;
  padding: 20px;
  width: 100%;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    text-align: center;

    @media (min-width: 600px) {
      font-size: 16px;
    }
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const App: React.FC = () => {
  const [svgCode, setSvgCode] = useState<string>('');

  return (
    <AppContainer>
      <AppTitle>IIG - Identity Icon Generator</AppTitle>
      <ContentContainer>
        <Column>
          <AvatarGenerator setSvgCode={setSvgCode} />
        </Column>
        <Column>
          <SvgCodeViewer svgCode={svgCode} />
        </Column>
      </ContentContainer>
      <Footer>
        <p>
          Made by{' '}
          <a href="https://github.com/Romain-Portanguen" target="_blank" rel="noreferrer">
            Romain Portanguen - Software Engineer
          </a>
        </p>
      </Footer>
    </AppContainer>
  );
};

export default App;
