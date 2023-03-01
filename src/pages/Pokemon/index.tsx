import { useEffect, memo, useCallback, useState } from 'react';

import { Container } from 'react-bootstrap';
import {
  Location,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { usePokemon } from 'context/PokemonContext';
import { getPokemonImage } from 'context/PokemonContext/helpers';

import Footer from 'components/Footer';
import MobileHeader from 'components/MobileHeader';
import PokemonDetails from 'components/PokemonDetails';
import PokemonLoader from 'components/PokemonLoader';
import Suspense from 'components/Suspense';
import Wrapper from 'components/Wrapper';

import { unslugify } from 'helpers';

import useTitle from 'hooks/useTitle';

import { Index, MainTitle, PageContainer } from './style';

type LocationType = Location & {
  state: {
    color: string;
  } | null;
};

const Pokemon: React.FC = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  const setTitle = useTitle();
  const { pokemon, getPokemon } = usePokemon();
  const { name } = useParams();
  const { state } = useLocation() as LocationType;
  const navigateTo = useNavigate();

  const handleLoadImage = useCallback(async (id: number, tryGif = true) => {
    const image = await getPokemonImage(id, tryGif);
    setPokemonImage(image);
  }, []);

  useEffect(() => {
    if (pokemon?.id) handleLoadImage(pokemon.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.id]);

  useEffect(() => {
    setTitle(unslugify(String(name)));
    getPokemon(String(name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);

    return () => setPokemonImage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackButtonClick = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => navigateTo('/'), 500);
  }, [navigateTo]);

  return (
    <Suspense
      isLoading={isLoading}
      fallback={<PokemonLoader color={state?.color} />}
    >
      <Wrapper>
        <PageContainer
          className="flex-grow-1"
          color={state?.color ?? pokemon?.color}
        >
          {pokemon && (
            <>
              <Container>
                <MobileHeader
                  pokemon={pokemon}
                  onBack={handleBackButtonClick}
                />
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <MainTitle>{unslugify(pokemon.name)}</MainTitle>
                  <Index>{pokemon.pokedexIndex}</Index>
                </div>
                <PokemonDetails
                  pokemon={pokemon}
                  image={pokemonImage ?? undefined}
                  onImageError={() => handleLoadImage(pokemon.id, false)}
                  isLeaving={isLeaving}
                />
              </Container>
              <Footer />
            </>
          )}
        </PageContainer>
      </Wrapper>
    </Suspense>
  );
};

export default memo(Pokemon);
