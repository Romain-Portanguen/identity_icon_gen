import { useState, useEffect } from 'react';

export const useImageUrl = (imageMetadata: string) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageMetadata) {
      const svgBlob = new Blob([imageMetadata], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      setAvatarUrl(url);
    }
  }, [imageMetadata]);

  return avatarUrl;
};
