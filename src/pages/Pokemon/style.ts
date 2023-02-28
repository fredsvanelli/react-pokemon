import styled from 'styled-components';

import { BACKGROUND_COLOR_MAP, FOREGROUND_COLOR_MAP } from '../../constants';

interface IPageContainerProps {
  color?: string;
}

export const PageContainer = styled.div<IPageContainerProps>`
  overflow-x: hidden;

  color: ${({ color = 'white' }) =>
    FOREGROUND_COLOR_MAP[color]
      ? FOREGROUND_COLOR_MAP[color]
      : FOREGROUND_COLOR_MAP.default};
  background-color: ${({ color = 'white' }) =>
    BACKGROUND_COLOR_MAP[color]
      ? BACKGROUND_COLOR_MAP[color]
      : BACKGROUND_COLOR_MAP.default};
`;

export const MainTitle = styled.h1`
  font-size: 4.8rem;

  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;

export const Index = styled.span`
  font-size: 1.8rem;
`;
