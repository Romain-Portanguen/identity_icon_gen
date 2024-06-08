import React from 'react';
import styled from 'styled-components';
import { MacOsContainer } from '../styles/components/MacOsContainer';
import { ProfileData } from '../utils/@types/profile-data';
import { getUserInfos } from '../utils/profile-utils';
import { useImageUrl } from '../hooks/use-image-url';
import { UserData } from './UserData';

const ProfileHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  border: 1px solid #007acc;
  box-shadow: 0 0 10px #005bb5;
  height: 170px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  width: 170px;
`;

const Avatar = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const ProfileInfo = styled.div`
  color: #e6e6e6;
  font-size: 14px;
`;

const Username = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0 0 0;
`;

const Bio = styled.p`
  color: #b0b0b0;
  font-size: 14px;
  margin: 5px 0;
`;

const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Loader = styled.div`
  animation: spin 1s linear infinite;
  border-radius: 50%;
  border-top: 6px solid #3399cc;
  border: 4px solid rgba(255, 255, 255, 0.2);
  height: 60px;
  width: 60px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface ProfilePreviewProps {
  isDataLoading: boolean;
  imageMetadata: string;
  profileData: ProfileData | null;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({ isDataLoading, imageMetadata, profileData }) => {
  const avatarUrl = useImageUrl(imageMetadata);
  const userInfos = getUserInfos(profileData);

  if (isDataLoading) {
    return (
      <MacOsContainer>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </MacOsContainer>
    );
  }

  return (
    <MacOsContainer>
      <ProfileHeader>
        <AvatarWrapper>
          {avatarUrl ? <Avatar src={avatarUrl} alt="Generated Avatar" /> : null}
        </AvatarWrapper>
        <Username>{userInfos[4].nameSectionContent}</Username>
        <ProfileInfo>{userInfos[5].loginSectionContent}</ProfileInfo>
        <Bio>{userInfos[6].bioSectionContent}</Bio>
      </ProfileHeader>
      <UserData infos={userInfos} />
    </MacOsContainer>
  );
};
