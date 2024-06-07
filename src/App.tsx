import React, { useState } from 'react';
import styled from 'styled-components';
import { AvatarGenerator } from './components/AvatarGenerator';
import { ProfilePreview } from './components/ProfilePreview';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FormContainer, Form, Input, SubmitButton } from './styles/components/Form';
import { ProfileData } from './utils/@types/profile-data';
import { fetchGithubProfile } from './utils/fetch-github-profile';

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
  width: 100%;

  @media (max-width: 600px) {
    padding: 20px;
  }

  @media (min-width: 600px) {
    padding: 30px;
  }
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
  padding-top: 10px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  width: 100%;

  @media (min-width: 600px) {
    font-size: 2.9rem;
  }

  &:hover {
    color: #3399cc;
    transform: scale(1.05);
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  justify-content: center;
  margin: 20px 0;
  max-width: 800px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 20px;
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
  align-items: center;
  background: linear-gradient(to right, #66aacc, #99ccee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 700;
  gap: 10px;
  justify-content: center;
  max-width: 800px;
  padding-top: 10px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  width: 100%;
  
  p {
    font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    margin: 0;
    text-align: center;
  }

  a {
    background: linear-gradient(to top, #3399cc, #66ccff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #3399cc;
    text-decoration: none;

    &:hover {
      background: linear-gradient(to bottom, #3399cc, #66ccff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  a {
    font-size: 20px;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #66aacc;
      cursor: pointer;
      transform: scale(1.2);
    }
  }
`;

const App: React.FC = () => {
  const [imageMetadata, setImageMetadata] = useState<string>('');
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await fetchGithubProfile(githubUrl);
    setProfileData(data);
  };

  return (
    <AppContainer>
      <AppTitle>IIG - Identity Icon Generator</AppTitle>
      <Row>
        <FormContainer>
          <Form onSubmit={handleFormSubmit}>
            <Input
              type="text"
              placeholder="Enter your GitHub profile URL"
              value={githubUrl}
              onChange={handleInputChange}
            />
            <SubmitButton type="submit">Fetch Profile</SubmitButton>
          </Form>
        </FormContainer>
      </Row>
      <ContentContainer>
        <Column>
          <AvatarGenerator setImageMetadata={setImageMetadata} />
        </Column>
        <Column>
          <ProfilePreview imageMetadata={imageMetadata} profileData={profileData} />
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
          <a href="https://www.linkedin.com/in/romain-portanguen" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </IconWrapper>
      </Footer>
    </AppContainer>
  );
};

export default App;
