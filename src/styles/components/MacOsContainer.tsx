import React, { useMemo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #2d2d2d;
  border-radius: 6px;
  box-shadow: 0 0 10px #007bff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 465px;
  max-width: 400px;
  padding: 20px;
  width: 100%;

  @media (min-width: 768px) {
    min-width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 5px;
`;

const HeaderButton = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  height: 12px;
  margin-right: 6px;
  width: 12px;
`;

interface MacOsContainerProps {
  children: React.ReactNode;
}

export const MacOsContainer: React.FC<MacOsContainerProps> = ({ children }) => {

  const macOsButtons = useMemo(
    () => (
      <Header>
        <HeaderButton color="#ff5f56" />
        <HeaderButton color="#ffbd2e" />
        <HeaderButton color="#27c93f" />
      </Header>
    ),
    []
  );

  return (
    <Container>
      {macOsButtons}
      {children}
    </Container>
  );
}
