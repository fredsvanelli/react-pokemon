import { useEffect, memo, useMemo } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { usePokemon } from 'context/PokemonContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Main from 'components/Main';
import PokeballLoader from 'components/PokeballLoader';
import PokemonCard from 'components/PokemonCard';
import Suspense from 'components/Suspense';
import Wrapper from 'components/Wrapper';

import useTitle from 'hooks/useTitle';

import { MainTitle } from './style';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const setTitle = useTitle();

  const { pokemons, loading, hasMore, fetchNextPage } = usePokemon();

  useEffect(() => {
    setTitle(t('home.head-title'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  const pokemonList = useMemo(
    () => (
      <Row className="row-cols-2 row-cols-lg-3 row-cols-xxl-4 g-3 g-md-4">
        {pokemons.map((pokemon) => (
          <Col key={pokemon.id} className="d-flex">
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    ),
    [pokemons],
  );

  const infiniteScrollList = useMemo(
    () => (
      <InfiniteScroll
        style={{ overflow: 'visible' }}
        dataLength={pokemons.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<PokeballLoader />}
      >
        {pokemonList}
      </InfiniteScroll>
    ),
    [pokemonList, pokemons.length, hasMore, fetchNextPage],
  );

  return (
    <Wrapper>
      <Header />
      <Main className="pt-4 mt-4 pt-md-5 mt-md-5">
        <Container>
          <MainTitle className="mb-4 pb-4 mb-md-5 pb-md-5">
            {t('home.title')}
          </MainTitle>
          <Suspense
            isLoading={loading.multipleFirstLoad}
            fallback={<PokeballLoader />}
          >
            {infiniteScrollList}
          </Suspense>
        </Container>
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default memo(Home);
