import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Tooltip } from '../styles/components/Tooltip';
import { Button } from '../styles/components/ActionButton';

const TerminalContainer = styled.div`
background-color: #2d2d2d;
border-radius: 6px;
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

const TerminalHeader = styled.div`
  align-items: center;
  display: flex;
  height: 20px;
  justify-content: flex-start;
  padding: 5px;
`;

const TerminalButton = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  height: 12px;
  margin-right: 6px;
  width: 12px;
`;

const CodeBlock = styled.pre`
  background-color: #2d2d2d;
  border-radius: 4px;
  box-sizing: border-box;
  color: #f8f8f2;
  font-family: 'Menlo', monospace;
  font-size: 14px;
  max-height: 272px;
  overflow-x: auto;
  overflow-y: auto;
  padding: 10px;
  text-align: left;
  white-space: pre-wrap;
  width: 100%;
  word-wrap: break-word;
`;

const CopyButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

interface SvgCodeViewerProps {
  svgCode: string;
}

export const SvgCodeViewer: React.FC<SvgCodeViewerProps> = ({ svgCode }) => {

  const TerminalButtons = useMemo(() => (
    <TerminalHeader>
      <TerminalButton color="#ff5f56" />
      <TerminalButton color="#ffbd2e" />
      <TerminalButton color="#27c93f" />
    </TerminalHeader>
  ), []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(svgCode);
  }, [svgCode]);

  return (
    <TerminalContainer>
      {TerminalButtons}
      <CodeBlock>{svgCode}</CodeBlock>
      <CopyButtonWrapper>
        <Tooltip message="Copied to clipboard!">
          <Button onClick={copyToClipboard}>Copy SVG Code</Button>
        </Tooltip>
      </CopyButtonWrapper>
    </TerminalContainer>
  );
};
