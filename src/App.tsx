import React, { useState } from 'react';
import styled from 'styled-components';
import { AvatarGenerator } from './components/AvatarGenerator';
import { SvgCodeViewer } from './components/SVGViewer';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const AppContainer = styled.div`
  align-items: center;
  background-size: 600% 600%;
  background: linear-gradient(270deg, #002244, #004466);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  overflow: hidden;
  padding: 20px;
  width: 100%;
`;

const AppTitle = styled.h1`
  background: linear-gradient(to right, #66aacc, #99ccee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 10px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  width: 100%;

  @media (min-width: 600px) {
    font-size: 3.5rem;
    padding: 30px;
  }

  &:hover {
    color: #3399cc;
    transform: scale(1.05);
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
  flex: 1;

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

const Footer = styled.footer`
  background: linear-gradient(to right, #66aacc, #99ccee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
  max-width: 800px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  width: 100%;
  
  p {
    font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    text-align: center;
    margin: 0;

    @media (min-width: 600px) {
      font-size: 16px;
    }
  }

  a {
    background: linear-gradient(to top, #3399cc, #66ccff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #3399cc;
    text-decoration: none;
    margin: 0 10px;

    &:hover {
      background: linear-gradient(to bottom, #3399cc, #66ccff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    margin: 0 10px;
    font-size: 24px;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #66aacc;
      cursor: pointer;
      transform: scale(1.2);
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
          Made by Romain Portanguen - Software Engineer
        </p>
        <IconWrapper>
          <a href="https://github.com/Romain-Portanguen" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ṛomain-portangueṇ" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </IconWrapper>
      </Footer>
    </AppContainer>
  );
};

export default App;
