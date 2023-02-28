import { memo } from 'react';

import { FiChevronLeft } from 'react-icons/fi';
import { PokemonType } from 'Types/PokemonType';

import FavoriteButton from 'components/FavoriteButton';

import { Button } from './style';

interface IMobileHeaderProps {
  pokemon: PokemonType;
  onBack: () => void;
}

const MobileHeader: React.FC<IMobileHeaderProps> = ({ pokemon, onBack }) => (
  <header className="py-5 d-flex justify-content-between">
    <Button type="button" color={pokemon.color} onClick={onBack}>
      <FiChevronLeft size={30} />
    </Button>
    <FavoriteButton pokemon={pokemon} />
  </header>
);

export default memo(MobileHeader);
