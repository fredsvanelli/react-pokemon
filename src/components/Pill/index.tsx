import { memo } from 'react';

import { PillContainer } from './style';

interface IPillProps {
  label: string;
  size?: 'sm' | 'md';
  theme?: 'light' | 'dark';
}

const Pill: React.FC<IPillProps> = ({
  label,
  size = 'md',
  theme = 'light',
}) => (
  <PillContainer size={size} theme={theme}>
    {label}
  </PillContainer>
);

export default memo(Pill);
