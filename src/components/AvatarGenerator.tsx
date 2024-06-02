import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { Button } from '../styles/button';
import { buildOpts, renderIcon } from '../utils/iconUtils';
import { IconOpts } from '../@types/types';
import DownloadButton from './DownloadButton';

const Container = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 100%;
  }
`;

const CanvasContainer = styled.div`
  align-items: center;
  border-radius: 6px;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
  display: flex;
  height: auto;
  justify-content: center;
  margin: 20px;
  max-width: 256px;
  width: 100%;

  @media (min-width: 768px) {
    height: 256px;
  }
`;

const Canvas = styled.canvas`
  border-radius: 4px;
  height: 100%;
  max-height: 256px;
  max-width: 256px;
  width: 100%;
`;

const DownloadButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

interface AvatarGeneratorProps {
  setSvgCode: (svgCode: string) => void;
}

export const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ setSvgCode }) => {
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

        const encodedSvgCode = btoa(svgCode);
        const decodedSvgCode = atob(encodedSvgCode);

        setSvgCode(decodedSvgCode.trim());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {canvasUrl ? (
        <DownloadButtonWrapper>
          <DownloadButton canvasRef={canvasRef} format="png" />
          <DownloadButton canvasRef={canvasRef} format="jpg" />
        </DownloadButtonWrapper>
      ) : null}
    </Container>
  );
};
