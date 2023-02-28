import { memo } from 'react';

import Wrapper from 'components/Wrapper';

import { AnimationContainer } from './style';

interface IPokemonLoader {
  color?: string;
}

const PokemonLoader: React.FC<IPokemonLoader> = ({ color = 'white' }) => (
  <Wrapper>
    <AnimationContainer color={color} />
  </Wrapper>
);

export default memo(PokemonLoader);
