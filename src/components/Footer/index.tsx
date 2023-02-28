import { memo } from 'react';

import PokemonLogo from 'assets/pokemon-logo.png';

const Footer: React.FC = () => (
  <footer className="text-center p-5 my-5">
    <img className="img-fluid" src={PokemonLogo} alt="Pokémon" />
  </footer>
);

export default memo(Footer);
