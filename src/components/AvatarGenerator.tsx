import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaSync, FaPlay } from 'react-icons/fa';
import { IconUtils } from '../utils/icon-utils';
import { IconOptions, CanvasOptions } from '../utils/@types/icon-utils.requirements';
import { DownloadButton } from './DownloadButton';
import { MacOsContainer } from '../styles/components/MacOsContainer';
import { AVATAR_GENERATION_INTERVAL, AVATAR_GENERATION_TIMEOUT } from '../utils/@types/constants';

const AvatarContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
`;

const CanvasContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
  display: flex;
  justify-content: center;
  margin: 20px auto;
  width: 230px;
`;

const Canvas = styled.canvas`
  border-radius: 4px;
  height: 230px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
`;

const DownloadButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
`;

const IconButton = styled.div`
  align-items: center;
  background: linear-gradient(to top, #3399cc, #66ccff);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 20px;
  height: 40px;
  justify-content: center;
  transition: background-color 0.3s, box-shadow 0.3s;
  width: 40px;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 91, 187, 0.5);
  }

  &:active {
    background-color: #003bb3;
  }
`;

interface AvatarGeneratorProps {
  setImageMetadata: (imageMetadata: string) => void;
}

export const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ setImageMetadata }) => {
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAvatar = useCallback(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const iconOptions: IconOptions = {
        size: 256,
        seed: Math.floor(Math.random() * Math.pow(10, 16)).toString(16),
      };
      const builtOptions: CanvasOptions = IconUtils.buildOptions(iconOptions);
      IconUtils.renderIcon(builtOptions, canvas);
      setCanvasUrl(canvas.toDataURL());

      const context = canvas.getContext('2d');
      const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);

      if (imageData) {
        const svgCode = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <img src="${canvas.toDataURL()}" alt="Identity Icon" />
              </div>
            </foreignObject>
          </svg>
        `;
        setImageMetadata(svgCode.trim());
      }
    }
  }, [setImageMetadata]);

  const handleGenerateMultipleAvatars = useCallback(() => {
    const intervalId = setInterval(generateAvatar, AVATAR_GENERATION_INTERVAL);
    setTimeout(() => clearInterval(intervalId), AVATAR_GENERATION_TIMEOUT);
  }, [generateAvatar]);

  useEffect(() => {
    generateAvatar();
  }, [generateAvatar]);

  return (
    <MacOsContainer>
      <AvatarContentWrapper>
        <CanvasContainer>
          <Canvas ref={canvasRef} />
        </CanvasContainer>
        {canvasUrl && (
          <>
            <ButtonWrapper>
              <IconButton onClick={handleGenerateMultipleAvatars}>
                <FaPlay />
              </IconButton>
              <IconButton onClick={generateAvatar}>
                <FaSync />
              </IconButton>
            </ButtonWrapper>
            <DownloadButtonWrapper>
              <DownloadButton canvasRef={canvasRef} format="png" />
              <DownloadButton canvasRef={canvasRef} format="jpg" />
            </DownloadButtonWrapper>
          </>
        )}
      </AvatarContentWrapper>
    </MacOsContainer>
  );
};
