import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button } from '../styles/button';

const SvgCodeContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid #009bff;
  box-shadow: 0 0 10px #007bff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`;

const CodeBlock = styled.code`
background-color: #000;
border-radius: 4px;
box-sizing: border-box;
color: #fff;
font-family: 'Menlo', monospace;
font-size: 14px;
max-height: 234px;
overflow-x: hidden;
overflow-y: auto;
padding: 10px;
text-align: left;
white-space: pre-wrap;
width: 95%;
word-wrap: break-word;
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
