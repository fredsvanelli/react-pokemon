import { memo, useCallback, useMemo } from 'react';

import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { PokemonType } from 'Types/PokemonType';

import useStoredState from 'hooks/useStoredState';

import { BACKGROUND_COLOR_MAP } from '../../constants';
import { Button } from './style';

interface IFavoriteButtonProps {
  pokemon: PokemonType;
}

type FavoritesType = {
  [index: string]: boolean;
};

const FavoriteButton: React.FC<IFavoriteButtonProps> = ({ pokemon }) => {
  const [favorites, setFavorites] = useStoredState(
    `@react-pokemon/favorites`,
    {} as FavoritesType,
  );

  const heartColor = useMemo(
    () =>
      BACKGROUND_COLOR_MAP[pokemon.color] === BACKGROUND_COLOR_MAP.red
        ? BACKGROUND_COLOR_MAP.white
        : BACKGROUND_COLOR_MAP.red,
    [pokemon.color],
  );

  const handleToggleFavorite = useCallback(
    (name: string) =>
      setFavorites({
        ...favorites,
        [name]: favorites[name] ? !favorites[name] : true,
      }),
    [favorites, setFavorites],
  );

  return (
    <Button
      type="button"
      color={pokemon.color}
      onClick={() => handleToggleFavorite(pokemon.name)}
    >
      {favorites[pokemon.name] === true ? (
        <HiHeart size={30} color={heartColor} />
      ) : (
        <HiOutlineHeart size={30} />
      )}
    </Button>
  );
};

export default memo(FavoriteButton);
