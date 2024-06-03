import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const TooltipBox = styled.div<{ isVisible: boolean }>`
  background-color: #000;
  border-radius: 6px;
  left: 76px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  padding: 10px;
  position: absolute;
  top: 60px;
  transform: translateX(-50%);
  transition: opacity 0.3s;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  white-space: nowrap;
  z-index: 10;

  &::after {
    border: solid;
    border-color: #000 transparent;
    border-width: 6px 6px 0 6px;
    content: '';
    left: 50%;
    position: absolute;
    top: -5px;
    transform: translateX(-50%) rotate(180deg);
  }
`;

const TooltipText = styled.span`
  color: #fff;
  font-size: 12px;
`;

interface TooltipProps {
  children: React.ReactNode;
  message: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const showTooltip = useCallback(() => {
    setIsVisible(true);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipWrapper onClick={showTooltip}>
      {children}
      <TooltipBox isVisible={isVisible}>
        <TooltipText>{message}</TooltipText>
      </TooltipBox>
    </TooltipWrapper>
  );
};
