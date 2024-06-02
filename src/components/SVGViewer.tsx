import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button } from '../styles/button';

const SvgCodeContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  padding: 20px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const CodeBlock = styled.code`
  background-color: #000;
  border-radius: 4px;
  box-sizing: border-box;
  color: #fff;
  font-family: 'Menlo', monospace;
  font-size: 14px;
  max-height: 258px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  text-align: left;
  white-space: pre-wrap;
  width: 100%;
  word-wrap: break-word;

  @media (min-width: 768px) {
    width: 95%;
  }
`;

const DownloadButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

interface SvgCodeViewerProps {
  svgCode: string;
}

export const SvgCodeViewer: React.FC<SvgCodeViewerProps> = ({ svgCode }) => {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(svgCode)
  }, [svgCode]);

  return (
    <>
      {svgCode ? (
        <SvgCodeContainer>
          <Title>Code svg generated</Title>
          <CodeBlock>{svgCode}</CodeBlock>
          <DownloadButtonWrapper>
            <Button onClick={copyToClipboard}>Copy SVG Code</Button>
          </DownloadButtonWrapper>
        </SvgCodeContainer>
      ) : null}
    </>
  );
};
