import React, { useState } from 'react';
import styled from 'styled-components';
import { AvatarGenerator } from './components/AvatarGenerator';
import { SvgCodeViewer } from './components/SVGViewer';

const AppContainer = styled.div`
  align-items: center;
  background-color: #e8e8e8;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-height: 1024px) {
    justify-content: space-between;
  }
  
  @media (min-height: 1180px) {
    justify-content: space-between;
  }
`;

const AppTitle = styled.h1`
  background: linear-gradient(to right, #007bff, #00d2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  background: linear-gradient(to left, #007bff, #00d2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 700;
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
