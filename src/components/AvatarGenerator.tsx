import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { Button } from '../styles/button';
import { buildOpts, renderIcon } from '../utils/iconUtils';
import { IconOpts } from '../@types/types';
import DownloadButton from './DownloadButton';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  justify-content: flex-start;
  padding: 20px;
  width: 100%;
`;

const CanvasContainer = styled.div`
  align-items: center;
  border: none;
  display: flex;
  height: 256px;
  justify-content: center;
  margin: 20px;
  width: 256px;
`;

const Canvas = styled.canvas`
  border-radius: 6px;
  border: 1px solid black;
  height: 256px;
  width: 256px;
`;

const DownloadButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const AvatarGenerator: React.FC = () => {
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAvatar = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const opts: IconOpts = {
        size: 256,
        seed: Math.floor(Math.random() * Math.pow(10, 16)).toString(16),
      };
      renderIcon(buildOpts(opts), canvas);
      setCanvasUrl(canvas.toDataURL());
    }
  }, []);

  useEffect(() => {
    generateAvatar();
  }, [generateAvatar]);

  return (
    <Container>
      <Button onClick={generateAvatar}>Generate Avatar</Button>
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
      {canvasUrl && (
        <DownloadButtonWrapper>
          <DownloadButton canvasRef={canvasRef} format="png" />
          <DownloadButton canvasRef={canvasRef} format="jpg" />
        </DownloadButtonWrapper>
      )}
    </Container>
  );
};
