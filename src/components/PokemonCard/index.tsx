import { memo, useCallback, useEffect, useState } from 'react';

import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PokemonType } from 'Types/PokemonType';

import { getPokemonImage } from 'context/PokemonContext/helpers';

import Pill from 'components/Pill';

import { capitalizeWord, unslugify } from 'helpers';

import { Card, Index } from './style';

interface IPokemonCardProps {
  pokemon: PokemonType;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  const handleLoadImage = useCallback(async () => {
    const image = await getPokemonImage(pokemon.id);
    setPokemonImage(image);
  }, [pokemon.id]);

  useEffect(() => {
    handleLoadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.id]);

  return (
    <Card
      className="d-flex flex-column position-relative"
      color={pokemon.color}
    >
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
          {pokemonImage && (
            <div className="flex-grow-1">
              <img
                className="img-fluid"
                src={pokemonImage}
                alt={pokemon.name}
              />
            </div>
          )}
        </Link>
      </div>
    </Card>
  );
};

export default memo(PokemonCard);
