import React from 'react';
import styled from 'styled-components';
import { FaSync, FaPlay } from 'react-icons/fa';
import { useAvatarGenerator } from '../hooks/use-avatar-generator';
import { useDownloadImage } from '../hooks/use-download-image';
import { MacOsContainer } from '../styles/components/MacOsContainer';
import { ActionButton } from '../styles/components/ActionButton';

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
  const {
    canvasUrl,
    canvasRef,
    generateAvatar,
    startMultipleAvatarGeneration
  } = useAvatarGenerator(setImageMetadata);

  const downloadImage = useDownloadImage(canvasRef);

  return (
    <MacOsContainer>
      <AvatarContentWrapper>
        <CanvasContainer>
          <Canvas ref={canvasRef} />
        </CanvasContainer>
        {canvasUrl && (
          <>
            <ButtonWrapper>
              <IconButton onClick={startMultipleAvatarGeneration}>
                <FaPlay />
              </IconButton>
              <IconButton onClick={generateAvatar}>
                <FaSync />
              </IconButton>
            </ButtonWrapper>
            <DownloadButtonWrapper>
              <ActionButton onClick={() => downloadImage('png')}>Download PNG</ActionButton>
              <ActionButton onClick={() => downloadImage('jpg')}>Download JPG</ActionButton>
            </DownloadButtonWrapper>
          </>
        )}
      </AvatarContentWrapper>
    </MacOsContainer>
  );
};
