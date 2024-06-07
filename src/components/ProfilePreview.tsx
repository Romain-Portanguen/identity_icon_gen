import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { FaGithub, FaBuilding, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MacOsContainer } from '../styles/components/MacOsContainer';
import { ProfileData } from '../utils/@types/profile-data';
import { formatDate } from '../utils/format-date';

const ProfileHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
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
  color: #c9d1d9;
  font-size: 14px;
`;

const Username = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0 0 0;
`;

const Bio = styled.p`
  color: #8b949e;
  font-size: 14px;
  margin: 5px 0;
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 10px 0;
  padding: 0;
  text-align: left;
`;

const InfoItem = styled.li`
  align-items: center;
  color: #8b949e;
  display: flex;
  font-size: 14px;
  margin: 5px 0;

  svg {
    margin-right: 8px;
  }
`;

interface ProfilePreviewProps {
  imageMetadata: string;
  profileData: ProfileData | null;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({ imageMetadata, profileData }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const userInfos = useMemo(() => [
    {
      icon: <FaGithub />,
      text: profileData ? `${profileData.followers} followers · ${profileData.following} following` : '780 followers · 150 following',
    },
    {
      icon: <FaBuilding />,
      text: profileData?.company || 'Awesome Company Inc.',
    },
    {
      icon: <FaMapMarkerAlt />,
      text: profileData?.location || 'Somewhere, Earth',
    },
    {
      icon: <FaClock />,
      text: profileData ? `Joined ${formatDate(profileData.created_at)}` : 'Joined 2021',
    },
  ], [profileData]);

  useEffect(() => {
    if (imageMetadata) {
      const svgBlob = new Blob([imageMetadata], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      setAvatarUrl(url);
    }
  }, [imageMetadata]);

  return (
    <MacOsContainer>
      <ProfileHeader>
        <AvatarWrapper>
          {avatarUrl ? <Avatar src={avatarUrl} alt="Generated Avatar" /> : null}
        </AvatarWrapper>
        <Username>{profileData?.name || 'John Doe'}</Username>
        <ProfileInfo>{profileData?.login || 'John-Doe'}</ProfileInfo>
        <Bio>{profileData?.bio || 'Software engineer'}</Bio>
      </ProfileHeader>
      <InfoList>
        {userInfos.map((info, index) => (
          <InfoItem key={index}>
            {info.icon}
            {info.text}
          </InfoItem>
        ))}
      </InfoList>
    </MacOsContainer>
  );
};
