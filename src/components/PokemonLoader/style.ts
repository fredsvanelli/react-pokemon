import styled from 'styled-components';

import { BACKGROUND_COLOR_MAP } from '../../constants';

interface IAnimationContainerProps {
  color: string;
}

export const AnimationContainer = styled.div<IAnimationContainerProps>`
  animation: slide-in 0.7s both;
  background-color: ${({ color }) => BACKGROUND_COLOR_MAP[color]};

  @keyframes slide-in {
    0% {
      flex-grow: 0;
    }
    20% {
      flex-grow: 0;
    }
    100% {
      flex-grow: 1;
    }
  }
`;
