import { memo } from 'react';

import { Animation, Pokeball } from './style';

const PokeballLoader: React.FC = () => (
  <Animation>
    <Pokeball />
  </Animation>
);

export default memo(PokeballLoader);
