import {
  FaGithub,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';
import { ProfileData } from './@types/profile-data';
import { formatDate } from './format-date';

const defaultValues: ProfileData = {
  bio: 'Software Engineer',
  company: 'GitHub',
  created_at: '2021-01-01T00:00:00Z',
  followers: 1675,
  following: 150,
  location: 'San Francisco, CA',
  login: 'John-Doe',
  name: 'John Doe',
};

export const getUserInfos = (profileData: ProfileData | null) => [
  {
    followersSectionIcon: <FaGithub />,
    followersSectionContent: profileData ?
      `${profileData.followers} followers · ${profileData.following} following` :
      `${defaultValues.followers} followers · ${defaultValues.following} following`,
  },
  {
    companySectionIcon: <FaBuilding />,
    companySectionContent: profileData?.company || defaultValues.company,
  },
  {
    locationSectionIcon: <FaMapMarkerAlt />,
    locationSectionContent: profileData?.location || defaultValues.location,
  },
  {
    joinedSectionIcon: <FaClock />,
    joinedSectionContent: profileData ?
      `Joined ${formatDate(profileData.created_at)}` :
      `Joined ${formatDate(defaultValues.created_at)}`,
  },
  {
    nameSectionContent: profileData?.name || defaultValues.name,
  },
  {
    loginSectionContent: profileData?.login || defaultValues.login,
  },
  {
    bioSectionContent: profileData?.bio || defaultValues.bio,
  },
];
