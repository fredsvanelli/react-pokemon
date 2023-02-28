import styled from 'styled-components';

import { FOREGROUND_COLOR_MAP } from '../../constants';

interface IButtonProps {
  color: string;
}

export const Button = styled.button<IButtonProps>`
  border: none;
  background-color: transparent;
  padding: 0;
  color: ${({ color }) =>
    FOREGROUND_COLOR_MAP[color]
      ? FOREGROUND_COLOR_MAP[color]
      : FOREGROUND_COLOR_MAP.default};
`;
