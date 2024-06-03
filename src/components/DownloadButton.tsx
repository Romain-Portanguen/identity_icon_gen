import React from 'react';
import { Button } from '../styles/components/ActionButton';

interface DownloadButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  format: 'png' | 'jpg';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ canvasRef, format }) => {
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `avatar.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    }
  };

  return <Button onClick={downloadImage}>Download as {format.toUpperCase()}</Button>;
};

export default DownloadButton;
