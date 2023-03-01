import { memo } from 'react';

import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PokemonType } from 'Types/PokemonType';

import Pill from 'components/Pill';

import { capitalizeWord, unslugify } from 'helpers';

import { Card, Index } from './style';

interface IPokemonCardProps {
  pokemon: PokemonType;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => (
  <Card className="d-flex flex-column position-relative" color={pokemon.color}>
    <div className="d-flex align-items-end mb-3 mb-md-4">
      <h2 className="flex-grow-1 m-0 pe-2">{unslugify(pokemon.name)}</h2>
      <Index>{pokemon.pokedexIndex}</Index>
    </div>
    <div className="d-flex d-lg-block mt-auto">
      <Stack
        className="mb-lg-2 flex-wrap align-items-start align-content-start"
        direction="horizontal"
        gap={2}
      >
        {pokemon.types.map((type) => (
          <Pill label={capitalizeWord(type)} key={type} />
        ))}
      </Stack>
      <Link
        className="stretched-link"
        to={`/${pokemon.name}`}
        state={{ color: pokemon.color }}
      >
        {pokemon.image && (
          <div className="flex-grow-1">
            <img className="img-fluid" src={pokemon.image} alt={pokemon.name} />
          </div>
        )}
      </Link>
    </div>
  </Card>
);

export default memo(PokemonCard);
