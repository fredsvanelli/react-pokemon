import styled from 'styled-components';

import { FOREGROUND_COLOR_MAP } from '../../constants';

export const HeaderContainer = styled.header`
  background-color: #494949;
  height: 150px;
  border-radius: 0 0 50px 50px;
`;

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
