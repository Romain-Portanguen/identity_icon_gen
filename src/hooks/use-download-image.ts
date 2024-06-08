import { useCallback } from 'react';

export const useDownloadImage = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const downloadImage = useCallback((format: 'png' | 'jpg') => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `avatar.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    }
  }, [canvasRef]);

  return downloadImage;
};
