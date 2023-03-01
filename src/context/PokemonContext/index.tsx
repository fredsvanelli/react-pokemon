import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';
import { PokemonGraphQLResultDataType, PokemonType } from 'Types/PokemonType';

import { GET_POKEMONS_QUERY, GET_POKEMON_QUERY } from '../../GraphQLQueries';
import { normalizePokemonData } from './helpers';

interface IContextProps {
  pokemons: PokemonType[];
  pokemon: PokemonType | null;
  fetchNextPage: () => void;
  hasMore: boolean;
  getPokemon: (name: string) => void;
  clearPokemon: () => void;
  loading: {
    multipleFirstLoad: boolean;
    single: boolean;
  };
}

interface IPokemonProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

const RESULTS_PER_PAGE = 24;

export const PokemonProvider: React.FC<IPokemonProviderProps> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { loading } = useQuery<PokemonGraphQLResultDataType>(
    GET_POKEMONS_QUERY,
    {
      variables: { limit: RESULTS_PER_PAGE, offset },
      onCompleted: ({ results }) => {
        setPokemons([...pokemons, ...normalizePokemonData(results)]);
        if (results.length < RESULTS_PER_PAGE) {
          setHasMore(false);
        }
      },
      onError: () => setPokemons([]),
    },
  );

  const [fetchPokemonQuery, { loading: loadingSingle }] =
    useLazyQuery<PokemonGraphQLResultDataType>(GET_POKEMON_QUERY, {
      onCompleted: ({ results }) => {
        if (results[0].name !== pokemon?.name) {
          setPokemon(normalizePokemonData(results)[0]);
        }
      },
      onError: () => setPokemon(null),
    });

  const fetchNextPage = useCallback(() => {
    setOffset((prev) => prev + RESULTS_PER_PAGE);
  }, []);

  const getPokemon = useCallback(
    (name: string) => {
      if (!loadingSingle) {
        fetchPokemonQuery({ variables: { name } });
      }
    },
    [fetchPokemonQuery, loadingSingle],
  );

  const clearPokemon = useCallback(() => setPokemon(null), []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          pokemons,
          pokemon,
          fetchNextPage,
          hasMore,
          getPokemon,
          clearPokemon,
          loading: {
            multipleFirstLoad: loading && !pokemons.length,
            single: loadingSingle,
          },
        }),
        [
          pokemons,
          pokemon,
          loadingSingle,
          loading,
          hasMore,
          fetchNextPage,
          getPokemon,
          clearPokemon,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const usePokemon = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePokemon must be within usePokemon');
  }

  return context;
};
