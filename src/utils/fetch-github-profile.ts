import { ProfileData } from './@types/profile-data';

export const fetchGithubProfile = async (url: string): Promise<ProfileData | null> => {
  try {
    const username = url.split('/').pop();
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    const data: ProfileData = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch GitHub profile:', error);
    return null;
  }
};
