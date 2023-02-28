import styled from 'styled-components';

import { BACKGROUND_COLOR_MAP, FOREGROUND_COLOR_MAP } from '../../constants';

interface ICardProps {
  color: string;
}

export const Card = styled.div<ICardProps>`
  width: 100%;
  border-radius: 2rem;
  padding: 3rem;
  color: ${({ color }) =>
    FOREGROUND_COLOR_MAP[color]
      ? FOREGROUND_COLOR_MAP[color]
      : FOREGROUND_COLOR_MAP.default};
  background-color: ${({ color }) =>
    BACKGROUND_COLOR_MAP[color]
      ? BACKGROUND_COLOR_MAP[color]
      : BACKGROUND_COLOR_MAP.default};

  transition: transform 300ms;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px #3332;
    z-index: 1;
  }

  @media (max-width: 767px) {
    padding: 1em;
  }
`;

export const Index = styled.span`
  font-size: 3em;
  font-weight: bold;
  opacity: 0.3;
  line-height: 1;

  @media (max-width: 767px) {
    font-size: 1.4em;
  }

  @media (max-width: 575px) {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 1.2em;
  }
`;
