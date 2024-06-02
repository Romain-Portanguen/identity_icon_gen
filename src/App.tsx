import React, { useState } from 'react';
import styled from 'styled-components';
import { AvatarGenerator } from './components/AvatarGenerator';
import { SvgCodeViewer } from './components/SVGViewer';

const AppContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const AppTitle = styled.h1`
  background-color: #007bff;
  border-radius: 6px;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 20px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 50%;
`;

const Footer = styled.div`
  margin-top: 20px;
  padding: 20px;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    text-align: center;
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
