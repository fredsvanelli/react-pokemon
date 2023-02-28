import { memo, useMemo } from 'react';

import { Col, Stack, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaWeight, FaRulerVertical } from 'react-icons/fa';
import { MdMale, MdFemale } from 'react-icons/md';
import { PokemonType } from 'Types/PokemonType';

import Pill from 'components/Pill';

import { capitalizeWord, unslugify } from 'helpers';

import { BACKGROUND_COLOR_MAP } from '../../constants';
import {
  AnimationContainer,
  ContentContainer,
  ContentTitle,
  ImageContainer,
  MainFeaturesRow,
  Progress,
  SmallLabel,
} from './style';

interface IPokemonDetailsProps {
  pokemon: PokemonType;
  image?: string;
  onImageError?: () => void;
  isLeaving: boolean;
}

const PokemonDetails: React.FC<IPokemonDetailsProps> = ({
  pokemon,
  image,
  onImageError,
  isLeaving,
}) => {
  const { t } = useTranslation();

  const totalStats = useMemo(
    () =>
      Array.isArray(pokemon.stats)
        ? pokemon.stats.reduce((acc, item) => acc + item.value, 0)
        : 0,
    [pokemon.stats],
  );

  const totalStatsPercent = useMemo(
    () => (totalStats / ((pokemon.stats?.length ?? 0) * 100)) * 100,
    [pokemon.stats?.length, totalStats],
  );

  return (
    <AnimationContainer>
      <Stack
        className="mb-lg-2 flex-wrap align-items-start align-content-start"
        direction="horizontal"
        gap={2}
      >
        {pokemon.types.map((type) => (
          <Pill label={capitalizeWord(type)} key={type} />
        ))}
      </Stack>
      {image && (
        <ImageContainer
          className={`text-center ${isLeaving ? 'is-leaving' : ''}`}
        >
          <img
            className="img-fluid"
            src={image}
            alt={unslugify(pokemon.name)}
            onError={onImageError}
          />
        </ImageContainer>
      )}
      <ContentContainer
        className={`px-5 pb-5 ${isLeaving ? 'is-leaving' : ''}`}
      >
        <div className="mb-5">
          <ContentTitle>{t('words.description')}</ContentTitle>
          {Array.isArray(pokemon.descriptions) &&
            pokemon.descriptions.map((description, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={index}>{description}</p>
            ))}
        </div>
        <MainFeaturesRow className="row-cols-3 g-0 mb-5">
          {pokemon.weight && (
            <Col className="d-flex flex-column">
              <div className="d-flex justify-content-center mb-2">
                <Stack direction="horizontal" gap={3}>
                  <FaWeight />
                  <b>{pokemon.weight}kg</b>
                </Stack>
              </div>
              <SmallLabel className="mt-auto text-center">
                {t('words.weight')}
              </SmallLabel>
            </Col>
          )}
          {pokemon.height && (
            <Col className="d-flex flex-column">
              <div className="d-flex justify-content-center mb-2">
                <Stack direction="horizontal" gap={3}>
                  <FaRulerVertical />
                  <b>{pokemon.height}m</b>
                </Stack>
              </div>
              <SmallLabel className="mt-auto text-center">
                {t('words.height')}
              </SmallLabel>
            </Col>
          )}
          {pokemon.move && (
            <Col className="d-flex flex-column">
              <div className="text-center mb-2">
                <b>{unslugify(pokemon.move)}</b>
              </div>
              <SmallLabel className="mt-auto text-center">
                {t('words.main-move')}
              </SmallLabel>
            </Col>
          )}
        </MainFeaturesRow>
        <ContentTitle>{t('words.features')}</ContentTitle>
        <Table borderless>
          <tbody>
            <tr>
              <td style={{ width: 150 }}>{t('words.gender')}</td>
              <td colSpan={2}>
                <Stack direction="horizontal" gap={4}>
                  <span>
                    <MdMale
                      className="me-2"
                      size={22}
                      color={BACKGROUND_COLOR_MAP.purple}
                    />
                    {pokemon.gender.m}%
                  </span>
                  <span>
                    <MdFemale
                      className="me-2"
                      size={22}
                      color={BACKGROUND_COLOR_MAP.purple}
                    />
                    {pokemon.gender.f}%
                  </span>
                </Stack>
              </td>
            </tr>
            {Array.isArray(pokemon.stats) &&
              pokemon.stats?.map((stat) => (
                <tr key={stat.name}>
                  <td>{unslugify(stat.name)}</td>
                  <td style={{ width: 40 }}>
                    <span>{stat.value}</span>
                  </td>
                  <td>
                    <Progress
                      variant={stat.value >= 50 ? 'success' : 'danger'}
                      now={stat.value}
                    />
                  </td>
                </tr>
              ))}
            <tr>
              <td>{t('words.total')}</td>
              <td>
                <span>{totalStats}</span>
              </td>
              <td>
                <Progress
                  variant={totalStatsPercent >= 50 ? 'success' : 'danger'}
                  now={totalStatsPercent}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </ContentContainer>
    </AnimationContainer>
  );
};

export default memo(PokemonDetails);
